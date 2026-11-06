import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, RotateCcw, Send, ShieldCheck, Star } from 'lucide-react';

interface ConstellationFinaleProps {
  onRestart: () => void;
  reducedMotion: boolean;
}

export const ConstellationFinale: React.FC<ConstellationFinaleProps> = ({
  onRestart,
  reducedMotion
}) => {
  const [questionText, setQuestionText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [cardDataUrl, setCardDataUrl] = useState<string | null>(null);

  const starterSuggestions = [
    "Is anyone else out there?",
    "What is under the ground on Mars?",
    "How far can a machine go?"
  ];

  const handleAddStar = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = questionText.trim();

    if (trimmed.length < 3) {
      setErrorMessage("Please write a question with at least 3 characters.");
      return;
    }

    if (trimmed.length > 140) {
      setErrorMessage("Please keep your question under 140 characters.");
      return;
    }

    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    const phoneRegex = /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/;
    const urlRegex = /(?:https?:\/\/|www\.)\S+/i;

    if (emailRegex.test(trimmed) || phoneRegex.test(trimmed) || urlRegex.test(trimmed)) {
      setErrorMessage("Keep it a question about space. No names, links or contact details, please.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitted(true);
  };

  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  };

  // Render 1080x1350 PNG Constellation Card
  useEffect(() => {
    if (!isSubmitted || !questionText) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const seed = hashCode(questionText);
    const random = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    // Obsidian radial nebula background
    const bgGrad = ctx.createRadialGradient(540, 675, 40, 540, 675, 800);
    bgGrad.addColorStop(0, '#0D1326');
    bgGrad.addColorStop(0.65, '#050814');
    bgGrad.addColorStop(1, '#02040A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Seeded starfield
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 300; i++) {
      const x = random(seed + i * 3) * 1080;
      const y = random(seed + i * 7) * 1350;
      const r = random(seed + i * 11) * 1.8 + 0.4;
      const alpha = random(seed + i * 13) * 0.7 + 0.3;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Outer subtle cyan frame
    ctx.strokeStyle = '#151F3D';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 980, 1250);

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(58, 58, 964, 1234);

    // Top Header
    ctx.font = '600 24px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('MY QUESTION FOR THE NEXT MACHINE', 540, 180);

    // Centered Question in Starlight White
    ctx.font = 'bold 50px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.letterSpacing = '0px';

    const words = questionText.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = ctx.measureText(testLine).width;
      if (width > 860) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);

    const startY = 320;
    const lineHeight = 68;
    lines.slice(0, 5).forEach((line, idx) => {
      ctx.fillText(line, 540, startY + idx * lineHeight);
    });

    // Constellation Stars
    const stars = [
      { x: 180, y: 880, name: 'Laser Mirrors' },
      { x: 300, y: 780, name: 'Seismometers' },
      { x: 440, y: 860, name: 'Viking' },
      { x: 580, y: 740, name: 'Spirit & Opportunity' },
      { x: 720, y: 810, name: 'Ingenuity' },
      { x: 840, y: 700, name: 'Voyager 1' },
      { x: 920, y: 860, name: 'Your Question', isUser: true }
    ];

    ctx.strokeStyle = '#00E5FF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    stars.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else if (i === stars.length - 1) {
        ctx.stroke();
        ctx.beginPath();
        ctx.setLineDash([8, 6]);
        ctx.strokeStyle = '#00E5FF';
        ctx.moveTo(stars[i - 1].x, stars[i - 1].y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        ctx.lineTo(pt.x, pt.y);
      }
    });
    ctx.stroke();

    stars.forEach((st) => {
      if (st.isUser) {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(st.x, st.y, 24, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.arc(st.x, st.y, 14, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#F8FAFC';
        ctx.beginPath();
        ctx.arc(st.x, st.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(st.x, st.y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.font = '16px "JetBrains Mono", monospace';
      ctx.fillStyle = st.isUser ? '#00E5FF' : '#94A3B8';
      ctx.textAlign = 'center';
      ctx.fillText(st.name, st.x, st.y + 36);
    });

    ctx.font = '16px "Atkinson Hyperlegible", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'center';
    ctx.fillText('Built for a Question | NASA Space Apps Challenge 2026', 540, 1200);

    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Dramatized voice, facts from NASA. Not an official NASA product.', 540, 1230);

    const dataUrl = canvas.toDataURL('image/png');
    setCardDataUrl(dataUrl);
  }, [isSubmitted, questionText]);

  const handleDownload = () => {
    if (!cardDataUrl) return;
    const link = document.createElement('a');
    link.download = `my-space-question-${Date.now()}.png`;
    link.href = cardDataUrl;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share && cardDataUrl) {
      try {
        const blob = await (await fetch(cardDataUrl)).blob();
        const file = new File([blob], 'my-question-constellation.png', { type: 'image/png' });
        await navigator.share({
          title: 'Built for a Question — Mission Remnants',
          text: `My question for the next machine: "${questionText}"`,
          files: [file]
        });
      } catch {
        handleDownload();
      }
    } else {
      handleDownload();
    }
  };

  return (
    <section
      id="finale"
      className="relative min-h-[85vh] flex flex-col items-center justify-center py-8 px-4 md:px-8 max-w-5xl mx-auto"
    >
      <div className="w-full text-center mb-8">
        <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block mb-2">
          Finale · The Relay Continues
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-head text-[#FFFFFF] tracking-tight mb-4">
          Voyager is still going. <span className="text-[#00E5FF]">Your turn.</span>
        </h2>
        <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Every machine NASA left behind answered a question and handed the next mystery to the future.
          What will you ask next?
        </p>
      </div>

      {!isSubmitted ? (
        <div className="w-full max-w-2xl bg-[#0B1120] border border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleAddStar} className="space-y-4">
            <div>
              <label
                htmlFor="user-question-input"
                className="block text-sm font-head font-bold text-[#FFFFFF] mb-2"
              >
                What do you want to know next?
              </label>
              <div className="relative">
                <textarea
                  id="user-question-input"
                  rows={3}
                  value={questionText}
                  onChange={(e) => {
                    setQuestionText(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="I wonder if..."
                  maxLength={140}
                  className="w-full bg-[#030712] border border-[#1E293B] focus:border-[#00E5FF] rounded-2xl px-4 py-3 text-base text-[#FFFFFF] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-colors font-body"
                />
                <span className="absolute bottom-3 right-3 text-xs font-mono text-[#94A3B8]">
                  {questionText.length}/140
                </span>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs font-mono text-[#F43F5E] bg-[#F43F5E]/10 p-2.5 rounded-xl border border-[#F43F5E]/30">
                {errorMessage}
              </p>
            )}

            <div>
              <span className="text-xs font-mono text-[#94A3B8] block mb-2">
                Or tap one of these questions to start:
              </span>
              <div className="flex flex-wrap gap-2">
                {starterSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuestionText(suggestion);
                      setErrorMessage(null);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[#111C35] text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00E5FF]/40 border border-[#1E293B] transition-colors"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                <span>Your question stays on your device.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-head font-bold text-sm bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#030712] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#030712]" />
                <span>Add my star</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="relative rounded-3xl overflow-hidden border border-[#00E5FF]/40 shadow-2xl bg-[#030712] max-w-md w-full aspect-[4/5] flex items-center justify-center p-2">
            {cardDataUrl ? (
              <img
                src={cardDataUrl}
                alt="My Constellation Card"
                className="w-full h-full object-contain rounded-2xl"
              />
            ) : (
              <div className="text-sm font-mono text-[#94A3B8] flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
                <span>Plotting your constellation...</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-head font-bold text-xs sm:text-sm bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#030712] transition-colors shadow-xl shadow-cyan-500/10"
            >
              <Download className="w-4 h-4 text-[#030712]" />
              <span>Download card (PNG)</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs sm:text-sm bg-[#0B1120] hover:bg-[#111C35] text-[#00E5FF] border border-[#00E5FF]/40 transition-colors shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setQuestionText('');
                onRestart();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl font-mono text-xs text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0D1326] border border-[#151F3D] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start again</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#94A3B8] max-w-md font-mono italic">
            "Nothing out there was abandoned. It was handed on. What will you ask next?"
          </p>
        </div>
      )}
    </section>
  );
};
