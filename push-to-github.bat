@echo off
echo ========================================
echo Pushing to GitHub Repository
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH.
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Make sure to select "Git from the command line" during installation.
    echo.
    pause
    exit /b 1
)

echo Step 1: Initializing git repository (if needed)...
if not exist .git (
    git init
) else (
    echo Git repository already initialized.
)

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating commit...
git commit -m "Fix build: Add missing dependencies and configure for GitHub Pages" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo No changes to commit, or commit already exists.
)

echo.
echo Step 4: Checking remote repository...
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Adding remote repository...
    git remote add origin https://github.com/NielCutter/website_demo.git
) else (
    echo Remote already configured.
    git remote set-url origin https://github.com/NielCutter/website_demo.git
)

echo.
echo Step 5: Setting main branch...
git branch -M main 2>nul

echo.
echo Step 6: Pushing to GitHub (overwriting existing content)...
echo WARNING: This will overwrite existing content in the repository!
echo.
pause
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Your code has been pushed to GitHub.
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Go to: https://github.com/NielCutter/website_demo/settings/pages
    echo 2. Under "Source", select "GitHub Actions"
    echo 3. The build will start automatically
    echo 4. Configure your DNS for newculturetrends.com
    echo.
) else (
    echo.
    echo ERROR: Push failed. You may need to:
    echo - Check your GitHub credentials
    echo - Use a Personal Access Token instead of password
    echo - Make sure you have write access to the repository
    echo.
)

pause

