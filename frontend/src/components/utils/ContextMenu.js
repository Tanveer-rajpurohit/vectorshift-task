import { useEffect, useRef } from 'react';
import { Trash2, Unlink, X } from 'lucide-react';

export const ContextMenu = ({
  x,
  y,
  type,
  id,
  onClose,
  onDeleteNode,
  onDeleteEdge,
  onClearEdges,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const menuWidth = 180;
  const menuHeight = 110;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight - 10);

  return (
    <div
      ref={menuRef}
      style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
      className="fixed z-50 min-w-[170px] p-1 bg-[var(--surface)] border border-[var(--border)] rounded-md shadow-lg font-sans text-xs select-none animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="px-2 py-1 flex items-center justify-between border-b border-[var(--border)] mb-1 text-[var(--text-secondary)] font-mono text-[10px] uppercase tracking-wider">
        <span>{type === 'node' ? 'Node Actions' : 'Connection Actions'}</span>
        <button
          onClick={onClose}
          className="hover:text-[var(--text-primary)] transition-colors p-0.5 rounded"
        >
          <X size={12} />
        </button>
      </div>

      {type === 'node' && (
        <>
          {onClearEdges && (
            <button
              onClick={() => {
                onClearEdges(id);
                onClose();
              }}
              className="w-full px-2.5 py-1.5 rounded text-left text-[var(--text-primary)] hover:bg-[var(--surface-alt)] transition-colors flex items-center gap-2"
            >
              <Unlink size={13} className="text-[var(--text-secondary)]" />
              <span>Disconnect All</span>
            </button>
          )}

          <button
            onClick={() => {
              onDeleteNode(id);
              onClose();
            }}
            className="w-full px-2.5 py-1.5 rounded text-left text-[var(--danger)] hover:bg-[var(--surface-alt)] transition-colors flex items-center gap-2 font-medium"
          >
            <Trash2 size={13} />
            <span>Delete Node</span>
          </button>
        </>
      )}

      {type === 'edge' && (
        <button
          onClick={() => {
            onDeleteEdge(id);
            onClose();
          }}
          className="w-full px-2.5 py-1.5 rounded text-left text-[var(--danger)] hover:bg-[var(--surface-alt)] transition-colors flex items-center gap-2 font-medium"
        >
          <Trash2 size={13} />
          <span>Delete Connection</span>
        </button>
      )}
    </div>
  );
};