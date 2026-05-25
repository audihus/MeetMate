# MeetMate

> Your offline meeting companion. Auto-transcribe, summarize, and distribute notulen with zero cloud dependency.

MeetMate is an end-to-end meeting management application for offline meetings (rapat kantor, FGD, interview). It handles the full meeting lifecycle: scheduling, email invitations, attendance check-in, recording upload, automatic transcription and summarization, and notulen distribution to all participants.

Built fully self-hosted with local LLM. No data leaves your machine.

---

## Features

- Create meeting with schedule, location, agenda, and participant list
- Send email invitations with magic-link check-in (no login required for participants)
- Manual and link-based attendance check-in
- Upload audio recording (mp3, mp4, wav, m4a, max 2 hours)
- Automatic transcription — bilingual Bahasa Indonesia + English (Whisper large-v3)
- Speaker diarization — who said what (pyannote.audio)
- AI-generated summary, key decisions, and action items (Ollama + qwen2.5:7b)
- Auto-distribute notulen via email after processing
- Search across all meetings and notulen content
- CRUD recording document per meeting

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js, shadcn/ui, Tailwind CSS |
| Backend | FastAPI, Celery, Redis, PostgreSQL |
| ML Pipeline | Whisper large-v3, pyannote.audio, Ollama (qwen2.5:7b) |
| Storage | MinIO (S3-compatible, local) |
| Email | Mailhog (dev) |
| Infra | Docker Compose |

---

## Architecture

![Architecture Diagram](docs/architecture.png)

> Diagram coming soon.

---

## Prerequisites

Before running, make sure you have:

- Docker + Docker Compose
- Python 3.11+
- Node.js 20+
- [Ollama](https://ollama.com) installed natively (for GPU access)
- Minimum 16GB RAM (for qwen2.5:7b)
- Minimum 20GB free disk

---

## Quickstart

**1. Clone repo**
```bash
git clone https://github.com/<your-username>/meetmate.git
cd meetmate
```

**2. Copy env file**
```bash
cp .env.example .env
# Edit .env sesuai kebutuhan (opsional untuk dev lokal)
```

**3. Pull Ollama model**
```bash
ollama pull qwen2.5:7b
```

**4. Start semua services**
```bash
docker compose up -d
```

Services yang akan berjalan:
| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| MinIO Console | http://localhost:9001 |
| Mailhog (email preview) | http://localhost:8025 |

**5. Run database migration**
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
```

**6. Start Celery Worker**
```bash
cd backend
celery -A app.worker worker --loglevel=info
```

---

## Project Structure

```
meetmate/
├── frontend/          # Next.js app
├── backend/           # FastAPI app + Celery worker
├── ml/                # ML pipeline (Whisper, pyannote, Ollama)
├── docs/              # Documentation
│   ├── PRD.md
│   ├── ARCHITECTURE_BACKEND.md
│   ├── API_CONTRACT.md
│   └── ML_INTERFACE.md
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Sample Data

A sample audio file and expected output are provided for testing:

```
samples/
├── sample_meeting.mp3     # 10-minute sample meeting audio (ID + EN)
└── expected_output.json   # Expected summary + action items
```

---

## Team

| Name | Role |
|---|---|
| Audi    | Koordinator, Backend |
| Helena  | Frontend             |
| Azmi    | ML                   |

---

## Development Status

MVP in development. Timeline: 4 weeks.

See [PRD](docs/PRD.md) for full product requirements.

---

## License

[MIT](LICENSE)