import React, { useState } from 'react';
import { chaptersData } from '../data/chapters';
import { chatStarters } from '../data/chatStarters';
import { computeVoyagerMetrics } from '../data/voyagerCalc';
import { MessageSquare, X, Send, ExternalLink } from 'lucide-react';
import { TruthLabelType } from '../data/types';

interface Message {
  sender: 'user' | 'engineer';
  text: string;
  sourceTitle?: string;
  sourceUrl?: string;
  truthLabel?: TruthLabelType;
  isRefusal?: boolean;
}

interface AskEngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapterId?: string;
}

export const AskEngineerModal: React.FC<AskEngineerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'engineer',
      text: "Hello! I am the mission engineer. Ask me anything about the Apollo mirrors, ALSEP seismometers, Viking landers, Spirit & Opportunity, Ingenuity, or Voyager 1.",
      truthLabel: 'FACT'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');

  if (!isOpen) return null;

  const handleQuery = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];

    if (
      q.includes('world cup') ||
      q.includes('football') ||
      q.includes('who will win') ||
      q.includes('weather tomorrow') ||
      q.includes('girlfriend') ||
      q.includes('boyfriend') ||
      q.includes('recipe') ||
      q.includes('homework')
    ) {
      newMessages.push({
        sender: 'engineer',
        text: "I can only talk about the machines in this story.",
        isRefusal: true
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    if (q.includes('best rover') || q.includes('favorite rover') || q.includes('which rover is better')) {
      newMessages.push({
        sender: 'engineer',
        text: "I don't rank the machines. Each was built for a different mission! Spirit and Opportunity were built to search for ancient water, while Curiosity and Perseverance carry entire chemistry labs to study past habitability.",
        truthLabel: 'FACT',
        sourceTitle: 'NASA Mars Exploration Program',
        sourceUrl: 'https://mars.nasa.gov/'
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    if (q.includes('pathfinder') || q.includes('sojourner') || q.includes('curiosity') || q.includes('perseverance') || q.includes('webb')) {
      newMessages.push({
        sender: 'engineer',
        text: "I do not have that machine in my notes for this journey. Here is where scientists look for official mission archives:",
        truthLabel: 'FACT',
        sourceTitle: 'NASA Missions Index',
        sourceUrl: 'https://www.nasa.gov/missions/'
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    if (q.includes('why did opportunity') || (q.includes('opportunity') && (q.includes('quiet') || q.includes('stop') || q.includes('die')))) {
      newMessages.push({
        sender: 'engineer',
        text: "Opportunity went quiet in June 2018 after a colossal planet-encircling dust storm blocked sunlight from its solar panels. Without sunlight, its batteries drained and it could not keep its electronics warm.",
        truthLabel: 'FACT',
        sourceTitle: 'NASA Opportunity Mission Archive',
        sourceUrl: 'https://mars.nasa.gov/mer/mission/overview/'
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    if (q.includes('how does ingenuity fly') || (q.includes('ingenuity') && q.includes('fly'))) {
      newMessages.push({
        sender: 'engineer',
        text: "Because the Martian atmosphere is less than 1% as dense as Earth’s, Ingenuity uses two counter-rotating carbon fiber rotor blades spinning in opposite directions at 2,400 to 2,700 RPM to generate aerodynamic lift.",
        truthLabel: 'FACT',
        sourceTitle: 'NASA Ingenuity Technical Log',
        sourceUrl: 'https://mars.nasa.gov/technology/helicopter/'
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    if (q.includes('life on mars') || q.includes('alien life')) {
      newMessages.push({
        sender: 'engineer',
        text: "In 1976, Viking’s miniature biology labs detected chemical activity in Martian soil, but its gas chromatograph found no organic carbon molecules. Most scientists concluded reactive minerals caused the reaction, leaving an open puzzle: before looking for life, we must follow the water.",
        truthLabel: 'INFERRED',
        sourceTitle: 'NASA Viking Science Results',
        sourceUrl: 'https://mars.nasa.gov/resources/6055/'
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    if (q.includes('how far is voyager') || q.includes('voyager 1 distance') || q.includes('where is voyager')) {
      const v = computeVoyagerMetrics();
      newMessages.push({
        sender: 'engineer',
        text: `Voyager 1 is currently about ${v.distanceBillionKm} billion kilometers from Earth in interstellar space. A radio signal traveling at light speed takes ${v.oneWayDisplay} to make the one-way crossing.`,
        truthLabel: 'FACT',
        sourceTitle: 'NASA JPL Voyager Interstellar Mission',
        sourceUrl: 'https://voyager.jpl.nasa.gov/'
      });
      setMessages(newMessages);
      setInputText('');
      return;
    }

    let bestMatch = null;
    let highestScore = 0;

    chaptersData.forEach((ch) => {
      let score = 0;
      const terms = [
        ch.title.toLowerCase(),
        ch.machine.toLowerCase(),
        ...ch.hotspots.map((h) => h.label.toLowerCase()),
        ...ch.steps.map((s) => s.text.toLowerCase()),
        ...ch.facts.map((f) => f.claim.toLowerCase())
      ];

      q.split(' ').forEach((word) => {
        if (word.length > 2) {
          terms.forEach((term) => {
            if (term.includes(word)) score += 1;
          });
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = ch;
      }
    });

    if (bestMatch && highestScore >= 2) {
      newMessages.push({
        sender: 'engineer',
        text: (bestMatch as typeof chaptersData[0]).shortAnswer,
        truthLabel: 'FACT',
        sourceTitle: (bestMatch as typeof chaptersData[0]).title,
        sourceUrl: (bestMatch as typeof chaptersData[0]).photo.sourceUrl
      });
    } else {
      newMessages.push({
        sender: 'engineer',
        text: "I do not have that in my notes. Here is where scientists look for further mission details:",
        truthLabel: 'FACT',
        sourceTitle: 'NASA Science Missions',
        sourceUrl: 'https://science.nasa.gov/'
      });
    }

    setMessages(newMessages);
    setInputText('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-engineer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0D1326] border border-[#151F3D] rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#151F3D] bg-[#050814]/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#06B6D4]/20 border border-[#06B6D4] flex items-center justify-center text-[#06B6D4]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 id="ask-engineer-title" className="font-head font-bold text-base text-[#F8FAFC]">
                Ask the Engineer
              </h3>
              <p className="text-[11px] font-mono text-[#94A3B8]">
                Verified answers directly from NASA fact cards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1.5 rounded-xl hover:bg-[#151F3D]"
            aria-label="Close Ask the Engineer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#00E5FF] text-[#030712] font-semibold'
                    : 'bg-[#151F3D] text-[#FFFFFF] border border-[#1E293B]'
                }`}
              >
                <p>{msg.text}</p>
                {msg.sourceTitle && (
                  <div className="mt-2 pt-2 border-t border-[#0D1326] flex items-center justify-between text-[11px] font-mono">
                    {msg.truthLabel && (
                      <span className="text-[10px] text-[#00E5FF] tracking-wider uppercase font-semibold">
                        {msg.truthLabel}
                      </span>
                    )}
                    {msg.sourceUrl && (
                      <a
                        href={msg.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00E5FF] hover:underline flex items-center gap-1"
                      >
                        <span>{msg.sourceTitle}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-2.5 border-t border-[#151F3D]/60 bg-[#050814]/40 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] font-mono text-[#94A3B8] mr-1">Starters:</span>
            {chatStarters.slice(0, 4).map((starter, i) => (
              <button
                key={i}
                onClick={() => handleQuery(starter.question)}
                className="text-[11px] font-mono bg-[#151F3D] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#06B6D4] px-3 py-1 rounded-full border border-[#151F3D] transition-colors"
              >
                {starter.question}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery(inputText);
          }}
          className="p-4 border-t border-[#151F3D] bg-[#050814]/70 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about a machine (e.g., How does Ingenuity fly?)"
            className="flex-1 bg-[#050814] border border-[#151F3D] focus:border-[#06B6D4] rounded-2xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#06B6D4] hover:bg-[#22D3EE] text-[#050814] p-3 rounded-2xl transition-transform active:scale-95"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="px-4 py-2 text-center text-[10px] font-mono text-[#64748B] bg-[#050814]">
          Dramatized voice, facts from NASA. Answers strictly sourced from verified fact cards.
        </div>
      </div>
    </div>
  );
};
