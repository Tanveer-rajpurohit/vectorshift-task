import { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vs-theme') || 'light';
  });

  const iconRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vs-theme', theme);

    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: -90, scale: 0.5, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-alt)] hover:border-[var(--accent)] transition-colors duration-150 cursor-pointer flex items-center justify-center select-none ml-auto"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Toggle Theme"
    >
      <div ref={iconRef} className="w-5 h-5 flex items-center justify-center">
        {theme === 'light' ? <Moon size={16} /> : <Sun size={18} />}
      </div>
    </button>
  );
};
