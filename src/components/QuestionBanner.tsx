import React, { useEffect, useState, useRef } from 'react';

interface QuestionBannerProps {
  question: string;
  handOffLine?: string;
  reducedMotion: boolean;
  isFinale?: boolean;
}

export const QuestionBanner: React.FC<QuestionBannerProps> = ({
  question,
  handOffLine,
  reducedMotion,
  isFinale = false
}) => {
  const [displayText, setDisplayText] = useState<string>(question);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const previousQuestionRef = useRef<string>(question);

  useEffect(() => {
    if (question === previousQuestionRef.current) return;

    if (reducedMotion) {
      setDisplayText(question);
      previousQuestionRef.current = question;
      return;
    }

    setIsTyping(true);
    const oldText = previousQuestionRef.current;
    const eraseStepTime = Math.max(15, Math.floor(600 / Math.max(1, oldText.length)));

    let eraseIndex = oldText.length;
    const eraseInterval = window.setInterval(() => {
      eraseIndex--;
      if (eraseIndex >= 0) {
        setDisplayText(oldText.slice(0, eraseIndex));
      } else {
        clearInterval(eraseInterval);

        if (isFinale) {
          setDisplayText('');
          setIsTyping(false);
          previousQuestionRef.current = '';
          return;
        }

        let typeIndex = 0;
        const typeInterval = window.setInterval(() => {
          typeIndex++;
          if (typeIndex <= question.length) {
            setDisplayText(question.slice(0, typeIndex));
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
            previousQuestionRef.current = question;
          }
        }, 32);
      }
    }, eraseStepTime);

    return () => {
      clearInterval(eraseInterval);
    };
  }, [question, reducedMotion, isFinale]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#010409]/95 backdrop-blur-md border-b border-[#00E5FF]/30 px-4 md:px-8 py-3 transition-all duration-300 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {handOffLine && (
          <span className="text-[11px] font-mono text-[#00E5FF] mb-1 tracking-widest uppercase opacity-90 transition-opacity">
            {handOffLine}
          </span>
        )}

        <div
          className="flex items-center justify-center min-h-[30px]"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-[11px] font-mono text-[#94A3B8] mr-2 uppercase tracking-widest hidden sm:inline">
            Mission Question:
          </span>
          <h1 className="text-base sm:text-xl lg:text-2xl font-bold font-head text-[#FFFFFF] tracking-tight text-balance">
            {displayText}
            {(isTyping || isFinale) && (
              <span className="inline-block w-2.5 h-4 sm:h-5 bg-[#00E5FF] ml-1.5 align-middle animate-pulse" />
            )}
          </h1>
        </div>
      </div>
    </header>
  );
};
