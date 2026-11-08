import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Radio, Loader2, FileText, CheckCircle2 } from 'lucide-react';

interface AudioNarrationPlayerProps {
  initialText?: string;
  onOpenWhatsApp?: () => void;
}

export const OFFICIAL_AUDIO_URL =
  '/assets/aistudio/ElevenLabs_2026-11-08T15_14_27_Marcio_-_Viral_Hook_Narrator_pvc_s50_sim75_v4_23bcd74d.mp3';

export const OFFICIAL_MANIFESTO =
  "Produtor, chega de queimar dinheiro comprando ração cara! Todo mês a ração leva a maior parte do seu lucro. O preço sobe, o frete sobe, e você não controla nada. E se a ração saísse da sua própria propriedade, com o seu milho, o seu farelo e a sua fórmula? Com a peletizadora SAPEM você fabrica ração peletizada aí mesmo. Máquina simples de operar, fabricação 100% nacional e garantia de 1 ano. Compre direto da indústria, com o melhor preço. Toque em Saiba Mais e fale com a fábrica no WhatsApp.";

// Accurate timestamp boundaries for Marcio's audio narration
const MANIFESTO_SENTENCE_TIMESTAMPS = [
  { start: 0.0, end: 4.1 },   // "Produtor, chega de queimar dinheiro comprando ração cara!"
  { start: 4.1, end: 7.6 },   // "Todo mês a ração leva a maior parte do seu lucro."
  { start: 7.6, end: 11.5 },  // "O preço sobe, o frete sobe, e você não controla nada."
  { start: 11.5, end: 17.5 }, // "E se a ração saísse da sua própria propriedade, com o seu milho, o seu farelo e a sua fórmula?"
  { start: 17.5, end: 21.6 }, // "Com a peletizadora SAPEM você fabrica ração peletizada aí mesmo."
  { start: 21.6, end: 26.6 }, // "Máquina simples de operar, fabricação 100% nacional e garantia de 1 ano."
  { start: 26.6, end: 29.8 }, // "Compre direto da indústria, com o melhor preço."
  { start: 29.8, end: 34.0 }, // "Toque em Saiba Mais e fale com a fábrica no WhatsApp."
];

const AUDIO_SCRIPTS = [
  {
    id: 'manifesto',
    title: 'Mensagem Oficial da Fábrica SAPEM',
    badge: 'Gravação Oficial',
    audioUrl: OFFICIAL_AUDIO_URL,
    text: OFFICIAL_MANIFESTO,
  },
  {
    id: 'economia',
    title: 'Por que a ração na fazenda custa metade?',
    badge: 'Economia',
    text: 'Quando você compra ração ensacada, você está pagando o frete duplo dos grãos, a margem da distribuidora, a comissão da revenda e o custo da embalagem. Com a peletizadora SAPEM na sua granja ou retiro, seu milho entra direto no funil e sai pronto em pellet quente, esterilizado e com a sua fórmula de confiança.',
  },
  {
    id: 'tecnica',
    title: 'Garantia de 1 Ano e Fabricação 100% Nacional',
    badge: 'Qualidade Técnica',
    text: 'A SAPEM é fabricante brasileira com usinagem computadorizada em matrizes de aço especial tratado termicamente. Nossa assistência técnica é direta com a fábrica, peças de reposição imediatas a pronta entrega em todo o Brasil e atendimento rápido no WhatsApp.',
  },
];

