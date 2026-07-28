import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { WebSearchNode } from './nodes/webSearchNode';
import { ConditionalRouterNode } from './nodes/conditionalRouterNode';
import { StructuredOutputNode } from './nodes/structuredOutputNode';
import { WebhookNode } from './nodes/webhookNode';
import { SummarizerNode } from './nodes/summarizerNode';
import { ContextMenu } from './utils/ContextMenu';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  webSearch: WebSearchNode,
  conditionalRouter: ConditionalRouterNode,
  structuredOutput: StructuredOutputNode,
  webhook: WebhookNode,
  summarizer: SummarizerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteNode: state.deleteNode,
  deleteEdge: state.deleteEdge,
  clearNodeEdges: state.clearNodeEdges,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [menu, setMenu] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      deleteNode,
      deleteEdge,
      clearNodeEdges,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeContextMenu = useCallback((event, node) => {
      event.preventDefault();
      setMenu({
        id: node.id,
        type: 'node',
        x: event.clientX,
        y: event.clientY,
      });
    }, []);

    const onEdgeContextMenu = useCallback((event, edge) => {
      event.preventDefault();
      setMenu({
        id: edge.id,
        type: 'edge',
        x: event.clientX,
        y: event.clientY,
      });
    }, []);

    const onPaneClick = useCallback(() => {
      setMenu(null);
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                onNodeContextMenu={onNodeContextMenu}
                onEdgeContextMenu={onEdgeContextMenu}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="var(--border)" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>

            {menu && (
              <ContextMenu
                {...menu}
                onClose={() => setMenu(null)}
                onDeleteNode={deleteNode}
                onDeleteEdge={deleteEdge}
                onClearEdges={clearNodeEdges}
              />
            )}
        </div>
    )
}

