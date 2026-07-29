// submit.js

import { usePipelineSubmit } from '../hooks/usePipelineSubmit';


export const SubmitButton = () => {
    const { submitPipeline, loading } = usePipelineSubmit();

    const handleClick = async () => {
        try {
            const data = await submitPipeline();
            const dagMessage = data.is_dag ? 'Yes (No cycles detected)' : 'No — Warning: cycle detected in pipeline!';

            alert(
            `Pipeline Summary\n\n` +
            `Nodes: ${data.num_nodes}\n` +
            `Edges: ${data.num_edges}\n` +
            `Valid DAG: ${dagMessage}`
            );

        } catch (err) {
            alert(`Backend Request Failed:\n${err.message}\n\nMake sure FastAPI is running on http://localhost:8000`);
        }
    }

    return (
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className='pointer-events-auto px-5 py-2.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-sans font-medium text-xs tracking-wide shadow-sm hover:bg-[var(--surface-alt)] hover:border-[var(--accent)] transition-all duration-150 ease-in-out cursor-pointer disabled:opacity-50' >
                {loading ? 'Analyzing Pipeline...' : 'Submit Pipeline'}
            </button>
        </div>
    );
}
