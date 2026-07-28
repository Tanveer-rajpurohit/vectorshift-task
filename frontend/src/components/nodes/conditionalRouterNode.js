import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalRouterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      title="Conditional Router"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[
        { id: `${id}-true`, label: 'True' },
        { id: `${id}-false`, label: 'False' },
      ]}
    >
      <label style={{ display: 'block', marginBottom: 4 }}>
        Condition:
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={{ marginLeft: 4 }}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="starts_with">Starts with</option>
          <option value="is_empty">Is empty</option>
        </select>
      </label>
      <label style={{ display: 'block' }}>
        Value:
        <input
          type="text"
          placeholder="keyword..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ marginLeft: 4, width: 100 }}
        />
      </label>
    </BaseNode>
  );
};
