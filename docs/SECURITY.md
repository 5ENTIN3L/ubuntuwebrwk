# Security checklist

- Use strong JWT secret (`JWT_SECRET`) and do not commit `.env`.
- Hash passwords (already using bcrypt in [`User`](backend/src/models/User.ts)).
- Add rate limiting & brute-force protection on auth endpoints.
- Validate & sanitize all incoming request bodies (e.g. `express-validator`).
- Use HTTPS in production and secure cookies if using them.
- Rotate secrets and use env management for CI/deploy.