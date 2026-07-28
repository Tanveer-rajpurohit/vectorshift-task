// toolbar.js

import { DraggableNode } from './DraggableNode';

export const PipelineToolbar = () => {

    return (
        <div className='absolute top-0 left-0 right-0 z-10 flex flex-wrap items-center gap-2.5 p-3.5 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm'>
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
    );
};


