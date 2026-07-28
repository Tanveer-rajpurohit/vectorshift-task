import { Handle, Position } from 'reactflow';

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div className="w-[220px] rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-sans shadow-sm relative transition-all duration-150">
      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          className="!w-2.5 !h-2.5 !bg-[var(--accent)] !border-2 !border-[var(--surface)] !-left-[6px] "
          style={{ top: getHandleTop(i, inputs.length) }}
        />
      ))}

      <div className="px-3 py-2 border-b border-[var(--border)] bg-[var(--surface-alt)] rounded-t flex items-center justify-between">
        <span className="font-sans font-medium text-xs tracking-tight text-[var(--text-primary)]">{title}</span>
      </div>

      <div className="p-3 text-xs flex flex-col gap-2">
        {children}
      </div>

      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          className="!w-2.5 !h-2.5 !bg-[var(--accent)] !border-2 !border-[var(--surface)] !-right-[6px] "
          style={{ top: getHandleTop(i, outputs.length) }}
        />
      ))}
    </div>
  );
};