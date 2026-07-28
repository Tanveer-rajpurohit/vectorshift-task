import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      title="Text"
      inputs={[]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
    >
      <label style={{ display: 'block' }}>
        Text:
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{ marginLeft: 4 }}
        />
      </label>
    </BaseNode>
  );
};
