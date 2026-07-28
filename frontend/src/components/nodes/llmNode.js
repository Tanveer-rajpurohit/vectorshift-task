import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
    >
      <span style={{ fontSize: 12, color: '#555' }}>This is a LLM.</span>
    </BaseNode>
  );
};
