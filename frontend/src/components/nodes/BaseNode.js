import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({ title, inputs = [], outputs = [], children, groupInputs = false }) => {
  const [hoveredSide, setHoveredSide] = useState(null);

  const shouldGroupInputs = groupInputs && inputs.length > 1;

  return (
    <div className="w-[220px] rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-sans shadow-sm relative transition-all duration-150 overflow-visible">
      {shouldGroupInputs ? (
        
        <React.Fragment>
          {inputs.map((handle) => (
            <Handle
              key={handle.id}
              type="target"
              position={Position.Left}
              id={handle.id}
              className="!w-2.5 !h-2.5 !bg-[var(--accent)] !border-[1.5px] !border-[var(--surface)] transition-all duration-150 cursor-crosshair z-10"
              style={{ top: '50%' }}
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
            />
          ))}
          <span
            className="absolute text-[9px] font-sans font-medium text-[var(--text-secondary)] pointer-events-none select-none whitespace-nowrap"
            style={{ top: '50%', left: '-8px', transform: 'translate(-100%, -130%)' }}
          >
            {inputs.length} inputs
          </span>
          {hoveredSide === 'left' && (
            <div
              className="absolute z-50 px-2.5 py-2 rounded-md border border-[var(--border)] bg-[var(--surface-alt)] shadow-xl pointer-events-none transition-opacity duration-150"
              style={{ top: '50%', left: '-12px', transform: 'translate(-100%, -50%)' }}
            >
              <div className="text-[10px] font-sans font-semibold text-[var(--text-primary)] mb-1 pb-0.5 border-b border-[var(--border)]">
                Expected Inputs
              </div>
              <div className="flex flex-col gap-0.5">
                {inputs.map((h) => (
                  <div key={h.id} className="text-[9px] font-mono text-[var(--text-secondary)] whitespace-nowrap flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                    {h.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      ) : (
        
        inputs.map((handle, i) => (
          <React.Fragment key={handle.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={handle.id}
              className="!w-2 !h-2 !bg-[var(--accent)] !border-[1.5px] !border-[var(--surface)]"
              style={{ top: getHandleTop(i, inputs.length) }}
            />
            {handle.label && (
              <span
                className="absolute text-[9px] font-sans text-[var(--text-secondary)] pointer-events-none select-none whitespace-nowrap"
                style={{
                  top: getHandleTop(i, inputs.length),
                  left: '-6px',
                  transform: 'translate(-100%, -130%)',
                }}
              >
                {handle.label}
              </span>
            )}
          </React.Fragment>
        ))
      )}

      <div className="px-3 py-2 border-b border-[var(--border)] bg-[var(--surface-alt)] rounded-t flex items-center justify-between">
        <span className="font-sans font-medium text-xs tracking-tight text-[var(--text-primary)]">{title}</span>
      </div>

      <div className="p-3 text-xs flex flex-col gap-2">
        {children}
      </div>

      {outputs.map((handle, i) => (
        <React.Fragment key={handle.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={handle.id}
            className="!w-2 !h-2 !bg-[var(--accent)] !border-[1.5px] !border-[var(--surface)]"
            style={{ top: getHandleTop(i, outputs.length) }}
          />
          {handle.label && (
            <span
              className="absolute text-[9px] font-sans text-[var(--text-secondary)] pointer-events-none select-none whitespace-nowrap"
              style={{
                top: getHandleTop(i, outputs.length),
                right: '-6px',
                transform: 'translate(100%, -130%)',
              }}
            >
              {handle.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};