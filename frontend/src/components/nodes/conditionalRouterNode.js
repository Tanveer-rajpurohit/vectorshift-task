import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeInput, NodeSelect } from '../utils/FormControls';

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
      <div>
        <NodeLabel>Condition</NodeLabel>
        <NodeSelect
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          options={[
            { value: 'contains', label: 'Contains' },
            { value: 'equals', label: 'Equals' },
            { value: 'starts_with', label: 'Starts with' },
            { value: 'is_empty', label: 'Is empty' },
          ]}
        />
      </div>

      <div>
        <NodeLabel>Match Value</NodeLabel>
        <NodeInput
          type="text"
          placeholder="keyword..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

