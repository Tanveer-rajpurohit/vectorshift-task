import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeSelect } from '../utils/FormControls';

export const SummarizerNode = ({ id, data }) => {
  const [format, setFormat] = useState(data?.format || 'Bullet Points');
  const [length, setLength] = useState(data?.length || 'Short');

  return (
    <BaseNode
      title="Summarizer"
      inputs={[{ id: `${id}-text`, label: 'Text' }]}
      outputs={[{ id: `${id}-summary`, label: 'Summary' }]}
    >
      <div>
        <NodeLabel>Summary Format</NodeLabel>
        <NodeSelect
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          options={[
            { value: 'Bullet Points', label: 'Bullet Points' },
            { value: 'Executive Brief', label: 'Executive Brief' },
            { value: 'One Sentence', label: 'One Sentence' },
          ]}
        />
      </div>

      <div>
        <NodeLabel>Target Length</NodeLabel>
        <NodeSelect
          value={length}
          onChange={(e) => setLength(e.target.value)}
          options={[
            { value: 'Short', label: 'Short' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Detailed', label: 'Detailed' },
          ]}
        />
      </div>
    </BaseNode>
  );
};

