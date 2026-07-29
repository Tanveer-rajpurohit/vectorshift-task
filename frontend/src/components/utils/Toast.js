import { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-200 pointer-events-auto">
      <div className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl text-[var(--text-primary)] font-sans">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            {isSuccess && <CheckCircle2 size={16} className="text-[var(--success)] shrink-0" />}
            {isError && <AlertTriangle size={16} className="text-[var(--danger)] shrink-0" />}
            {!isSuccess && !isError && <Info size={16} className="text-[var(--accent)] shrink-0" />}
            <span className="font-semibold text-xs tracking-tight">{toast.title}</span>
          </div>

          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-0.5 rounded focus:outline-none"
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>

        {toast.data ? (
          <div className="flex flex-col gap-1.5 text-xs text-[var(--text-secondary)]">
            <p className="leading-relaxed">{toast.message}</p>
            <div className="grid grid-cols-3 gap-2 pt-2 mt-1 border-t border-[var(--border)] text-center font-mono text-[11px]">
              <div className="bg-[var(--surface-alt)] py-1 px-2 rounded border border-[var(--border)]">
                <span className="block text-[9px] text-[var(--text-secondary)] uppercase tracking-wider font-sans">Nodes</span>
                <span className="font-bold text-[var(--text-primary)]">{toast.data.num_nodes}</span>
              </div>
              <div className="bg-[var(--surface-alt)] py-1 px-2 rounded border border-[var(--border)]">
                <span className="block text-[9px] text-[var(--text-secondary)] uppercase tracking-wider font-sans">Edges</span>
                <span className="font-bold text-[var(--text-primary)]">{toast.data.num_edges}</span>
              </div>
              <div className={`py-1 px-2 rounded border font-bold ${
                toast.data.is_dag
                  ? 'bg-[var(--success)] text-[var(--bg)] border-[var(--success)] shadow-sm'
                  : 'bg-[var(--danger)] text-[var(--bg)] border-[var(--danger)] shadow-sm'
              }`}>
                <span className="block text-[9px] uppercase tracking-wider font-sans font-medium opacity-90">DAG</span>
                <span>{toast.data.is_dag ? 'Valid' : 'Cycle'}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{toast.message}</p>
        )}

        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isSuccess ? 'bg-[var(--success)]' : isError ? 'bg-[var(--danger)]' : 'bg-[var(--accent)]'
          }`}
        />
      </div>
    </div>
  );
};
