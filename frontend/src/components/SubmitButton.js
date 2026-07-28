// submit.js

export const SubmitButton = () => {
    return (
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
            <button
                type="submit"
                className='pointer-events-auto px-5 py-2.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-sans font-medium text-xs tracking-wide shadow-sm hover:bg-[var(--surface-alt)] hover:border-[var(--accent)] transition-all duration-150 ease-in-out cursor-pointer'
            >
                Submit Pipeline
            </button>
        </div>
    );
}
