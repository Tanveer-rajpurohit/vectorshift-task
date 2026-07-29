import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeTextarea } from '../utils/FormControls';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      title="Text"
      inputs={[]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
    >
      <div>
        <NodeLabel>Text Content</NodeLabel>
        <NodeTextarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Enter text or {{variables}}..."
          rows={2}
        />
      </div>
    </BaseNode>
  );
};

