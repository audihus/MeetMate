# MeetMate ML Pipeline

Speech-to-text, diarization, dan LLM extraction untuk MeetMate.

**Owner:** Azmi

---

## Stack

- **Whisper large-v3** - transcription (speech to text)
- **pyannote.audio** - speaker diarization
- **Ollama + qwen2.5:7b** - summary + action item extraction

---

## Struktur Folder

```
ml/
├── schemas.py          # Pydantic schemas (TranscriptResult, SummaryResult, dst)
├── transcribe.py       # fungsi transcribe() via Whisper
├── diarize.py          # fungsi diarize() + merge_transcript_diarization()
├── extract.py          # fungsi extract_summary() + extract_action_items()
├── prompts/
│   ├── summary.txt     # prompt template untuk summary
│   └── action_items.txt # prompt template untuk action items
├── notebooks/          # eksperimen, tidak dipakai backend
│   ├── 01_whisper_test.ipynb
│   ├── 02_diarization_test.ipynb
│   └── 03_llm_extraction_test.ipynb
├── evaluation/
│   ├── golden_dataset/ # 10 sample meeting untuk evaluasi
│   └── evaluate.py     # script ukur WER + action item F1
├── requirements.txt
└── README.md
```

---

## Setup

**1. Install Ollama**

Download di https://ollama.com, lalu pull model:
```bash
ollama pull qwen2.5:7b
ollama serve
```

**2. Install dependency**
```bash
pip install -r requirements.txt
```

**3. Pyannote setup**

pyannote butuh Hugging Face token untuk download model pertama kali:
```bash
pip install pyannote.audio
```
Buat akun di https://huggingface.co, accept terms model `pyannote/speaker-diarization-3.1`, lalu set token:
```bash
export HF_TOKEN=your_token_here
```

---

## Development Workflow

Urutan development yang disarankan:

1. Test Whisper di notebook `01_whisper_test.ipynb`
2. Test diarization di notebook `02_diarization_test.ipynb`
3. Test LLM extraction di notebook `03_llm_extraction_test.ipynb`
4. Setelah semua notebook jalan, pindahkan kode ke `.py` files
5. Pastikan function signature sesuai `docs/ML_INTERFACE.md`
6. Jalankan `evaluation/evaluate.py` untuk ukur kualitas

---

## Interface dengan Backend

Backend (Celery Worker) import langsung dari folder ini:

```python
from ml.schemas import TranscriptResult, SummaryResult, ActionItem
from ml.transcribe import transcribe
from ml.diarize import diarize, merge_transcript_diarization
from ml.extract import extract_summary, extract_action_items
```

Lihat `docs/ML_INTERFACE.md` untuk detail function signature dan schema.

**Penting:** Jangan ubah function signature tanpa diskusi dengan Audi (Backend).

---

## Evaluasi

Target metric MVP:
- WER (Word Error Rate) transcription: < 20%
- Action item F1: >= 0.6

Jalankan evaluasi:
```bash
python evaluation/evaluate.py
```

Hasil evaluasi disimpan di `evaluation/results.json`.

---

## Hardware Requirements

| Model | Minimum RAM | Rekomendasi |
|---|---|---|
| Whisper large-v3 | 10GB VRAM / 16GB RAM | GPU |
| pyannote.audio | 4GB RAM | CPU ok |
| qwen2.5:7b | 8GB VRAM / 16GB RAM | GPU |

Kalau RAM terbatas, ganti Whisper ke `medium` atau `small` di `.env`.