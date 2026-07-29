import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeInput, NodeSelect } from '../utils/FormControls';

export const WebhookNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'POST');
  const [path, setPath] = useState(data?.path || '/webhook/v1');

  return (
    <BaseNode
      title="Webhook Trigger"
      inputs={[]}
      outputs={[{ id: `${id}-payload`, label: 'Payload' }]}
    >
      <div>
        <NodeLabel>HTTP Method</NodeLabel>
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: 'POST', label: 'POST' },
            { value: 'GET', label: 'GET' },
            { value: 'PUT', label: 'PUT' },
          ]}
        />
      </div>

      <div>
        <NodeLabel>Endpoint Path</NodeLabel>
        <NodeInput
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

