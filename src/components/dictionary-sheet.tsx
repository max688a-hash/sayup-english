import React, { useEffect, useState } from 'react';
import { Volume2, Bookmark, Check, X, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { lookupWord, type WordEntry, saveWordToNotebook, removeWordFromNotebook, isWordSaved } from '@/lib/dictionary';
import { speakCloud, stopCloudSpeech } from '@/lib/cloud-speech';
import { tr } from '@/lib/tr';

interface DictionarySheetProps {
  word: string | null;
  contextSentence?: string;
  open: boolean;
  onClose: () => void;
}

export const DictionarySheet: React.FC<DictionarySheetProps> = ({
  word,
  contextSentence,
  open,
  onClose,
}) => {
  const [entry, setEntry] = useState<WordEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!word || !open) {
      setEntry(null);
      return;
    }

    let active = true;
    setLoading(true);
    setSaved(isWordSaved(word));

    lookupWord(word)
      .then((data) => {
        if (active) {
          setEntry(data);
          setLoading(false);
          // Auto-play the word's pronunciation on lookup
          if (data?.word) {
            void playWordAudio(data.word);
          }
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      stopCloudSpeech();
    };
  }, [word, open]);

  async function playWordAudio(textToPlay: string) {
    setSpeaking(true);
    await speakCloud(
      textToPlay,
      false,
      {
        onend: () => setSpeaking(false),
        onerror: () => setSpeaking(false),
      },
      'ava'
    );
  }

  function handleToggleSave() {
    if (!entry) return;
    if (saved) {
      removeWordFromNotebook(entry.word);
      setSaved(false);
    } else {
      saveWordToNotebook(entry.word);
      setSaved(true);
    }
  }

  if (!open || !word) return null;

  return (
    <div className="dict-sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="dict-sheet-content" onClick={(e) => e.stopPropagation()}>
        <div className="dict-sheet-header">
          <div className="flex items-center gap-2">
            <span className="dict-title-icon">
              <BookOpen size={16} />
            </span>
            <span className="text-xs text-muted-foreground">{tr('声芽实时查词 · 字典')}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose} aria-label={tr('关闭')}>
            <X size={15} />
          </Button>
        </div>

        {loading ? (
          <div className="dict-sheet-loading">
            <Loader2 className="animate-spin text-primary" size={24} />
            <span className="text-xs text-muted-foreground mt-2">{tr('正在检索单词释义与发音…')}</span>
          </div>
        ) : entry ? (
          <div className="dict-sheet-body">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="dict-word-text">{entry.word}</h2>
                  {entry.level && <span className="dict-level-pill">{entry.level}</span>}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="dict-phonetic-text">{entry.phonetic}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`dict-play-btn ${speaking ? 'active text-primary' : ''}`}
                    onClick={() => void playWordAudio(entry.word)}
                    aria-label={tr('朗读单词发音')}
                  >
                    <Volume2 size={15} />
                    <span className="text-xs">{tr('听发音')}</span>
                  </Button>
                </div>
              </div>

              <Button
                variant={saved ? 'secondary' : 'outline'}
                size="sm"
                className="dict-save-btn"
                onClick={handleToggleSave}
              >
                {saved ? <Check size={14} className="text-teal" /> : <Bookmark size={14} />}
                <span>{saved ? tr('已收录') : tr('加入生词本')}</span>
              </Button>
            </div>

            <div className="dict-meaning-box mt-3.5">
              {entry.pos && <span className="dict-pos-tag">{entry.pos}</span>}
              <p className="dict-meaning-text">{entry.meaning}</p>
            </div>

            {(contextSentence || entry.example) && (
              <div className="dict-example-box mt-3">
                <span className="dict-example-label">{tr('当前语境例句')}</span>
                <p className="dict-example-sentence">{contextSentence || entry.example}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="dict-sheet-empty">
            <p className="text-sm">{tr('未找到该词词条')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
