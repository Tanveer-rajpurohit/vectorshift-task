import { useState } from 'react';
import { usePipelineSubmit } from '../hooks/usePipelineSubmit';
import { Toast } from './utils/Toast';

export const SubmitButton = () => {
    const { submitPipeline, loading } = usePipelineSubmit();
    const [toast, setToast] = useState(null);

    const handleClick = async () => {
        try {
            const data = await submitPipeline();
            if (data.is_dag) {
                setToast({
                    type: 'success',
                    title: 'Pipeline Analysis Complete',
                    message: 'Your workflow pipeline is a valid Directed Acyclic Graph (DAG) with no cycles.',
                    data,
                });
            } else {
                setToast({
                    type: 'error',
                    title: 'Cycle Detected in Pipeline',
                    message: 'Warning: This pipeline contains circular dependencies and cannot be executed as a DAG.',
                    data,
                });
            }
        } catch (err) {
            setToast({
                type: 'error',
                title: 'Backend Connection Failed',
                message: `Could not reach the FastAPI backend at http://localhost:8000. ${err.message}`,
            });
        }
    };

    return (
        <>
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={loading}
                    className='pointer-events-auto px-5 py-2.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-sans font-medium text-xs tracking-wide shadow-sm hover:bg-[var(--surface-alt)] hover:border-[var(--accent)] transition-all duration-150 ease-in-out cursor-pointer disabled:opacity-50'
                >
                    {loading ? 'Analyzing Pipeline...' : 'Submit Pipeline'}
                </button>
            </div>

            <Toast toast={toast} onClose={() => setToast(null)} />
        </>
    );
};

