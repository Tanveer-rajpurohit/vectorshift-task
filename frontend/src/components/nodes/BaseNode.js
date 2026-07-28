import { Handle, Position } from 'reactflow';

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div style={{ width: 200, border: '1px solid black', borderRadius: 4, background: '#fff', position: 'relative' }}>

      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ top: getHandleTop(i, inputs.length) }}
        />
      ))}

      <div style={{ padding: '4px 8px', borderBottom: '1px solid #eee', background: '#f8f8f8' }}>
        <span style={{ fontWeight: 600, fontSize: 13 }}>{title}</span>
      </div>

      <div style={{ padding: '8px' }}>
        {children}
      </div>

      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{ top: getHandleTop(i, outputs.length) }}
        />
      ))}

    </div>
  );
};