# Geeta Saathi Backend API

REST API for Geeta Saathi - Bhagavad Gita learning platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: Supabase Auth (Phone OTP)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:push

# (Optional) Seed database
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

See `.env.example` for all required variables.

## API Documentation

### Base URL
- Development: `http://localhost:3001`
- Production: `https://api.geetasaathi.com`

### Endpoints

#### Authentication
```
POST   /api/auth/send-otp
POST   /api/auth/verify-otp
POST   /api/auth/refresh
```

#### Users
```
GET    /api/users/me
PUT    /api/users/me
GET    /api/users/me/progress
```

#### Audio
```
GET    /api/audio
GET    /api/audio/:id
POST   /api/audio/:id/progress
POST   /api/audio/:id/bookmark
```

#### Verses
```
GET    /api/verses
GET    /api/verses/daily
GET    /api/verses/random
```

#### Lessons
```
GET    /api/lessons
GET    /api/lessons/:id
POST   /api/lessons/:id/complete
```

#### Journal
```
GET    /api/journal
POST   /api/journal
PUT    /api/journal/:id
DELETE /api/journal/:id
```

#### AI Guide
```
POST   /api/ai/chat
GET    /api/ai/history
```

## Database Schema

See `prisma/schema.prisma` for complete schema.

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## Deployment

Backend is deployed to Railway (https://railway.app).

## License

MIT
