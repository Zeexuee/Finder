# 🚀 Thesis Finder Setup Guide

Complete step-by-step setup untuk Thesis Finder system.

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- Python 3.10+ ([Download](https://www.python.org))
- PostgreSQL 13+ ([Download](https://www.postgresql.org))
- Docker & Docker Compose (optional)
- Git

## 🔑 API Keys Required

1. **Gemini API Key** - Google AI Platform
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Generative AI API
   - Create API key

2. **Midtrans Keys** - Payment Gateway
   - Register at [Midtrans](https://midtrans.com)
   - Get Server Key & Client Key from dashboard
   - Use Sandbox for development

## 📂 Project Setup

### 1. Clone & Setup Directory

```bash
# Navigate to workspace
cd d:\laragon\www\projek\thesis-finder

# Copy environment files
copy .env.example .env
copy backend\.env.example backend\.env
copy ai-service\.env.example ai-service\.env
```

### 2. Update Environment Variables

**Root `.env`:**
```bash
DB_USER=thesis_user
DB_PASSWORD=thesis_password
DB_NAME=thesis_finder

GEMINI_API_KEY=your-gemini-api-key
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key

SESSION_SECRET=your-secret-change-in-production
```

**`backend\.env`:**
```bash
DATABASE_URL=postgresql://thesis_user:thesis_password@localhost:5432/thesis_finder
NEXTAUTH_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
AI_SERVICE_URL=http://localhost:5000
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-session-secret
```

**`ai-service\.env`:**
```bash
GEMINI_API_KEY=your-gemini-api-key
```

## 🗄️ Database Setup

### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name thesis_postgres \
  -e POSTGRES_USER=thesis_user \
  -e POSTGRES_PASSWORD=thesis_password \
  -e POSTGRES_DB=thesis_finder \
  -p 5432:5432 \
  pgvector/pgvector:pg15-latest
```

### Option B: Local PostgreSQL

```bash
# Create database
createdb -U postgres thesis_finder

# Create pgvector extension
psql -U postgres -d thesis_finder -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

## 🏗️ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed sample data
npm run prisma:seed

# Start dev server
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 🎨 Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 🤖 AI Service Setup

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask app
python app.py
```

AI Service akan berjalan di `http://localhost:5000`

## 🐳 Full Setup with Docker Compose

```bash
# Copy environment template
copy .env.example .env

# Update .env with your API keys
# Then start all services:
docker-compose up

# Terminal baru untuk seed data:
docker exec thesis_finder_backend npm run prisma:seed
```

**Access:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- AI Service: http://localhost:5000
- PostgreSQL: localhost:5432

## ✅ Verification

### 1. Check Backend Health
```bash
curl http://localhost:3000/health
# Response: {"status":"OK"}
```

### 2. Check AI Service Health
```bash
curl http://localhost:5000/health
# Response: {"status":"OK"}
```

### 3. Test Search Endpoint
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"machine learning","limit":5}'
```

### 4. Access Frontend
Open http://localhost:3001 in browser

## 📝 Database Schema

```
Users → Transactions ← Datasets
ThesisTitles ← ThesisReferences → References
AILogs → Users
```

## 🧪 Testing

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### Search Thesis
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"machine learning","fieldOfStudy":"Computer Science"}'
```

### Get Datasets
```bash
curl http://localhost:3000/api/dataset
```

### Create Payment
```bash
curl -X POST http://localhost:3000/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"itemType":"DATASET","itemId":"uuid-here","amount":50000}'
```

## 🐛 Troubleshooting

### PostgreSQL Connection Error
```bash
# Check PostgreSQL is running
psql -U thesis_user -d thesis_finder

# If using Docker:
docker ps | grep postgres
```

### Port Already in Use
```bash
# Windows - Find process using port
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Prisma Migration Issues
```bash
# Reset database
npm run prisma:migrate reset

# Generate client
npm run prisma:generate
```

### AI Service Not Responding
```bash
# Check GEMINI_API_KEY is set correctly
echo %GEMINI_API_KEY%

# Check Flask logs
python app.py
```

## 🚀 Next Steps

1. ✅ Setup complete - all services running
2. [ ] Create additional 200+ thesis titles
3. [ ] Implement vector similarity search
4. [ ] Add more features to frontend
5. [ ] Setup production deployment

## 📚 API Routes

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

### Search
- POST `/api/search`
- GET `/api/search/:id`
- GET `/api/search/:id/related`
- POST `/api/search/recommend-method`

### Dataset
- GET `/api/dataset`
- GET `/api/dataset/:id`
- POST `/api/dataset/:id/download`

### Payment
- POST `/api/payment/create`
- POST `/api/payment/callback`
- GET `/api/payment/:transactionId`

## 📞 Support

Jika ada error, check:
1. Console logs di masing-masing terminal
2. `.env` files sudah update dengan API keys
3. Database connection
4. Port availability

Happy coding! 🎓✨