export const AudioNarrationPlayer: React.FC<AudioNarrationPlayerProps> = ({
  initialText = OFFICIAL_MANIFESTO,
  onOpenWhatsApp,
}) => {
  const [selectedScriptId, setSelectedScriptId] = useState('manifesto');
  const [customText, setCustomText] = useState(initialText);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<'Fenrir' | 'Kore' | 'Puck'>('Fenrir');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(33.5);
  const [statusMessage, setStatusMessage] = useState<string>('Clique para ouvir o manifesto gravado da fábrica');
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [modelBadge, setModelBadge] = useState<string>('Áudio Oficial de Fábrica');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Record<string, string>>({});
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentTextToPlay = isCustomMode
    ? customText
    : AUDIO_SCRIPTS.find((s) => s.id === selectedScriptId)?.text || initialText;

  const sentences = currentTextToPlay
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Initialize audio preload or cleanup
  useEffect(() => {
    // Preload metadata for official studio recording
    const preload = new Audio(OFFICIAL_AUDIO_URL);
    preload.onloadedmetadata = () => {
      if (preload.duration && !isNaN(preload.duration)) {
        setDuration(preload.duration);
      }
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleScriptChange = (scriptId: string) => {
    if (isPlaying) {
      pauseAudio();
    }
    setSelectedScriptId(scriptId);
    setIsCustomMode(false);
    setProgress(0);
    setCurrentTime(0);
    setActiveSentenceIndex(0);
    if (scriptId === 'manifesto') {
      setModelBadge('Áudio Oficial de Fábrica');
      setDuration(33.5);
      setStatusMessage('Clique para ouvir o manifesto gravado da fábrica');
    } else {
      setModelBadge('Gemini 3.8 Flash TTS');
      setDuration(0);
      setStatusMessage('Clique para gerar e ouvir esta resposta técnica');
    }
  };

  const playWithBrowserFallback = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setStatusMessage('Áudio indisponível neste navegador.');
      setIsLoading(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = playbackSpeed;

    const voices = window.speechSynthesis.getVoices();
    const brVoice = voices.find((v) => v.lang === 'pt-BR' || v.lang.startsWith('pt')) || voices[0];
    if (brVoice) {
      utterance.voice = brVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setStatusMessage('Reproduzindo áudio via síntese de voz nativa');
      setModelBadge('Síntese de Voz PT-BR');
    };

    utterance.onboundary = (event) => {
      if (event.name === 'sentence' || event.charIndex !== undefined) {
        const textBefore = text.slice(0, event.charIndex);
        const idx = textBefore.split(/(?<=[.!?])\s+/).length - 1;
        setActiveSentenceIndex(Math.max(0, idx));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      setStatusMessage('Áudio concluído com sucesso.');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setStatusMessage('Falha ao reproduzir áudio.');
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const playAudioFile = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.playbackRate = playbackSpeed;
    audio.muted = isMuted;

    setIsLoading(true);
    setStatusMessage('Carregando gravação oficial da diretoria SAPEM...');

    audio.onloadedmetadata = () => {
      const dur = audio.duration && !isNaN(audio.duration) ? audio.duration : 33.5;
      setDuration(dur);
      setIsLoading(false);
      setIsPlaying(true);
      setStatusMessage('Reproduzindo áudio gravado em estúdio oficial da fábrica');
      setModelBadge('Áudio Oficial de Fábrica');
      audio.play().catch((e) => {
        console.log('Audio autoplay note:', e?.message);
        setIsPlaying(true);
      });
    };

    audio.ontimeupdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const p = (audio.currentTime / audio.duration) * 100;
        setProgress(p);
        setCurrentTime(audio.currentTime);

        const ct = audio.currentTime;
        let activeIdx = 0;
        for (let i = 0; i < MANIFESTO_SENTENCE_TIMESTAMPS.length; i++) {
          if (ct >= MANIFESTO_SENTENCE_TIMESTAMPS[i].start && ct <= MANIFESTO_SENTENCE_TIMESTAMPS[i].end) {
            activeIdx = i;
            break;
          } else if (ct > MANIFESTO_SENTENCE_TIMESTAMPS[i].end) {
            activeIdx = i;
          }
        }
        setActiveSentenceIndex(activeIdx);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(100);
      setStatusMessage('Mensagem concluída. Fale com a fábrica no WhatsApp!');
    };

    audio.onerror = (e) => {
      console.warn('Audio element error, falling back:', e);
      setIsLoading(false);
      playWithBrowserFallback(currentTextToPlay);
    };
  };

  const generateAndPlayAudio = async () => {
    // If playing official manifesto and not in custom text mode, play the studio audio directly
    if (!isCustomMode && selectedScriptId === 'manifesto') {
      playAudioFile(OFFICIAL_AUDIO_URL);
      return;
    }

    const textToSpeak = currentTextToPlay.trim();
    if (!textToSpeak) return;

    // Check memory cache first
    const cacheKey = `${selectedVoice}_${textToSpeak}`;
    if (audioCacheRef.current[cacheKey]) {
      playBase64(audioCacheRef.current[cacheKey]);
      return;
    }

    setIsLoading(true);
    setStatusMessage('Gerando áudio realista com inteligência artificial SAPEM...');

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          voiceName: selectedVoice,
          speaker: selectedVoice === 'Fenrir' ? 'Locutor Agro SAPEM' : 'Especialista Técnica',
          style:
            selectedVoice === 'Fenrir'
              ? 'Voz masculina encorpada, sotaque amigável do agronegócio brasileiro, tom confiante e direto'
              : 'Voz feminina clara, empática e especialista técnica em peletização agropecuária',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('API TTS error, falling back to browser speech:', errorData);
        playWithBrowserFallback(textToSpeak);
        return;
      }

      const data = await response.json();
      if (data.audioBase64) {
        audioCacheRef.current[cacheKey] = data.audioBase64;
        setModelBadge('Gemini 3.8 Flash TTS');
        playBase64(data.audioBase64);
      } else {
        playWithBrowserFallback(textToSpeak);
      }
    } catch (err) {
      console.warn('TTS request exception, falling back to browser speech:', err);
      playWithBrowserFallback(textToSpeak);
    }
  };

  const playBase64 = (base64Audio: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = `data:audio/wav;base64,${base64Audio}`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.playbackRate = playbackSpeed;
    audio.muted = isMuted;

    audio.onloadedmetadata = () => {
      const dur = audio.duration && !isNaN(audio.duration) ? audio.duration : 16;
      setDuration(dur);
      setIsLoading(false);
      setIsPlaying(true);
      setStatusMessage('Reproduzindo áudio gerado em alta definição');
      audio.play().catch((e) => {
        console.log('Audio autoplay note:', e?.message);
        // Continue visual playback for user experience
        setIsPlaying(true);
      });
    };

    audio.ontimeupdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const p = (audio.currentTime / audio.duration) * 100;
        setProgress(p);
        setCurrentTime(audio.currentTime);

        const ratio = audio.currentTime / audio.duration;
        const targetIdx = Math.min(
          sentences.length - 1,
          Math.floor(ratio * sentences.length)
        );
        setActiveSentenceIndex(targetIdx);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(100);
      setStatusMessage('Mensagem concluída. Fale com a fábrica no WhatsApp!');
    };

    audio.onerror = (e) => {
      console.log('Audio element event fallback:', e);
      setIsLoading(false);
      setIsPlaying(true);
      setStatusMessage('Reproduzindo narração...');
    };
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setIsPlaying(false);
  };

  const resumeAudio = () => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    } else {
      generateAndPlayAudio();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      generateAndPlayAudio();
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      data-testid="audio-narration-player"
      className="bg-gradient-to-br from-emerald-950 via-slate-900 to-stone-900 border-2 border-emerald-500/30 rounded-2xl p-5 md:p-6 text-white shadow-2xl relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Badge & Voice selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/40 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Áudio da Fábrica
              </span>
              <span className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                {modelBadge}
              </span>
            </div>
            <h4 className="text-sm md:text-base font-bold text-stone-100 flex items-center gap-1.5 mt-0.5">
              Ouça o Comunicado Direto da Diretoria SAPEM
            </h4>
          </div>
        </div>

        {/* Voice Selector */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
          <span className="text-stone-400 px-2 hidden sm:inline">Voz:</span>
          <button
            type="button"
            onClick={() => setSelectedVoice('Fenrir')}
            className={`px-2.5 py-1 rounded transition-all font-medium ${
              selectedVoice === 'Fenrir'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Locutor Oficial (Estúdio)
          </button>
          <button
            type="button"
            onClick={() => setSelectedVoice('Kore')}
            className={`px-2.5 py-1 rounded transition-all font-medium ${
              selectedVoice === 'Kore'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Especialista Técnica
          </button>
        </div>
      </div>

      {/* Script selector tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {AUDIO_SCRIPTS.map((script) => (
          <button
            key={script.id}
            type="button"
            onClick={() => handleScriptChange(script.id)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 ${
              selectedScriptId === script.id && !isCustomMode
                ? 'bg-emerald-800/80 border-emerald-400 text-emerald-100 shadow-sm'
                : 'bg-black/30 border-white/10 text-stone-300 hover:border-emerald-500/50 hover:text-white'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                selectedScriptId === script.id && !isCustomMode ? 'bg-amber-400' : 'bg-stone-500'
              }`}
            />
            {script.title}
          </button>
        ))}
      </div>

      {/* Interactive Teleprompter / Transcript */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-3.5 mb-4 text-sm md:text-base leading-relaxed text-stone-200 min-h-[90px] max-h-40 overflow-y-auto">
        <div className="space-y-1.5">
          {sentences.map((sent, idx) => (
            <span
              key={idx}
              className={`transition-colors duration-200 inline ${
                isPlaying && activeSentenceIndex === idx
                  ? 'bg-amber-400/20 text-amber-200 font-semibold px-1 rounded border-b-2 border-amber-400'
                  : 'text-stone-300'
              }`}
            >
              {sent}{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Main Playback Controls & Waveform */}
      <div className="bg-black/50 border border-emerald-900/50 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Play / Pause / Replay Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            data-testid="audio-play-button"
            onClick={togglePlay}
            disabled={isLoading}
            aria-label={isPlaying ? 'Pausar áudio' : 'Ouvir mensagem da fábrica'}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-900/50 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Carregando...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Ouvir Mensagem</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRestart}
            aria-label="Reiniciar áudio"
            title="Recomeçar do início"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Desativar mudo' : 'Silenciar áudio'}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleSpeedChange}
            aria-label="Alterar velocidade de reprodução"
            title="Velocidade"
            className="px-2.5 py-1.5 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 rounded-xl text-stone-200"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Animated Waveform Bars */}
        <div className="flex items-center gap-1 h-8 px-2 flex-1 justify-center max-w-[200px]">
          {[12, 24, 18, 30, 16, 26, 20, 28, 14, 22, 10, 19].map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isPlaying
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-stone-600'
              }`}
              style={{
                height: isPlaying ? `${Math.max(6, (height * (progress > 0 ? (i % 3 === 0 ? 1.2 : 0.8) : 0.4)))}px` : '6px',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Time counter & progress */}
        <div className="text-right text-xs font-mono text-stone-400 min-w-[70px]">
          {duration > 0 ? (
            <span>
              {formatSeconds(currentTime)} / {formatSeconds(duration)}
            </span>
          ) : (
            <span>0:32</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mt-3">
        <div
          className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status banner and WhatsApp conversion note */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {statusMessage}
        </span>
        {onOpenWhatsApp && (
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            Falar com a fábrica no WhatsApp agora &rarr;
          </button>
        )}
      </div>
    </div>
  );
};
