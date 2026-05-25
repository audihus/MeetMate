# PRD: Auto Meeting Notes

**Owner:** Audi
**Team:** 3 orang (semua background ML, stretching ke Frontend/Backend)
**Timeline:** 4 minggu
**Status:** Final v1.0

---

## 1. Masalah

Rapat offline (rapat kantor, FGD, interview) sering ga ke-dokumentasi dengan baik. Notulen ditulis manual, makan waktu, sering ga konsisten, dan action item ke-skip. Selain itu, koordinasi pre-meeting (undangan, absensi) dan post-meeting (distribusi notulen) masih manual via WhatsApp/email scatter.

## 2. Tujuan & Ukuran Sukses

**Tujuan:** Bikin app meeting management end-to-end yang nge-cover pre-meeting (undangan, agenda), saat meeting (absensi), dan post-meeting (auto-notulen, distribusi).

**Ukuran sukses MVP:**
- WER transcription di bawah 20%
- Action item F1 minimal 0.6
- Minimal 3 organizer beneran pakai 2x atau lebih
- Notulen otomatis sampai ke peserta via email dalam waktu < 50% durasi meeting

## 3. Target User

Profesional umum yang sering rapat offline: tim kantor (rapat divisi, project meeting), riset (FGD, focus group), HR/recruiter (interview kandidat).

Konteks: rekaman pakai HP atau voice recorder di ruangan. Audio single mic, multi-speaker.

## 4. Fitur MVP

1. **Auto Summary + Action Item**
   Upload audio rekaman, sistem auto-generate summary, key decisions, dan action item (task + assignee + deadline kalau disebut).

2. **Bikin Meeting + Jadwal**
   Organizer bisa bikin meeting baru: judul, tanggal, waktu, lokasi, deskripsi/agenda (text), daftar peserta (email).

3. **Kirim Undangan via Email**
   Sistem auto-kirim email undangan ke peserta dengan detail meeting + link magic check-in.

4. **Absensi Check-in Manual**
   Peserta klik link di email → halaman check-in publik (no login) → konfirmasi hadir. Organizer juga bisa manually mark peserta sebagai hadir.

5. **Distribusi Notulen via Email**
   Setelah audio diproses, sistem auto-kirim email ke semua peserta dengan summary + action item yang di-assign ke mereka.

6. **Search Notulen**
   Organizer bisa search di list meeting-nya berdasarkan judul, isi summary, atau action item.

7. **CRUD Dokumen Rekaman**
   Organizer bisa upload, lihat, replace, atau delete file rekaman di tiap meeting.

## 5. Out of Scope (Future Enhancements)

Skip di MVP, simpen buat v2+:

- Recurring meeting (sprint planning tiap minggu, dst)
- Project / topic group meetings
- Tag-based filter (field tag udah disiapin di data model)
- In-app recording (rekam langsung pakai mic browser/HP)
- Online meeting auto-join (Zoom/Meet bot)
- Multi-tenant (workspace terpisah per organisasi)
- Decision log lintas meeting
- AI Q&A on meeting content (RAG)
- Speaker recognition (kenal nama orang)
- Live transcription
- Slack/Teams integration
- Calendar sync (Google Calendar)
- Mobile native app

## 6. Role & Permission

**Single global role: User.** Per-meeting role ditentuin oleh relasi:

| Per-meeting Role | Permission |
|---|---|
| Organizer (yang bikin meeting) | CRUD meeting, undang peserta, upload/delete rekaman, lihat hasil, assign action item, edit semua |
| Peserta (yang diundang) | Lihat detail meeting yang dia diundang, check-in, lihat hasil notulen, lihat action item yang di-assign ke dia, mark done action item-nya |

**Guest access (magic link):** Peserta yang belum punya akun bisa check-in via token unik di email tanpa login. Token expired setelah meeting selesai.

Multi-tenant ga dipakai. Semua user share single workspace.

## 7. User Flow

