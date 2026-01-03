# Frontend
cd frontend && npm run dev        # Dev server
cd frontend && npm run build      # Production build

# Backend
cd backend && npm run dev          # Dev server
cd backend && npm run prisma:migrate  # Migration
cd backend && npm run prisma:seed     # Sample data

# AI Service
cd ai-service && python app.py    # Flask server

# Database
psql -U thesis_user -d thesis_finder  # Connect to DB