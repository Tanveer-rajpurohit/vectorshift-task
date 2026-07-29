import { useState } from 'react';
import { useStore } from '../store/store';
import { parsePipeline } from '../services/pipelineService';

export const usePipelineSubmit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const submitPipeline = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await parsePipeline(nodes, edges);
            setLoading(false);
            return data;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }
    return { submitPipeline, loading, error, nodeCount: nodes.length, edgeCount: edges.length }
}