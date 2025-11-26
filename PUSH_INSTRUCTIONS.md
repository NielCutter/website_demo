# Push to GitHub - Quick Instructions

## Step 1: Install Git

If Git is not installed, download and install it:
- **Download:** https://git-scm.com/download/win
- During installation, make sure to select "Git from the command line and also from 3rd-party software"
- Restart your terminal/PowerShell after installation

## Step 2: Run the Push Script

Once Git is installed, simply double-click `push-to-github.bat` in this folder, OR run these commands in PowerShell:

```powershell
# Navigate to your project (if not already there)
cd "C:\Users\nielc\Documents\testsite"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: New Culture Trends site setup for GitHub Pages"

# Add your GitHub repository as remote
git remote add origin https://github.com/NielCutter/website_demo.git

# Set main branch
git branch -M main

# Push to GitHub (overwriting existing content)
git push -u origin main --force
```

## Step 3: Enable GitHub Pages

After pushing:

1. Go to: https://github.com/NielCutter/website_demo/settings/pages
2. Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
3. The GitHub Actions workflow will automatically deploy your site

## Step 4: Configure Custom Domain

1. In the same Pages settings, under **"Custom domain"**, enter: `newculturetrends.com`
2. Check **"Enforce HTTPS"** (available after DNS is configured)
3. Configure your DNS records at your domain registrar (see README.md for details)

## Troubleshooting

- If you get "remote origin already exists", run: `git remote set-url origin https://github.com/NielCutter/website_demo.git`
- If authentication fails, you may need to use a Personal Access Token instead of password
- Make sure you're logged into GitHub in your browser

