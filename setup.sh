#!/bin/bash
# BpmSquare QA Automation - Automated Setup Script
# This script sets up the project ready for running tests

echo ""
echo "========================================"
echo "BpmSquare QA Automation Framework Setup"
echo "========================================"
echo ""

# Step 1: Check Node.js
echo "[1/4] Checking Node.js..."
node --version
if [ $? -ne 0 ]; then
    echo "ERROR: Node.js is not installed. Please install Node.js 14+ from https://nodejs.org"
    exit 1
fi

# Step 2: Install dependencies
echo ""
echo "[2/4] Installing npm dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed"
    exit 1
fi

# Step 3: Install Playwright browsers
echo ""
echo "[3/4] Installing Playwright browsers..."
npx playwright install
if [ $? -ne 0 ]; then
    echo "ERROR: Playwright installation failed"
    exit 1
fi

# Step 4: Setup environment file
echo ""
echo "[4/4] Setting up environment configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ""
    echo "✓ .env file created from template"
    echo ""
    echo "NEXT STEP:"
    echo "==========="
    echo "1. Open .env file and update with your BpmSquare credentials:"
    echo "   - BASE_URL: Your BpmSquare application URL"
    echo "   - TEST_USERNAME: Your test user email"
    echo "   - TEST_PASSWORD: Your test user password"
    echo ""
    echo "2. Run tests:"
    echo "   npm test"
    echo ""
else
    echo "✓ .env file already exists"
fi

echo ""
echo "========================================"
echo "✓ Setup Complete!"
echo "========================================"
echo ""
echo "To run your tests:"
echo "  npm test"
echo ""
echo "For more info, see QUICK_START.md or README.md"
echo ""
