import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeLabel, NodeInput, NodeSelect } from '../utils/FormControls';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      inputs={[{ id: `${id}-value`, label: 'Value' }]}
      outputs={[]}
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
        <NodeLabel>Output Type</NodeLabel>
        <NodeSelect
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ]}
        />
      </div>
    </BaseNode>
  );
};

