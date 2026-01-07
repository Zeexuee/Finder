# 📚 Tutorial Lengkap Menjalankan Thesis Finder Project

> Panduan step-by-step untuk menjalankan thesis-finder tanpa Docker

## 📋 Daftar Isi

1. [Prerequisites](#prerequisites)
2. [Struktur Project](#struktur-project)
3. [Persiapan Awal](#persiapan-awal)
4. [Menjalankan Services](#menjalankan-services)
5. [Mengakses Aplikasi](#mengakses-aplikasi)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Sebelum menjalankan project, pastikan Anda sudah install:

### 1. **Node.js 18+**
   - Download: https://nodejs.org/
   - Verifikasi: `node --version` & `npm --version`
   
   ```powershell
   node --version    # Harus v18.0.0 atau lebih
   npm --version     # Harus 9.0.0 atau lebih
   ```

### 2. **Python 3.8+**
   - Download: https://www.python.org/
   - Verifikasi: `python --version`
   
   ```powershell
   python --version  # Harus Python 3.8 atau lebih
   ```

### 3. **PostgreSQL 15+** (dengan pgvector)
   - Download: https://www.postgresql.org/
   - atau gunakan Docker: `docker run --name thesis_postgres -e POSTGRES_USER=thesis_user -e POSTGRES_PASSWORD=thesis_password -e POSTGRES_DB=thesis_finder -p 5432:5432 pgvector/pgvector:pg15-latest`

### 4. **.env File**
   - Copy `.env.example` ke `.env`
   - Isi dengan API keys yang sesuai

---

## 🗂️ Struktur Project

```
thesis-finder/
├── backend/              # Node.js + Express API
├── frontend/             # Next.js 14 React App
├── ai-service/           # Python Flask Service
├── shared/               # Shared types & constants
└── docs/                 # Dokumentasi
```

---

## 🚀 Persiapan Awal

### Step 1: Navigasi ke Folder Project
```powershell
cd d:\laragon\www\projek\thesis-finder
```

### Step 2: Setup Backend
```powershell
cd backend
npm install
npm run prisma:migrate
```

**Penjelasan:**
- `npm install` = Download semua dependency
- `npm run prisma:migrate` = Setup database schema

### Step 3: Setup Frontend
```powershell
cd ../frontend
npm install
```

**Penjelasan:**
- Hanya perlu install dependency, tidak perlu build

### Step 4: Setup AI Service
```powershell
cd ../ai-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

**Penjelasan:**
- `python -m venv venv` = Buat virtual environment isolated
- `.\venv\Scripts\activate` = Aktifkan virtual environment
- `pip install -r requirements.txt` = Install Python dependencies

---

## ⚙️ Menjalankan Services

> ⚠️ **PENTING**: Buka **4 Terminal PowerShell terpisah** untuk setiap service

### Terminal 1: Backend (Node.js + Express)

```powershell
cd d:\laragon\www\projek\thesis-finder\backend
npm run dev
```

**Output yang diharapkan:**
```
> thesis-finder-backend@1.0.0 dev
> tsx watch src/app.ts

🚀 Server running on port 3000
```

✅ **Backend siap!** Akses: http://localhost:3000

---

### Terminal 2: Frontend (Next.js)

```powershell
cd d:\laragon\www\projek\thesis-finder\frontend
npm run dev
```

**Output yang diharapkan:**
```
> thesis-finder-frontend@0.1.0 dev
> next dev

  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  ✓ Starting...
```

✅ **Frontend siap!** Akses: http://localhost:3000

---

### Terminal 3: AI Service (Python Flask)

```powershell
cd d:\laragon\www\projek\thesis-finder\ai-service
.\venv\Scripts\activate
python app.py
```

**Output yang diharapkan:**
```
* Running on http://127.0.0.1:5000
* Press CTRL+C to quit
```

✅ **AI Service siap!** Akses: http://localhost:5000

---

### Terminal 4: Monitor Database (Optional)

& "D:\PostgreSQL\bin\pg_ctl.exe" -D "$env:USERPROFILE\PostgreSQL\pgdata" -l "$env:USERPROFILE\PostgreSQL\logfile.log" start

Jika menggunakan Docker untuk database:
```powershell
docker run --name thesis_postgres `
  -e POSTGRES_USER=thesis_user `
  -e POSTGRES_PASSWORD=thesis_password `
  -e POSTGRES_DB=thesis_finder `
  -p 5432:5432 `
  pgvector/pgvector:pg15-latest
```

Atau jika PostgreSQL sudah installed locally, database akan otomatis terhubung via connection string di `.env`

---

## 🌐 Mengakses Aplikasi

Setelah semua services running, akses:

### 1. **Frontend UI**
   - URL: http://localhost:3000
   - Lihat interface web aplikasi
   - Bisa search, view results

### 2. **Backend API** (for testing)
   - Base URL: http://localhost:3000/api
   - Contoh endpoints:
     - `GET /api/search?q=machine+learning`
     - `POST /api/datasets`
     - `GET /api/health`

### 3. **AI Service API** (for advanced users)
   - Base URL: http://localhost:5000
   - Endpoints untuk embedding, generation, dll

---

## 🛠️ Troubleshooting

### ❌ Error: "npm: command not found"
**Solusi:** Node.js belum di-install atau PATH belum di-set
```powershell
node --version  # Check apakah Node.js terinstall
```
- Reinstall Node.js dari https://nodejs.org/

### ❌ Error: "python: command not found"
**Solusi:** Python belum di-install atau PATH belum di-set
```powershell
python --version  # Check apakah Python terinstall
```
- Reinstall Python dari https://www.python.org/
- ✅ Centang "Add Python to PATH" saat install

### ❌ Error: "Could not connect to database"
**Solusi:** PostgreSQL belum running
```powershell
# Jika pakai Docker:
docker run --name thesis_postgres -e POSTGRES_USER=thesis_user -e POSTGRES_PASSWORD=thesis_password -e POSTGRES_DB=thesis_finder -p 5432:5432 pgvector/pgvector:pg15-latest

# Atau start PostgreSQL service di Windows
```

### ❌ Error: "Port 3000 already in use"
**Solusi:** Ada aplikasi lain menggunakan port 3000
```powershell
# Cari process yang menggunakan port 3000
netstat -ano | findstr :3000

# Kill process (ganti PID dengan hasil dari command di atas)
taskkill /PID <PID> /F
```

### ❌ Error: "torch==2.1.2 version not found"
**Solusi:** Update requirements.txt
```
torch==2.7.0  # Ganti versi yang tersedia
```

### ❌ Error: "Cannot find .env file"
**Solusi:** Copy .env.example ke .env
```powershell
cd thesis-finder
copy .env.example .env
```
Lalu edit `.env` dengan settings yang sesuai

### ❌ Frontend atau Backend tidak reload otomatis
**Solusi:** Restart dev server
```powershell
# Stop dengan CTRL+C
# Jalankan lagi:
npm run dev
```

---

## 📝 File .env yang Diperlukan

Buat file `.env` di folder `thesis-finder/` dengan isi:

```env
# Database
DATABASE_URL="postgresql://thesis_user:thesis_password@localhost:5432/thesis_finder"
DB_USER=thesis_user
DB_PASSWORD=thesis_password
DB_NAME=thesis_finder

# AI Service
AI_SERVICE_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key_here

# Payment (Midtrans)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key

# Session
SESSION_SECRET=your_session_secret_key

# Environment
NODE_ENV=development
```

---

## 🎯 Workflow Ideal

### Setiap Kali Mulai Development:

1. **Pastikan Database Running**
   - Docker PostgreSQL atau PostgreSQL service

2. **Buka 4 Terminal**
   ```
   Terminal 1: Backend    → npm run dev
   Terminal 2: Frontend   → npm run dev
   Terminal 3: AI Service → python app.py
   Terminal 4: Logs/Monitor
   ```

3. **Akses http://localhost:3000**
   - Frontend sudah siap
   - Backend sudah siap
   - Bisa test fitur

4. **Development**
   - Edit file → auto-reload
   - Check console untuk errors
   - Test API endpoints

---

## 📊 Monitoring Tips

### Cek Backend Logs
```powershell
# Terminal Backend - lihat console output
# Setiap request akan di-log
```

### Cek Frontend Logs
```powershell
# Terminal Frontend - lihat console output
# Next.js compilation messages
```

### Cek AI Service Logs
```powershell
# Terminal AI Service - lihat Flask output
# API requests akan di-log
```

### Cek Database Connection
```powershell
# Di backend, cek Prisma logs
# Di console backend akan muncuk query info
```

---

## ✨ Tips & Tricks

### Restart Semua Services Dengan Cepat
```powershell
# Tekan CTRL+C di setiap terminal
# Jalankan command npm run dev / python app.py lagi
```

### Clear Cache Next.js
```powershell
cd frontend
rm -r .next
npm run dev
```

### Reset Database
```powershell
cd backend
npm run prisma:migrate reset
npm run prisma:seed
```

### Check Listening Ports
```powershell
netstat -ano | findstr LISTENING
```

---

## 🤔 FAQ

**Q: Apakah saya perlu buka 4 terminal?**
A: Ya, setiap service berjalan di process terpisah, jadi perlu terminal terpisah.

**Q: Bisakah saya menggunakan 1 terminal?**
A: Bisa, tapi harus run command dengan `&` (background) dan lebih ribet untuk monitoring.

**Q: Berapa lama setup pertama kali?**
A: ~5-10 menit (tergantung koneksi internet untuk download dependencies)

**Q: Apakah harus restart semua service jika ada perubahan code?**
A: Tidak, auto-reload sudah aktif (`npm run dev` dengan `tsx watch` dan Next.js dev mode)

**Q: Bagaimana kalau mau production build?**
A: 
```powershell
# Frontend
cd frontend
npm run build
npm run start

# Backend
cd backend
npm run build
npm start
```

---

## 🚀 Next Steps

Setelah semuanya running:

1. **Buka Frontend**: http://localhost:3000
2. **Coba search** untuk test integration
3. **Check terminal logs** untuk memahami flow
4. **Modifikasi code** dan lihat auto-reload
5. **Test API** menggunakan Postman/Insomnia

---

## 📞 Bantuan Lebih Lanjut

Jika masih ada pertanyaan:
1. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) untuk perintah cepat
2. Check [API_DOCS.md](API_DOCS.md) untuk dokumentasi API
3. Check error messages di console dengan teliti
4. Google error message yang muncul

---

**Happy Coding! 🎉**

Last Updated: January 5, 2026
