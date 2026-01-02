#!/bin/bash
# Thesis Finder Setup Script for Linux/Mac

echo ""
echo "========================================"
echo "  🎓 THESIS FINDER - QUICK START"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Creating from template..."
    cp .env.example .env
    echo "✅ Created .env - Update it with your API keys"
    echo ""
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js 18+"
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "⚠️  Python not found (optional for AI service)"
fi

echo "✅ Prerequisites check passed!"
echo ""
echo "Choose setup option:"
echo ""
echo "1. Docker Compose (Recommended - all in one)"
echo "2. Manual Setup (separate terminals)"
echo "3. Backend Only"
echo "4. Frontend Only"
echo ""

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Starting with Docker Compose..."
        docker-compose up
        ;;
    2)
        echo ""
        echo "📖 Manual Setup Instructions:"
        echo ""
        echo "Open 4 new terminal windows and run:"
        echo ""
        echo "Terminal 1 - Backend:"
        echo "  cd backend"
        echo "  npm install"
        echo "  npm run prisma:migrate"
        echo "  npm run prisma:seed"
        echo "  npm run dev"
        echo ""
        echo "Terminal 2 - Frontend:"
        echo "  cd frontend"
        echo "  npm install"
        echo "  npm run dev"
        echo ""
        echo "Terminal 3 - AI Service:"
        echo "  cd ai-service"
        echo "  python3 -m venv venv"
        echo "  source venv/bin/activate"
        echo "  pip install -r requirements.txt"
        echo "  python3 app.py"
        echo ""
        echo "Terminal 4 - Database (if not running):"
        echo "  docker run --name thesis_postgres -e POSTGRES_USER=thesis_user -e POSTGRES_PASSWORD=thesis_password -e POSTGRES_DB=thesis_finder -p 5432:5432 pgvector/pgvector:pg15-latest"
        echo ""
        ;;
    3)
        echo ""
        echo "🔧 Starting Backend Only..."
        cd backend
        echo "Installing dependencies..."
        npm install
        echo "Running migrations..."
        npm run prisma:migrate
        echo "Seeding database..."
        npm run prisma:seed
        echo ""
        echo "✅ Backend ready! Starting dev server..."
        npm run dev
        ;;
    4)
        echo ""
        echo "🎨 Starting Frontend Only..."
        cd frontend
        echo "Installing dependencies..."
        npm install
        echo ""
        echo "✅ Frontend ready! Starting dev server..."
        npm run dev
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac
