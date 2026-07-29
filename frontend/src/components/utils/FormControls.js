import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const NodeLabel = ({ children, className = '' }) => (
  <label className={`block text-[11px] font-medium text-[var(--text-secondary)] mb-1 select-none ${className}`}>
    {children}
  </label>
);

export const NodeInput = ({ value, onChange, placeholder, type = 'text', className = '', ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`nodrag w-full px-2.5 py-1.5 text-xs rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-90 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all duration-150 ${className}`}
    {...props}
  />
);

export const NodeSelect = ({ value, onChange, options = [], className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative nodrag w-full select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2.5 py-1.5 text-xs rounded border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 flex items-center justify-between cursor-pointer ${className}`}
        {...props}
      >
        <span>{selectedOption?.label || value}</span>
        <ChevronDown size={13} className={`text-[var(--text-secondary)] transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 p-1 bg-[var(--surface)] border border-[var(--border)] rounded shadow-lg max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-2.5 py-1.5 text-xs rounded cursor-pointer transition-colors ${
                opt.value === value
                  ? 'bg-[var(--accent)] text-[var(--bg)] font-medium'
                  : 'text-[var(--text-primary)] hover:bg-[var(--surface-alt)]'
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const NodeTextarea = ({ value, onChange, placeholder, rows = 3, className = '', ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const clampedHeight = Math.min(Math.max(scrollHeight, 58), 120);
      textareaRef.current.style.height = `${clampedHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`nodrag w-full min-h-[58px] max-h-[120px] px-2.5 py-1.5 text-xs rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 resize-none font-mono leading-relaxed overflow-y-auto ${className}`}
      {...props}
    />
  );
};



