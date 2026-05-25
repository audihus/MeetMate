# MeetMate Frontend

Next.js frontend untuk MeetMate.

**Owner:** Helena

---

## Stack

- **Next.js 14** (App Router)
- **shadcn/ui** - komponen UI
- **Tailwind CSS** - styling
- **React Query** - data fetching + caching

---

## Struktur Folder

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # redirect ke /meetings
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── meetings/
│   │   ├── page.tsx              # dashboard list meetings
│   │   ├── new/page.tsx          # form create meeting
│   │   └── [id]/
│   │       ├── page.tsx          # detail meeting
│   │       └── recording/page.tsx
│   ├── check-in/
│   │   └── [token]/page.tsx      # halaman publik check-in (no login)
│   └── action-items/
│       └── page.tsx              # semua action item milik user
├── components/
│   ├── ui/                       # shadcn components (auto-generated)
│   ├── meetings/
│   │   ├── MeetingCard.tsx
│   │   ├── MeetingForm.tsx
│   │   ├── ParticipantList.tsx
│   │   └── AttendanceTable.tsx
│   ├── recording/
│   │   ├── UploadZone.tsx
│   │   └── ProcessingStatus.tsx
│   └── notulen/
│       ├── TranscriptView.tsx
│       ├── SummaryCard.tsx
│       └── ActionItemList.tsx
├── lib/
│   ├── api.ts                    # axios/fetch wrapper
│   └── utils.ts
├── hooks/
│   ├── useMeetings.ts
│   └── useProcessingStatus.ts   # polling status processing
├── types/
│   └── index.ts                  # TypeScript types sesuai API Contract
├── public/
├── package.json
└── README.md
```

---

## Setup

**1. Install dependency**
```bash
npm install
```

**2. Pastikan backend jalan di** `http://localhost:8000`

**3. Jalankan dev server**
```bash
npm run dev
```

Buka http://localhost:3000

---

## Halaman yang Perlu Dibuat

| Halaman | Route | Auth |
|---|---|---|
| Login | /login | No |
| Register | /register | No |
| Dashboard meetings | /meetings | Yes |
| Create meeting | /meetings/new | Yes |
| Detail meeting | /meetings/:id | Yes |
| Check-in peserta | /check-in/:token | No (public) |
| Action items saya | /action-items | Yes |

---

## Environment Variables

Buat file `.env.local` di folder ini:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## Panduan Komponen

Semua komponen UI pakai shadcn/ui. Install komponen baru dengan:
```bash
npx shadcn-ui@latest add <nama-komponen>
```

Lihat https://ui.shadcn.com untuk katalog komponen.