**Flow 1: Bikin meeting + undang peserta (Organizer)**
1. Login → klik "Bikin Meeting"
2. Isi: judul, tanggal, waktu, lokasi, agenda, daftar email peserta
3. Submit → sistem simpan meeting, generate token unik per peserta, kirim email
4. Organizer redirect ke halaman detail meeting

**Flow 2: Peserta check-in (Peserta)**
1. Peserta buka email undangan → klik "Konfirmasi Hadir"
2. Halaman check-in publik kebuka (no login) → klik konfirmasi
3. Sistem mark Attendance = hadir

**Flow 3: Upload rekaman + auto-process (Organizer)**
1. Setelah meeting offline selesai, organizer buka halaman meeting
2. Upload file audio (mp3/mp4/wav/m4a, max 2 jam)
3. File masuk ke R2, job masuk antrian Celery
4. Worker jalanin pipeline: Whisper → pyannote → Ollama extract
5. Hasil disimpan ke DB
6. Sistem auto-kirim email distribusi ke peserta

**Flow 4: Peserta lihat hasil (Peserta)**
1. Peserta dapet email distribusi notulen
2. Klik link → login → halaman detail meeting
3. Lihat summary, transcript, action item (yang di-assign ke dia di-highlight)

**Flow 5: Search & manage rekaman (Organizer)**
1. Organizer buka dashboard → list semua meeting-nya
2. Search by judul / isi summary / action item
3. Klik meeting → bisa CRUD rekaman (replace, delete)

## 8. Data Model

| Entity | Fields |
|---|---|
| User | id, email, name, password_hash, created_at |
| Meeting | id, organizer_id (User), title, scheduled_at, location, description, agenda_text, tags (array, future), status, created_at |
| MeetingParticipant | id, meeting_id, user_id (nullable kalau guest), email, role (organizer/peserta) |
| Invitation | id, participant_id, token (unique), expires_at, used_at |
| Attendance | id, participant_id, status (pending/hadir/tidak_hadir), checked_in_at, method (manual/link) |
| Recording | id, meeting_id, file_url (R2 path), duration, size, uploaded_at |
| Transcript | id, meeting_id, segments (JSON: speaker, start, end, text) |
| Summary | id, meeting_id, tldr, decisions (JSON array), topics (JSON array) |
| ActionItem | id, meeting_id, task, assignee_participant_id, due_date (nullable), status (open/done) |
| EmailLog | id, recipient, type (invitation/distribution), meeting_id, sent_at, status |

## 9. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Frontend | Next.js + shadcn/ui + Tailwind | Komponen siap pakai, learning curve rendah |
| Backend | FastAPI + Celery + Redis | Async-friendly, familiar |
| Database | PostgreSQL (Neon free tier) | Free |
| Storage | Cloudflare R2 (free tier) | 10GB gratis |
| Transcription | Whisper large-v3 (lokal) | Bilingual, open source |
| Diarization | pyannote.audio (lokal) | Standard |
| LLM extraction | Ollama + qwen2.5:7b (lokal) | Multilingual, gratis |
| Email | SMTP (Gmail app password) atau Resend free tier | Gratis |
| Deploy backend | Fly.io free tier | Gratis |
| LLM hosting | Laptop sendiri | Demo via video / tunnel |
| Auth | JWT + bcrypt | Standard, simpel |

## 10. Non-Functional Requirements

- Proses kurang dari 50% durasi audio
- Async processing (user ga nungguin loading)
- Cost per meeting target Rp 0 (semua lokal)
- Email delivery rate > 90% (monitor via EmailLog)
- Magic link token expired 24 jam setelah meeting selesai
- Audio file max 2 jam, max 200MB
- Logging + error tracking (Sentry free tier atau structured logs)

## 11. Team & Roles

| Role | Tanggung jawab |
|---|---|
| Frontend | Next.js app: auth pages, dashboard, create meeting, detail meeting, halaman check-in publik, search UI |
| Backend | FastAPI endpoint, Celery worker, DB schema + migration, SMTP email integration, magic link token generation, deploy |
| ML | Whisper setup, pyannote diarization, Ollama prompt engineering, structured output validation, evaluation framework (golden dataset + WER/F1) |

