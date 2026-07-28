import { useState } from 'react';
import { BaseNode } from './BaseNode';

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
      <label style={{ display: 'block', marginBottom: 4 }}>
        Provider:
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          style={{ marginLeft: 4 }}
        >
          <option>Google</option>
          <option>Bing</option>
          <option>DuckDuckGo</option>
        </select>
      </label>
      <label style={{ display: 'block' }}>
        Max results:
        <input
          type="number"
          min="1"
          max="20"
          value={maxResults}
          onChange={(e) => setMaxResults(e.target.value)}
          style={{ marginLeft: 4, width: 44 }}
        />
      </label>
    </BaseNode>
  );
};
