# Thesis Finder 

AI-powered thesis search and generation system. Find, generate, and download thesis titles and research datasets.

##  Architecture

- **Frontend**: Next.js 14 + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + Prisma + PostgreSQL with pgvector
- **AI Service**: Python (Flask + Gemini 3 Pro)
- **Payment**: Midtrans (Indonesia)
- **Auth**: Session-based (express-session)
- **Deployment**: Docker Compose

##  Features

✅ Smart thesis search by keywords and field of study
✅ AI-powered title generation (Gemini 3 Pro)
✅ Automatic outline generation
✅ Research method recommendations
✅ Secure payment gateway (Midtrans)
✅ Research dataset downloads
✅ Vector similarity search
✅ User authentication & dashboard

## Project Structure

```
thesis-finder/
├── frontend/          # Next.js 14 React app
├── backend/           # Node.js + Express API
├── ai-service/        # Python Flask AI service
├── shared/            # Shared types & constants
├── docs/              # Documentation
└── docker-compose.yml
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL (or use Docker)
- Docker & Docker Compose

### Setup

1. **Clone & Install**
   ```bash
   cd thesis-finder
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

3. **Database Migration**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

4. **Run with Docker**
   ```bash
   docker-compose up
   ```

5. **Or Run Locally**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev

   # Terminal 3 - AI Service
   cd ai-service && python app.py
   ```

## API Endpoints

### Search
- `POST /api/search` - Search thesis by keyword

### Dataset
- `GET /api/datasets` - List datasets
- `GET /api/datasets/:id` - Get dataset details
- `POST /api/datasets/:id/download` - Download dataset (with payment check)

### AI Generation
- `POST /api/ai/generate-title` - Generate thesis title
- `POST /api/ai/generate-outline` - Generate thesis outline

### Payment
- `POST /api/payment/create` - Create transaction
- `POST /api/payment/webhook` - Midtrans webhook

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

## Database Schema

See [docs/ERD.md](docs/ERD.md)

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start dev server
npm run db:studio   # Open Prisma Studio
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### AI Service Development
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

## Environment Variables

See `.env.example` files in each directory.

## Deployment

- Frontend → Vercel
- Backend → Railway / Render
- DB → Supabase
- Storage → Cloudflare R2 / S3

## Security

- ✅ No full thesis storage
- ✅ Public/simulated datasets only
- ✅ Disclaimer requirement
- ✅ User data protection

## License
see zee
hit me: zeexuee@tutamail.com
MIT
