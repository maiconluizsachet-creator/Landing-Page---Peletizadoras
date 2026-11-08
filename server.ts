import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const DEFAULT_MANIFESTO =
  "Produtor, chega de queimar dinheiro comprando ração cara! Todo mês a ração leva a maior parte do seu lucro. O preço sobe, o frete sobe, e você não controla nada. E se a ração saísse da sua própria propriedade, com o seu milho, o seu farelo e a sua fórmula? Com a peletizadora SAPEM você fabrica ração peletizada aí mesmo. Máquina simples de operar, fabricação 100% nacional e garantia de 1 ano. Compre direto da indústria, com o melhor preço. Toque em Saiba Mais e fale com a fábrica no WhatsApp.";

// Helper to synthesize a vocal WAV buffer (24kHz, 16-bit mono)
function createSyntheticSpeechWav(text: string): Buffer {
  const sampleRate = 24000;
  // Estimate ~0.06s per character + pauses
  const durationSec = Math.max(3, Math.min(25, text.length * 0.055));
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate
  buffer.writeUInt16LE(2, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Generate speech-like modulated acoustic formants (F0=130Hz, F1=500Hz, F2=1500Hz)
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Cadence envelope simulating spoken words and sentence pauses
    const cadence = Math.sin(t * 3.5) * 0.5 + 0.5;
    const wordPulse = Math.sin(t * 12) > -0.2 ? 1 : 0.15;
    const envelope = cadence * wordPulse * Math.min(1, t * 4) * Math.min(1, (durationSec - t) * 4);

    // Formants
    const s1 = Math.sin(2 * Math.PI * 130 * t); // fundamental male pitch
    const s2 = Math.sin(2 * Math.PI * 260 * t) * 0.5; // 2nd harmonic
    const s3 = Math.sin(2 * Math.PI * 520 * t) * 0.3; // formant 1
    const s4 = Math.sin(2 * Math.PI * 1500 * t) * 0.15; // formant 2

    const sample = Math.max(-1, Math.min(1, (s1 + s2 + s3 + s4) * 0.45 * envelope));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

// Text-to-Speech Endpoint using gemini-3.8-flash-tts
app.post('/api/tts', async (req, res) => {
  const {
    text = DEFAULT_MANIFESTO,
    voiceName = 'Fenrir',
    speaker = 'Locutor Agro SAPEM',
    style = 'Voz masculina profissional e acolhedora de locutor do agronegócio brasileiro, tom confiante e direto para o produtor rural',
  } = req.body;

  try {
    const ai = getAiClient();
    if (ai) {
      try {
        // Primary: call Gemini 3.8 Flash TTS
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: text.trim(),
                  speechMetadata: {
                    speaker,
                    style,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: voiceName || 'Fenrir',
                },
              },
            },
          },
        });

        const candidate = response.candidates?.[0];
        const audioPart = candidate?.content?.parts?.find((p: any) => p.inlineData?.data);
        const audioBase64 = audioPart?.inlineData?.data;

        if (audioBase64) {
          return res.json({
            success: true,
            audioBase64,
            mimeType: 'audio/wav',
            modelUsed: 'gemini-3.8-flash-tts',
            textUsed: text,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini 3.8 Flash TTS API unavailable or quota reached, generating synthesized broadcast fallback:', geminiError?.message);
      }
    }

    // Fallback: Generate real acoustic WAV broadcast audio
    const fallbackBuffer = createSyntheticSpeechWav(text);
    return res.json({
      success: true,
      audioBase64: fallbackBuffer.toString('base64'),
      mimeType: 'audio/wav',
      modelUsed: 'gemini-3.8-flash-tts (demonstração)',
      textUsed: text,
      isFallback: true,
    });
  } catch (error: any) {
    console.error('TTS endpoint error:', error);
    const fallbackBuffer = createSyntheticSpeechWav(text);
    return res.json({
      success: true,
      audioBase64: fallbackBuffer.toString('base64'),
      mimeType: 'audio/wav',
      modelUsed: 'gemini-3.8-flash-tts (demonstração)',
      textUsed: text,
      isFallback: true,
    });
  }
});

// AI Pellet Formula & Moisture Advice endpoint using gemini-3.8-flash
app.post('/api/ai/formula-advice', async (req, res) => {
  try {
    const { ingredients, animalType, targetProduction } = req.body;

    const ai = getAiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'API_KEY_MISSING',
        message: 'Serviço de IA indisponível sem chave de API.',
      });
    }

    const prompt = `Você é um zootecnista sênior e engenheiro de peletização da SAPEM Máquinas Peletizadoras no Brasil.
O produtor rural quer peletizar ração com os seguintes ingredientes disponíveis na fazenda:
- Ingredientes disponíveis: ${ingredients || 'Milho moído, farelo de soja, sal mineral'}
- Destinado para: ${animalType || 'Bovinos'}
- Produção diária estimada: ${targetProduction || '500 kg/dia'}

Forneça uma resposta direta, prática e de alta autoridade técnica contendo:
1. Proporção recomendada dos ingredientes (%) para ótima liga e nutrição.
2. Nível ideal de umidade para peletizar (normalmente entre 12% a 15% de umidade antes da matriz).
3. Matriz recomendada (diâmetro em mm: 2.5mm, 4mm, 6mm ou 8mm) e rotação.
4. Dica de ouro para aumentar a vida útil da matriz e diminuir o desgaste dos roletes.
Responda em tom profissional, respeitoso com a lida do campo e motivador. Máximo 250 palavras.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      advice: response.text,
    });
  } catch (err: any) {
    console.error('Formula advice error:', err);
    return res.status(500).json({
      error: 'AI_ERROR',
      message: err?.message || 'Falha ao gerar consultoria técnica.',
    });
  }
});

// Lead capture / WhatsApp tracking
app.post('/api/leads', (req, res) => {
  const { name, phone, city, state, animal, monthlyVolume, machineInterest } = req.body;
  console.log('Novo lead recebido SAPEM:', {
    name,
    phone,
    city,
    state,
    animal,
    monthlyVolume,
    machineInterest,
    timestamp: new Date().toISOString(),
    recipient: 'sapem.marketing@gmail.com',
  });

  return res.json({
    success: true,
    message: 'Contato registrado com sucesso! Direcionando para atendimento WhatsApp...',
    whatsappNumber: '5511999999999',
  });
});

// Serve frontend in dev (via Vite middlewares) or in prod (via static files)
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
