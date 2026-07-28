import { useState } from 'react';
import { BaseNode } from './BaseNode';

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
      <label style={{ display: 'block', fontSize: 12 }}>
        JSON Schema:
        <textarea
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          rows={3}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 4,
            fontFamily: 'monospace',
            fontSize: 11,
            resize: 'vertical',
          }}
        />
      </label>
    </BaseNode>
  );
};
