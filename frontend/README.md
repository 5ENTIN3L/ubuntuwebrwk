# Frontend - Ubuntu Nexus

Quick start

Install
```sh
cd frontend
npm install
```

Environment
Create `.env.local` in `/frontend`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```
Update [frontend/src/services/api.ts](frontend/src/services/api.ts) to use `import.meta.env.VITE_API_BASE_URL` (recommended) instead of hard-coded URL.

Dev
```sh
npm run dev
```

Build
```sh
npm run build
```

Key files
- Router and app entry: [frontend/src/App.tsx](frontend/src/App.tsx)
- API client: [frontend/src/services/api.ts](frontend/src/services/api.ts)
- Auth store: [frontend/src/store/auth.ts](frontend/src/store/auth.ts)

Notes
- Persist tokens securely (localStorage/sessionStorage) and centralize token refresh if needed.
- Add E2E tests for auth flows and protected pages.