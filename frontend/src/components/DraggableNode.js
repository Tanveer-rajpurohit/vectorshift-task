// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType };
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} cursor-grab min-w-[90px] h-[38px] px-3.5 flex items-center justify-center rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-sans text-xs font-medium tracking-tight shadow-sm hover:border-[var(--accent)] hover:bg-[var(--surface-alt)] transition-all duration-150 select-none`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        <span>{label}</span>
      </div>
    );
};

  