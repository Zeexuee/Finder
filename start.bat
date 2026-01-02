@echo off
REM Thesis Finder Quick Start Script for Windows

echo.
echo ========================================
echo  🎓 THESIS FINDER - QUICK START
echo ========================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo Please copy .env.example to .env and update API keys
    echo.
    copy .env.example .env
    echo Created .env - Update it with your API keys
    echo.
    pause
    exit /b 1
)

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js 18+
    pause
    exit /b 1
)

REM Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Python not found in PATH (optional for AI service)
)

echo ✅ Prerequisites check passed!
echo.
echo Choose setup option:
echo.
echo 1. Docker Compose (Recommended - all in one)
echo 2. Manual Setup (separate terminals)
echo 3. Backend Only
echo 4. Frontend Only
echo.

set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🐳 Starting with Docker Compose...
    docker-compose up
) else if "%choice%"=="2" (
    echo.
    echo 📖 Manual Setup Instructions:
    echo.
    echo Open 4 new terminal windows and run:
    echo.
    echo Terminal 1 - Backend:
    echo   cd backend
    echo   npm install
    echo   npm run prisma:migrate
    echo   npm run prisma:seed
    echo   npm run dev
    echo.
    echo Terminal 2 - Frontend:
    echo   cd frontend
    echo   npm install
    echo   npm run dev
    echo.
    echo Terminal 3 - AI Service:
    echo   cd ai-service
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo   python app.py
    echo.
    echo Terminal 4 - Database (if not running):
    echo   docker run --name thesis_postgres -e POSTGRES_USER=thesis_user -e POSTGRES_PASSWORD=thesis_password -e POSTGRES_DB=thesis_finder -p 5432:5432 pgvector/pgvector:pg15-latest
    echo.
    pause
) else if "%choice%"=="3" (
    echo.
    echo 🔧 Starting Backend Only...
    cd backend
    echo Installing dependencies...
    call npm install
    echo Running migrations...
    call npm run prisma:migrate
    echo Seeding database...
    call npm run prisma:seed
    echo.
    echo ✅ Backend ready! Starting dev server...
    call npm run dev
) else if "%choice%"=="4" (
    echo.
    echo 🎨 Starting Frontend Only...
    cd frontend
    echo Installing dependencies...
    call npm install
    echo.
    echo ✅ Frontend ready! Starting dev server...
    call npm run dev
) else (
    echo Invalid choice!
    pause
    exit /b 1
)
