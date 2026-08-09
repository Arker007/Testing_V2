@echo off
title Stopping Vishal Enterprise Project
echo ==========================================
echo   STOPPING VISHAL ENTERPRISE WEB PROJECT
echo ==========================================
echo.

set found=0

echo Scanning ports and terminating active processes...

:: Kill processes on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo [API] Found process PID %%a on port 3000. Terminating...
    taskkill /f /pid %%a >nul 2>&1
    set found=1
)

:: Kill processes on port 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do (
    echo [UI] Found process PID %%a on port 5173. Terminating...
    taskkill /f /pid %%a >nul 2>&1
    set found=1
)

:: Kill processes on port 5174
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174" ^| findstr "LISTENING"') do (
    echo [UI] Found process PID %%a on port 5174. Terminating...
    taskkill /f /pid %%a >nul 2>&1
    set found=1
)

if %found%==0 (
    echo No active project processes detected on ports 3000, 5173, or 5174.
    goto end
)

:: Verification Loop
echo Verifying process shutdown and socket release...
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
echo Sockets successfully freed and processes closed.
goto end

:wait_more
set /a retry+=1
if %retry% gtr 3 (
    echo.
    echo WARNING: One of the ports (3000/5173/5174) is still listening.
    echo Please run this terminal as Administrator if processes fail to exit.
    echo.
    goto end
)
echo Sockets still busy, waiting for release (attempt %retry%/3)...
timeout /t 1 /nobreak >nul 2>&1
goto check_ports

:end
echo.
echo Operation complete.
timeout /t 3 >nul
