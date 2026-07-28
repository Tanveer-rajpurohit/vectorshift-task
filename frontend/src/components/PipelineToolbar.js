// toolbar.js

import { DraggableNode } from './DraggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='webSearch' label='Web Search' />
                <DraggableNode type='conditionalRouter' label='Conditional Router' />
                <DraggableNode type='structuredOutput' label='Structured Output' />
                <DraggableNode type='webhook' label='Webhook Trigger' />
                <DraggableNode type='summarizer' label='Summarizer' />
            </div>
        </div>
    );
};
