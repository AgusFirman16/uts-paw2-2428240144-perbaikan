@echo off
echo Menginisialisasi Git dan membuat 3 riwayat commit sesuai instruksi UTS...
git init -b main

REM Commit 1: Bagian A
git add .gitignore .env.example middlewares/ package.json package-lock.json
git commit -m "Bagian A: Konfigurasi dotenv, CORS, dan errorHandler terpusat"

REM Commit 2: Bagian B
git add models/
git commit -m "Bagian B: Koneksi MongoDB serta model Fakultas dan Kandidat"

REM Commit 3: Bagian C
git add controllers/ routes/ app.js seed.js postman/
git commit -m "Bagian C: Implementasi endpoint CRUD Fakultas dan Kandidat"

echo Selesai! Cek dengan perintah: git log --oneline
