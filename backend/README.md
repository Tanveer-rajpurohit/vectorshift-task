# Backend — FastAPI Pipeline Validator

Validates AI pipeline graphs submitted from the frontend. Checks node/edge counts and runs cycle detection to confirm the pipeline is a DAG.

---

## Setup

From the `backend/` directory:

```bash
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## Endpoints

### `GET /`
Health check.

```json
{ "Ping": "Pong" }
```

---

### `POST /pipelines/parse`

Accepts a pipeline graph and returns analysis results.

**Request body:**
```json
{
  "nodes": [
    { "id": "customInput-1", "type": "customInput", "position": { "x": 100, "y": 100 }, "data": {} }
  ],
  "edges": [
    { "id": "e1", "source": "customInput-1", "target": "llm-1" }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

`is_dag: false` means the pipeline has a cycle (e.g. Node A → Node B → Node A) and would loop forever at runtime.

---

## Dependencies

| Package | Version | Why |
|---|---|---|
| `fastapi` | 0.111.0 | Web framework — async-first, auto OpenAPI docs |
| `uvicorn` | 0.30.1 | ASGI server — runs FastAPI, `--reload` for dev |

FastAPI auto-generates interactive API docs at `http://localhost:8000/docs` — useful for testing the endpoint without the frontend.
