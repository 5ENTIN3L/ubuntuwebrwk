# Development Guide

Monorepo commands (root)
- Install: `pnpm install` (or `npm install` per package)
- Start both (recommended): run backend and frontend in separate terminals

Backend
- Start dev server: `cd backend && npm run dev`
- Run tests: `cd backend && npm test`
- Entry: [backend/src/index.ts](backend/src/index.ts)

Frontend
- Start dev server: `cd frontend && npm run dev`
- Build: `cd frontend && npm run build`
- Entry: [frontend/src/App.tsx](frontend/src/App.tsx)

Testing
- Backend uses Jest (config in [backend/jest.config.js](backend/jest.config.js)). Tests are under [backend/tests](backend/tests).

Environment
- Backend needs `MONGO_URI` and `JWT_SECRET` in `backend/.env`.
- Frontend uses `VITE_API_BASE_URL` in `frontend/.env.local`.

CI
- Recommended: run `npm test` for backend, build frontend, run lint.