# VectorShift — Pipeline Builder

A visual, drag-and-drop interface for building AI workflows. Connect input sources, LLMs, and output targets on a canvas without writing any code. Built as a take-home technical assessment for VectorShift's frontend engineer role.

---

## What it does

You drag nodes onto a canvas and connect them with edges to form a pipeline. Hit **Submit** — the backend validates the pipeline, counts nodes/edges, and tells you whether the graph is acyclic (no circular dependencies).

```
[ Input ] ──▶ [ Text Prompt ] ──▶ [ LLM ] ──▶ [ Output ]
```

That's the simplest valid pipeline. The graph check exists because a pipeline with a cycle (e.g. Node A → Node B → Node A) would loop forever at runtime.

---

## Stack

| Layer | Tech |
|---|---|
| Canvas | React + ReactFlow |
| State | Zustand |
| Backend | Python + FastAPI |
| Styling | Vanilla CSS with custom properties |

---

## Project layout

```
vectorshift/
├── frontend/          # React app
│   └── src/
│       ├── nodes/     # Node components (Input, Output, LLM, Text + 5 custom)
│       ├── store.js   # Zustand store — single source of truth
│       ├── ui.js      # ReactFlow canvas
│       ├── toolbar.js # Drag palette
│       └── submit.js  # Pipeline submission
└── backend/
    ├── main.py        # FastAPI app — DAG validation endpoint
    └── requirements.txt
```

---

## Local setup

You need **Node.js 18+** and **Python 3.10+**.

### 1. Clone

```bash
git clone https://github.com/Tanveer-rajpurohit/vectorshift-task.git
cd vectorshift-task
```

### 2. Backend

```bash
cd backend

# Create isolated Python environment (never install globally)
python -m venv venv

# Activate it
# Windows:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start dev server (auto-reloads on file change)
uvicorn main:app --reload --port 8000
```

Verify: `http://localhost:8000` → should return `{"Ping":"Pong"}`

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Verify: `http://localhost:3000` → canvas with toolbar should load

Both servers must be running before you submit a pipeline.

---

## How to build a pipeline

1. Drag nodes from the toolbar onto the canvas
2. Connect node handles (the dots on the edges of each card) to form a graph
3. Click **Submit** — a result shows: node count, edge count, and whether it's a valid DAG

---

## Architecture notes

**Why Zustand over useState?** Nodes and edges need to be accessible by the toolbar, canvas, and submit button simultaneously — three completely separate components. Zustand gives them shared state without prop-drilling or Context boilerplate.

**DAG check** — the backend runs a three-color DFS (white → gray → black). If a DFS traversal reaches a node that's already gray (currently in the recursion stack), a back-edge exists → cycle → not a DAG. This is the same algorithm used in compiler dependency analysis and build systems like Make.

**BaseNode abstraction** — all node types share a single `BaseNode` component. Adding a new node type is ~15 lines: define its handles and form fields, pass them as props. No duplicated markup.

---

## See also

- [`backend/README.md`](./backend/README.md) — FastAPI endpoint docs, request/response shape, DAG algorithm walkthrough
