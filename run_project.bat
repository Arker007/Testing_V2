@echo off
title Starting Vishal Enterprise Project
echo ==========================================
echo   STARTING VISHAL ENTERPRISE WEB PROJECT
echo ==========================================
echo.

echo Checking and freeing active ports...

:: Kill processes on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo [API] Found active process PID %%a on port 3000. Terminating...
    taskkill /f /pid %%a >nul 2>&1
)

:: Kill processes on port 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do (
    echo [UI] Found active process PID %%a on port 5173. Terminating...
    taskkill /f /pid %%a >nul 2>&1
)

:: Kill processes on port 5174
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174" ^| findstr "LISTENING"') do (
    echo [UI] Found active process PID %%a on port 5174. Terminating...
    taskkill /f /pid %%a >nul 2>&1
)

:: Wait loop to ensure OS fully releases sockets
echo Waiting for ports to be fully released...
set /a retry=0

:check_ports
netstat -aon | findstr ":3000" | findstr "LISTENING" >nul 2>&1
set api_used=%errorlevel%
netstat -aon | findstr ":5173" | findstr "LISTENING" >nul 2>&1
set ui_used1=%errorlevel%
netstat -aon | findstr ":5174" | findstr "LISTENING" >nul 2>&1
set ui_used2=%errorlevel%

if %api_used%==0 (goto wait_more)
if %ui_used1%==0 (goto wait_more)
if %ui_used2%==0 (goto wait_more)
goto launch

:wait_more
set /a retry+=1
if %retry% gtr 3 (
    echo.
    echo WARNING: One of the ports (3000/5173/5174) is still listening.
    echo If launch fails, please try running this terminal as Administrator.
    echo.
    goto launch
)
echo Sockets still busy, waiting 1 second (attempt %retry%/3)...
timeout /t 1 /nobreak >nul 2>&1
goto check_ports

:launch
echo.
echo Sockets are clear. Launching Backend API (Port 3000) and Frontend UI (Port 5173)...
echo Keep this window open while developing.
echo.
npm run dev:full
pause
