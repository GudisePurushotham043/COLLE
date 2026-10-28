@echo off
title ALITS ERP - Python Live Server
echo ======================================================
echo    ALITS ERP - Autonomous Engineering Institution
echo    Starting Python Backend Server (Flask + SQLite)...
echo ======================================================
echo.

:: Check python
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in system PATH!
    echo Please install Python 3.10+ and add it to PATH.
    pause
    exit /b 1
)

:: Launch browser after 2 seconds
start "" timeout /t 2 /nobreak >nul & start "" http://localhost:5000

:: Run the python server
python server.py

if %errorlevel% neq 0 (
    echo.
    echo Server terminated with code %errorlevel%.
    pause
)
