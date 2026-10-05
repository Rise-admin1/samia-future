# Installation Guide

## Prerequisites

- Node.js and npm

---

## 1. Clone

```bash
git clone https://github.com/Rise-admin1/samia-future.git
cd samia-future
```

---

## 2. Install & environment

```bash
npm install
```

Copy the sample env and fill in your values:

```bash
cp sample.env .env
```

You may use `.env.local` instead of `.env` if you prefer Next.js local env conventions.

For local development, set `NEXT_PUBLIC_BACKEND_URL` to your API (for example `http://localhost:3001`). If unset, `lib/backend.ts` falls back to `http://localhost:3001`.

Set `NEXT_PUBLIC_SAMIA_PAYSTACK_PUBLIC_KEY` for Paystack checkout.

---

## 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional production-like local serve:

```bash
npm run build
npm start
```

**Note:** This repository is frontend-only. Configure the external backend via `NEXT_PUBLIC_BACKEND_URL`.