ML expose hasil sebagai Python function/module yang dipanggil Backend worker. Backend ga ngurusin internal ML, ML ga ngurusin queue/HTTP/email.

## 12. Interface Antar Role

**Frontend ↔ Backend ketemu di API contract.** Dokumen `API_CONTRACT.md` dengan endpoint utama:

- `POST /auth/register`, `POST /auth/login`
- `POST /meetings`, `GET /meetings`, `GET /meetings/:id`, `PATCH /meetings/:id`, `DELETE /meetings/:id`
- `GET /meetings/search?q=...`
- `POST /meetings/:id/recording` (upload file)
- `DELETE /meetings/:id/recording`
- `GET /check-in/:token` (public, no auth)
- `POST /check-in/:token/confirm` (public, no auth)
- `GET /me/action-items`
- `PATCH /action-items/:id/done`

**Backend ↔ ML ketemu di function signature.** Dokumen `ML_INTERFACE.md` dengan:

```python
def transcribe(audio_path: str) -> TranscriptResult
def diarize(audio_path: str) -> list[Segment]
def extract_summary(transcript: str) -> SummaryResult
def extract_action_items(transcript: str, participants: list[str]) -> list[ActionItem]
```

Output pakai Pydantic schema, validated.

## 13. Git Workflow

- Mono-repo: folder `frontend/`, `backend/`, `ml/`, `docs/`
- Feature branch + PR, ga push langsung ke `main`
- Branch naming: `feature/<role>-<nama>` (contoh: `feature/backend-upload-endpoint`)
- Minimal 1 reviewer per PR
- `main` selalu deployable
- Code review tatap muka kalau PR kompleks

## 14. Milestone (4 minggu)

**Week 1: Fondasi**
- Setup repo + docker-compose (Postgres, Redis, Ollama)
- Lock data model + API contract + ML interface
- Auth (register, login)
- Basic CRUD meeting
- ML pipeline standalone di notebook (audio in, summary + action item out)
- Hello world end-to-end di laptop tiap orang

**Week 2: Core pipeline**
- Upload recording endpoint + storage R2
- Celery worker connect ke ML pipeline
- Halaman dashboard + create meeting + detail meeting
- Display transcript + summary + action item di UI

**Week 3: Pre/post meeting features**
- SMTP integration (Gmail atau Resend)
- Kirim email undangan dengan magic link
- Halaman check-in publik
- Distribusi notulen via email (auto trigger setelah processing selesai)
- Action item assignment

**Week 4: Polish + evaluation**
- Fitur search notulen
- CRUD rekaman (delete, replace)
- Golden dataset 10 meeting, ukur WER + action item F1
- Tuning prompt LLM kalau metric kurang
- Deploy backend ke Fly.io
- README + architecture diagram + demo video

## 15. Risks

| Risk | Mitigation |
|---|---|
| Audio quality offline meeting jelek (single mic, cross-talk) | Set ekspektasi di UI ("letakkan HP di tengah meja"), turunin target diarization accuracy |
| Diarization akurasi rendah | Cukup label Speaker 1/2/dst, ga klaim akurasi tinggi |
| Kualitas LLM lokal kurang buat extraction | qwen2.5:7b + prompt engineering + structured output validation + few-shot |
| Hardware ga kuat 7B | Turun ke 3B atau pakai Gemini free tier sebagai fallback |
| Email masuk spam | Pakai SPF/DKIM kalau pakai domain sendiri, atau pakai Resend (better deliverability) |
| Demo butuh laptop nyala | Rekam demo video, sediakan tunnel kalau perlu live |
| Integration hell di Week 4 | Integrate continuously dari Week 2, end-to-end test tiap minggu |
| Magic link token bocor | Token random + expired + one-time use (set used_at) |
| Bus factor (1 orang sakit) | Dokumentasi setup + pair programming + cross-area awareness |
| API contract berubah di tengah | Lock di Week 1, perubahan harus disetujui semua |