import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const WebhookNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'POST');
  const [path, setPath] = useState(data?.path || '/webhook/v1');

  return (
    <BaseNode
      title="Webhook Trigger"
      inputs={[]}
      outputs={[{ id: `${id}-payload`, label: 'Payload' }]}
    >
      <label style={{ display: 'block', marginBottom: 4 }}>
        Method:
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ marginLeft: 4 }}
        >
          <option>POST</option>
          <option>GET</option>
          <option>PUT</option>
        </select>
      </label>
      <label style={{ display: 'block' }}>
        Path:
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          style={{ marginLeft: 4, width: 90 }}
        />
      </label>
    </BaseNode>
  );
};
