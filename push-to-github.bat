@echo off
echo Initializing git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: New Culture Trends site setup for GitHub Pages"

echo Adding remote repository...
git remote add origin https://github.com/NielCutter/website_demo.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub (overwriting existing content)...
git push -u origin main --force

echo.
echo Done! Your code has been pushed to GitHub.
echo.
echo Next steps:
echo 1. Go to https://github.com/NielCutter/website_demo/settings/pages
echo 2. Under "Source", select "GitHub Actions"
echo 3. Configure your DNS for newculturetrends.com
echo.
pause

