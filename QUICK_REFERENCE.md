# 📌 Thesis Finder - Quick Reference Card

## 🎯 Project Overview
- **Purpose**: AI-powered thesis search, generation, and dataset marketplace
- **Tech**: Next.js + Node.js + Python (Gemini 3 Pro)
- **Database**: PostgreSQL with pgvector
- **Payment**: Midtrans

## 📂 Key Directories

| Directory | Purpose | Port |
|-----------|---------|------|
| `frontend/` | React UI (Next.js) | 3001 |
| `backend/` | API Server (Express) | 3000 |
| `ai-service/` | AI Backend (Flask) | 5000 |
| `postgres/` | Database | 5432 |

## 🚀 Quick Start

```bash
# Copy environment
copy .env.example .env

# Update .env with:
# - GEMINI_API_KEY
# - MIDTRANS_SERVER_KEY
# - MIDTRANS_CLIENT_KEY

# Start everything
docker-compose up
```

## 🔧 Manual Commands

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev

# AI Service
cd ai-service && pip install -r requirements.txt && python app.py

# Database Migration
cd backend && npm run prisma:migrate && npm run prisma:seed
```

## 📚 Database Tables (8)
1. users
2. thesis_titles
3. references
4. thesis_references
5. datasets
6. transactions
7. ai_logs
8. pgvector (extension)

## 🔗 API Endpoints (20)

### Authentication
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Search
- `POST /api/search` - Search thesis
- `GET /api/search/:id` - Get detail
- `GET /api/search/:id/related` - Related thesis
- `POST /api/search/recommend-method` - Method suggestion

### Dataset
- `GET /api/dataset` - List all
- `GET /api/dataset/:id` - Get detail
- `POST /api/dataset/:id/download` - Download

### Payment
- `POST /api/payment/create` - Create transaction
- `GET /api/payment/:transactionId` - Check status
- `POST /api/payment/callback` - Midtrans webhook

### Health
- `GET /health` - Server health

## 🔐 Environment Variables (Minimum)

```bash
# Database
DB_USER=thesis_user
DB_PASSWORD=thesis_password
DB_NAME=thesis_finder

# APIs
GEMINI_API_KEY=your-key
MIDTRANS_SERVER_KEY=your-key
MIDTRANS_CLIENT_KEY=your-key

# Session
SESSION_SECRET=your-secret

# URLs
AI_SERVICE_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📊 Data Flow

```
Browser → Next.js → Express → PostgreSQL
                      ↓
                  Midtrans
                  
Express → Python Flask → Gemini API
```

## 🧪 Test Search

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"machine learning","limit":5}'
```

## ⚙️ Key Features

✅ Text search (keywords + field)
✅ AI title generation (Gemini)
✅ AI outline generation
✅ Method recommendations
✅ User authentication
✅ Payment integration
✅ Dataset gating
✅ Vector similarity ready

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | `netstat -ano \| findstr :3000` then kill |
| DB connection failed | Check PostgreSQL running |
| API key error | Verify .env has correct keys |
| Prisma error | `npm run prisma:generate` |

## 📖 Documentation

- `README.md` - Overview
- `SETUP.md` - Installation
- `API_DOCS.md` - API Reference
- `COMPLETE_SETUP.md` - Full summary

## 🎯 Next Steps

1. ✅ Setup complete
2. Update .env with API keys
3. Run `docker-compose up`
4. Test at http://localhost:3001
5. Create 200+ thesis titles
6. Deploy to production

## 💡 Tips

- Use `npm run dev` for hot-reload
- Check logs in each terminal
- Database seed creates sample data
- Session cookies auto-managed
- Midtrans sandbox for testing

## 🔄 Database Reset

```bash
cd backend
npm run prisma:migrate reset
npm run prisma:seed
```

## 📞 Support Files

- `.env.example` - Environment template
- `docker-compose.yml` - Container setup
- `start.bat / start.sh` - Quick start scripts
- `Dockerfile` - Container images

---

**Status**: ✅ Ready to Deploy
**Last Updated**: Jan 2, 2026
**Version**: 1.0.0
