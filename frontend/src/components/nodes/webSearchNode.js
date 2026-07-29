import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeInput, NodeSelect } from '../utils/FormControls';

export const WebSearchNode = ({ id, data }) => {
  const [provider, setProvider] = useState(data?.provider || 'Google');
  const [maxResults, setMaxResults] = useState(data?.maxResults || '5');

  return (
    <BaseNode
      title="Web Search"
      inputs={[{ id: `${id}-query`, label: 'Query' }]}
      outputs={[
        { id: `${id}-results`, label: 'Results' },
        { id: `${id}-sources`, label: 'Sources' },
      ]}
    >
      <div>
        <NodeLabel>Search Engine</NodeLabel>
        <NodeSelect
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          options={[
            { value: 'Google', label: 'Google' },
            { value: 'Bing', label: 'Bing' },
            { value: 'DuckDuckGo', label: 'DuckDuckGo' },
          ]}
        />
      </div>

      <div>
        <NodeLabel>Max Results</NodeLabel>
        <NodeInput
          type="number"
          min="1"
          max="20"
          value={maxResults}
          onChange={(e) => setMaxResults(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

