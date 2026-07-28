# Frontend — VectorShift Pipeline Builder UI

React app built with ReactFlow and Zustand. Renders the drag-and-drop canvas, node palette, and pipeline submission UI.

---

## Start

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. Hot-reloads on file changes.

The backend must also be running on port 8000 for Submit to work. See the [root README](../README.md) for full setup.

---

## Source layout

```
src/
├── nodes/
│   ├── baseNode.js       # Shared node shell — all node types compose from this
│   ├── inputNode.js      # Source node (text or file input)
│   ├── outputNode.js     # Sink node (text or image output)
│   ├── llmNode.js        # LLM step (system + prompt → response)
│   ├── textNode.js       # Text template with {{ variable }} handle detection
│   ├── promptNode.js     # Prompt builder (system + context inputs)
│   ├── fileUploadNode.js # File source node
│   ├── apiCallNode.js    # HTTP API step
│   ├── conditionNode.js  # Branching (true/false outputs)
│   └── noteNode.js       # Non-connected annotation node
├── store.js              # Zustand store — nodes[], edges[], helpers
├── ui.js                 # ReactFlow canvas + drag-drop handlers
├── toolbar.js            # Draggable node palette
├── submit.js             # Pipeline POST + result display
├── draggableNode.js      # Single draggable chip in the toolbar
└── index.css             # Design system tokens + global styles
```

---

## Key decisions

**State — Zustand over Context**  
Nodes and edges are read by three separate component trees (toolbar creates nodes, canvas renders them, submit reads them). Zustand's flat store handles this with zero boilerplate. `shallow` comparisons prevent unnecessary re-renders.

**BaseNode**  
Every node card — header, border, handle positions — is rendered by one component. A new node type needs to define its handles and body fields only. No duplicated markup, no copy-paste bugs.

**Text node variables**  
`parseVariables(text)` is a pure function that returns `string[]`. Handle rendering is a separate `useMemo`. The two concerns don't touch each other — easy to test, easy to change independently.

---

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server on :3000 |
| `npm run build` | Production bundle in `build/` |
| `npm test` | Jest test runner |
