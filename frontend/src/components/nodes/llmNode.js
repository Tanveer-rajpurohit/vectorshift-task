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
      <span className="text-xs text-[var(--text-secondary)]">This is an LLM engine node.</span>
    </BaseNode>
  );
};

