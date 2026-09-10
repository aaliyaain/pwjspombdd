@echo off
REM BpmSquare QA Automation - Automated Setup Script
REM This script sets up the project ready for running tests

echo.
echo ========================================
echo BpmSquare QA Automation Framework Setup
echo ========================================
echo.

REM Step 1: Check Node.js
echo [1/4] Checking Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 14+ from https://nodejs.org
    pause
    exit /b 1
)

REM Step 2: Install dependencies
echo.
echo [2/4] Installing npm dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

REM Step 3: Install Playwright browsers
echo.
echo [3/4] Installing Playwright browsers...
call npx playwright install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Playwright installation failed
    pause
    exit /b 1
)

REM Step 4: Setup environment file
echo.
echo [4/4] Setting up environment configuration...
if not exist .env (
    copy .env.example .env
    echo.
    echo ✓ .env file created from template
    echo.
    echo NEXT STEP:
    echo ===========
    echo 1. Open .env file and update with your BpmSquare credentials:
    echo    - BASE_URL: Your BpmSquare application URL
    echo    - TEST_USERNAME: Your test user email
    echo    - TEST_PASSWORD: Your test user password
    echo.
    echo 2. Run tests:
    echo    npm test
    echo.
) else (
    echo ✓ .env file already exists
)

echo.
echo ========================================
echo ✓ Setup Complete!
echo ========================================
echo.
echo To run your tests:
echo   npm test
echo.
echo For more info, see QUICK_START.md or README.md
echo.
pause
