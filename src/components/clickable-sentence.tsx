import React from 'react';
import { cleanWordToken } from '@/lib/dictionary';

interface ClickableSentenceProps {
  text: string;
  onWordClick: (word: string, fullSentence: string) => void;
  className?: string;
}

export const ClickableSentence: React.FC<ClickableSentenceProps> = ({
  text,
  onWordClick,
  className = '',
}) => {
  // Regex to split into words and non-words (punctuation/whitespace)
  const tokens = text.split(/([a-zA-Z0-9'’]+)/g);

  return (
    <span className={`clickable-sentence-container ${className}`}>
      {tokens.map((token, idx) => {
        const isWord = /[a-zA-Z0-9]/.test(token);
        const clean = cleanWordToken(token);

        if (!isWord || !clean) {
          return <span key={idx}>{token}</span>;
        }

        return (
          <button
            key={idx}
            type="button"
            className="clickable-word-inline"
            onClick={(e) => {
              e.stopPropagation();
              onWordClick(clean, text);
            }}
            title={`查字典：${clean}`}
            aria-label={`查字典：${clean}`}
          >
            {token}
          </button>
        );
      })}
    </span>
  );
};
