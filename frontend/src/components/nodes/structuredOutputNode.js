import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeTextarea } from '../utils/FormControls';

export const StructuredOutputNode = ({ id, data }) => {
  const [schema, setSchema] = useState(
    data?.schema || '{\n  "summary": "string",\n  "sentiment": "positive|negative"\n}'
  );

  return (
    <BaseNode
      title="Structured Output"
      inputs={[{ id: `${id}-input`, label: 'Unstructured' }]}
      outputs={[{ id: `${id}-json`, label: 'JSON' }]}
    >
      <div>
        <NodeLabel>JSON Schema</NodeLabel>
        <NodeTextarea
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          rows={3}
        />
      </div>
    </BaseNode>
  );
};

