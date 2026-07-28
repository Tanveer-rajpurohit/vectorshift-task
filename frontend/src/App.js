import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';

function App() {
  return (
    <div className='relative w-full h-screen overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]'>
      <PipelineUI />
      <PipelineToolbar />
      <SubmitButton />
    </div>
  );
}

export default App;
