# Fix 404 Error on Calculator Page

## Issue
Getting 404 errors when accessing `/admin/profit/calculator` page.

## Solution

The 404 error is likely caused by:
1. **Stale build files** - Old asset names in cache
2. **Browser cache** - Browser trying to load old asset files
3. **Missing assets** - Assets not properly built

## Steps to Fix

### 1. Clear Build and Rebuild
```bash
# Delete old build
rm -rf dist

# Rebuild
npm run build
```

### 2. Clear Browser Cache
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or clear browser cache completely

### 3. Verify Assets
After rebuilding, check that `dist/assets/` contains:
- `index-*.css` (CSS file)
- `index-*.js` (JavaScript file)

### 4. Check HTML
The `dist/index.html` should reference assets with absolute paths:
```html
<script type="module" crossorigin src="/assets/index-XXXXX.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-XXXXX.css">
```

### 5. For Firebase Hosting
If deploying to Firebase, ensure `firebase.json` has proper rewrites:
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 6. For GitHub Pages
The `public/404.html` should handle redirects (already configured).

## Current Status
- ✅ CSS moved to App.tsx (loaded globally)
- ✅ Vite config has `base: '/'` (absolute paths)
- ✅ Routes are properly configured
- ✅ Build completes successfully

The 404 should resolve after:
1. Clearing browser cache
2. Rebuilding the project
3. Hard refreshing the page

