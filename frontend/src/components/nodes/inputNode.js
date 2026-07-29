import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeInput, NodeSelect } from '../utils/FormControls';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      title="Input"
      inputs={[]}
      outputs={[{ id: `${id}-value`, label: 'Value' }]}
    >
      <div>
        <NodeLabel>Field Name</NodeLabel>
        <NodeInput
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>

      <div>
        <NodeLabel>Input Type</NodeLabel>
        <NodeSelect
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </div>
    </BaseNode>
  );
};

