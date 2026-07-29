from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional 
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request model

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, float]] = None
    data: Optional[Dict[str, Any]] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):

    # print("\n" + "=" * 50)
    # print("RECEIVED PIPELINE PAYLOAD INSPECTION")
    # print("=" * 50)
    # print(f"Total Nodes: {len(pipeline.nodes)}")
    # print("\nNodes List:")
    # for node in pipeline.nodes:
    #     print(f"  • ID: {node.id} | Type: {node.type}")
    # print("\nEdges List (Connections):")
    # for edge in pipeline.edges:
    #     print(f"  • {edge.source} ──► {edge.target} (Handles: {edge.sourceHandle} -> {edge.targetHandle})")
    # print("=" * 50 + "\n")

    adj: Dict[str, List[str]] = {node.id: [] for node in pipeline.nodes}

    for edge in pipeline.edges:
        if edge.source in adj:
            adj[edge.source].append(edge.target)
        
    # print("\nAdjacency List Representation of the Pipeline:")
    # for node_id, neighbors in adj.items():
    #     print(f"  • {node_id}: {neighbors}")


    # DFS to detect cycles in the directed graph

    WHITE, GRAY, BLACK = 0, 1, 2
    state: Dict[str, int] = {node.id: WHITE for node in pipeline.nodes}

    def has_cycle(node_id: str) -> bool:
        state[node_id] = GRAY

        for neighbor in adj.get(node_id, []):
            neighbor_state = state.get(neighbor, WHITE)

            if neighbor_state == GRAY:
                return True

            if neighbor_state == WHITE:
                if has_cycle(neighbor):
                    return True
            
        state[node_id] = BLACK
        return False
             
    is_dag = True
    for node in pipeline.nodes:
        if state[node.id] == WHITE:
            if has_cycle(node.id):
                is_dag = False
                break

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag  
    }
