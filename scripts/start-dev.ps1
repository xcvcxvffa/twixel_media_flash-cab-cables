# FlashCab Cables - Start All Dev Servers (Windows PowerShell)

Write-Host "🚀 Starting FlashCab Cables Development Servers..." -ForegroundColor Cyan
Write-Host ""

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# ─── Start PHP Backend ────────────────────────────────────────────────────────
Write-Host "🐘 Starting PHP API on http://localhost:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; php -S localhost:8000 index.php"

Start-Sleep -Seconds 2

# ─── Start React Website ──────────────────────────────────────────────────────
Write-Host "⚛️  Starting Website on http://localhost:5173..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend\website'; npm run dev"

Start-Sleep -Seconds 2

# ─── Start Admin Panel ────────────────────────────────────────────────────────
Write-Host "🛠️  Starting Admin Panel on http://localhost:5176..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend\admin'; npm start"

Write-Host ""
Write-Host "✅ All servers starting! Wait a few seconds then open:" -ForegroundColor Cyan
Write-Host "   🌐 Website    → http://localhost:5173"   -ForegroundColor White
Write-Host "   🛠️  Admin      → http://localhost:5176"   -ForegroundColor White
Write-Host "   🐘 PHP API    → http://localhost:8000"   -ForegroundColor White
Write-Host ""
Write-Host "   Admin Login: admin / password" -ForegroundColor Gray
