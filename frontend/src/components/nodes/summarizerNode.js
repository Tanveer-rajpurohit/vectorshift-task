import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SummarizerNode = ({ id, data }) => {
  const [format, setFormat] = useState(data?.format || 'Bullet Points');
  const [length, setLength] = useState(data?.length || 'Short');

  return (
    <BaseNode
      title="Summarizer"
      inputs={[{ id: `${id}-text`, label: 'Text' }]}
      outputs={[{ id: `${id}-summary`, label: 'Summary' }]}
    >
      <label style={{ display: 'block', marginBottom: 4 }}>
        Format:
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{ marginLeft: 4 }}
        >
          <option>Bullet Points</option>
          <option>Executive Brief</option>
          <option>One Sentence</option>
        </select>
      </label>
      <label style={{ display: 'block' }}>
        Length:
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          style={{ marginLeft: 4 }}
        >
          <option>Short</option>
          <option>Medium</option>
          <option>Detailed</option>
        </select>
      </label>
    </BaseNode>
  );
};
