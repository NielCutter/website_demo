# Quick Push Instructions

## Option 1: Use the Batch Script (Easiest)

1. **Make sure Git is installed:**
   - Download from: https://git-scm.com/download/win
   - During installation, select "Git from the command line and also from 3rd-party software"
   - Restart your terminal after installation

2. **Run the script:**
   - Double-click `push-to-github.bat` in this folder
   - Or open PowerShell here and run: `.\push-to-github.bat`

## Option 2: Manual Commands

If Git is installed, run these commands in PowerShell:

```powershell
# Navigate to project (if not already there)
cd "C:\Users\nielc\Documents\testsite"

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit changes
git commit -m "Fix build: Add missing dependencies and configure for GitHub Pages"

# Add remote (or update if exists)
git remote remove origin 2>$null
git remote add origin https://github.com/NielCutter/website_demo.git

# Set main branch
git branch -M main

# Push (overwrites existing content)
git push -u origin main --force
```

## Option 3: GitHub Desktop (No Command Line)

1. Download: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository → Select this folder
4. Write commit message: "Fix build: Add missing dependencies"
5. Click "Commit to main"
6. Click "Push origin" (or "Publish repository" if first time)
7. If asked about overwriting, choose "Force push"

## After Pushing

1. Go to: https://github.com/NielCutter/website_demo/actions
2. You should see the build workflow running
3. Once it completes, go to: https://github.com/NielCutter/website_demo/settings/pages
4. Under "Source", select **"GitHub Actions"**
5. Your site will be available at the GitHub Pages URL

## Troubleshooting

- **"Git is not recognized"**: Install Git and restart terminal
- **Authentication failed**: Use a Personal Access Token (Settings → Developer settings → Personal access tokens → Tokens (classic))
- **Permission denied**: Make sure you have write access to the repository

