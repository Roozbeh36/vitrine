# VITRINE

A monochrome index of virtual models — pin looks, save a shortlist, and open a profile for Miquela, Imma, and Shudu.

## Stack

TanStack Start, React 19, Tailwind CSS v4. Saves stay in the browser. No accounts.

## Run

```bash
npm install
npm run dev
```

## Deploy

Vercel, with the existing `vercel.json` install command. Build command: `npm run build`.

This app ships with auth off. The build reads `.grok/app-env.json` (`VITE_AUTH_ENABLED=false`). Do not set `DATABASE_URL` unless you turn accounts on.
