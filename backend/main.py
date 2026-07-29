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

    print("\n" + "=" * 50)
    print("RECEIVED PIPELINE PAYLOAD INSPECTION")
    print("=" * 50)
    print(f"Total Nodes: {len(pipeline.nodes)}")
    print("\nNodes List:")
    for node in pipeline.nodes:
        print(f"  • ID: {node.id} | Type: {node.type}")
    print("\nEdges List (Connections):")
    for edge in pipeline.edges:
        print(f"  • {edge.source} ──► {edge.target} (Handles: {edge.sourceHandle} -> {edge.targetHandle})")
    print("=" * 50 + "\n")

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": True  
    }
