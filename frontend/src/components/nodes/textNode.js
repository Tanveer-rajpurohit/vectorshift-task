import { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel } from '../utils/FormControls';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  const varNames = matches.map((match) => match[1]);
  return Array.from(new Set(varNames));
};


const HighlightedText = ({ text }) => {
  const parts = text.split(VARIABLE_REGEX);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span
            key={i}
            className="bg-[var(--border)] rounded-[3px] text-transparent select-none inline"
          >
            {`{{${part}}}`}
          </span>
        ) : (
          <span key={i} className="text-transparent select-none inline">
            {part}
          </span>
        )
      )}
      {text.endsWith('\n') && <br />}
    </>
  );
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [boxHeight, setBoxHeight] = useState('58px');
  const textareaRef = useRef(null);
  const backdropRef = useRef(null);

  const variables = useMemo(() => extractVariables(currText), [currText]);

  const dynamicInputs = variables.map((varName) => ({
    id: `${id}-${varName}`,
    label: varName,
  }));

  const handleScroll = () => {
    if (backdropRef.current && textareaRef.current) {
      backdropRef.current.scrollTop = textareaRef.current.scrollTop;
      backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const clamped = Math.min(Math.max(scrollHeight, 58), 120);
      const newH = `${clamped}px`;
      textareaRef.current.style.height = newH;
      setBoxHeight(newH);
    }
    handleScroll();
  }, [currText]);

  return (
    <BaseNode
      title="Text"
      inputs={dynamicInputs}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      groupInputs={dynamicInputs.length > 1}
    >
      <div>
        <NodeLabel>Text Content</NodeLabel>
        <div className="relative nodrag w-full transition-all duration-100" style={{ height: boxHeight }}>
          
          <div
            ref={backdropRef}
            className="absolute inset-0 pl-2.5 pr-5 py-1.5 text-xs font-mono leading-relaxed pointer-events-none whitespace-pre-wrap break-words overflow-hidden rounded bg-[var(--bg)] text-transparent select-none border border-transparent box-border"
            aria-hidden="true"
          >
            <HighlightedText text={currText} />
          </div>
          
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            onScroll={handleScroll}
            onKeyUp={handleScroll}
            placeholder="Enter text or {{variables}}..."
            className="relative w-full h-full pl-2.5 pr-5 py-1.5 text-xs rounded border border-[var(--border)] bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 resize-none font-mono leading-relaxed overflow-y-auto box-border"
            style={{ caretColor: 'var(--text-primary)' }}
          />
        </div>
      </div>
    </BaseNode>
  );
};