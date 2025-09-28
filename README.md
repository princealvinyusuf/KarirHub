## KarirHub — Job Portal (Ionic + Express + Prisma + PostgreSQL)

This repository contains a Dockerized job portal inspired by `karirhub.kemnaker.go.id`, built with:

- Frontend: Ionic React (Vite)
- Backend: Node.js (Express, TypeScript), Prisma ORM
- Database: PostgreSQL
- Orchestration: Docker Compose

### Quick start

1. Copy environment files:

```
cp backend/.env.example backend/.env
```

2. Start everything with Docker (first run will build images and run migrations/seed):

```
docker compose up -d --build
```

3. Open the apps:
- Frontend (Ionic): http://localhost:8100
- Backend API: http://localhost:4000/api
- API Docs (basic): http://localhost:4000/api/health

### Services

- frontend: Ionic React app served by Nginx
- backend: Express API server
- db: PostgreSQL 16 with volume persistence

### Database diagram (assumed)

Core entities (simplified): Users, Companies, Jobs, Applications.

- Users: job seekers, employers, admins
- Companies: created by employers
- Jobs: created by companies
- Applications: submitted by job seekers to jobs

See `backend/prisma/schema.prisma` for full schema.

### Common commands (local dev without Docker)

Backend:

```
cd backend
npm install
npx prisma generate
npm run dev
```

Frontend:

```
cd frontend
npm install
npm run dev
```

### Environment variables

See `backend/.env.example`. The only required values for local Docker are provided defaults:

- `DATABASE_URL` (PostgreSQL, set by service name `db`)
- `JWT_SECRET`
- `PORT`

### Migrations & seed

The backend container runs `prisma migrate deploy` on start and seeds development data. To re-seed:

```
docker compose exec backend npm run db:reset
```

### Notes

- This is a starter implementation. Extend pages, validations, and security as needed.
- For Apple Silicon (M1/M2/M3), images are multi-arch and work out of the box.


