# Firebase Setup for Vote Storage

✅ **Firebase is already configured!** Your Firebase credentials live in `src/firebase/config.ts`.

To enable cross-device vote synchronization, you just need to enable Firestore Database.

## Step 1: Enable Firestore Database

✅ Your Firebase project is already created: **nctr-34dd5**

1. In your Firebase project, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for development)
4. Choose a location (closest to your users)
5. Click "Enable"

## Step 2: (Optional) Override Firebase Config

If you want to use a different Firebase project:

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Copy the `firebaseConfig` object
5. Create a `.env` file in the project root (copy from `.env.example`)
6. Paste your values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
VITE_ADMIN_EMAILS=admin@newculturetrends.com
```

## Step 3: Configure Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/project/nctr-34dd5/firestore)
2. Click on "Rules" tab
3. Update the rules to allow read/write (for development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productVotes/{productId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

4. Click "Publish"

**⚠️ Important:** For production, you should add proper authentication and rate limiting.

## Step 4: Set Up GitHub Secrets (Optional)

1. Go to your GitHub repository
2. Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## How It Works

- **LocalStorage**: Stores votes immediately for instant UI updates
- **Firebase**: Syncs votes across all devices in real-time
- **Fallback**: If Firebase is unavailable, it uses localStorage only

## Testing

1. Vote on a product
2. Check Firebase Console > Firestore Database to see the vote
3. Open the site on another device - votes should sync automatically

## Step 5: Image Storage (No Firebase Storage Billing Required!)

✅ **Images are stored as base64 in Firestore** - No Firebase Storage billing needed!

The admin panel automatically:
- Converts uploaded images to base64 format
- Compresses and resizes images (max 800px, 80% quality)
- Stores them directly in Firestore documents

**Limitations:**
- Max image size: 2MB before upload (will be compressed)
- Firestore document limit: 1MB (compressed images should be under 750KB)
- Works great for product images, thumbnails, etc.

**Alternative: Use External URLs**
- You can also paste external image URLs (Imgur, Cloudinary, etc.)
- Just paste the URL in the "External image URL" field
- No file upload needed

## Step 6: Create Admin User (Required for Admin Dashboard)

1. Go to [Firebase Console](https://console.firebase.google.com/project/nctr-34dd5/authentication/users)
2. Click **"Add user"** or **"Users"** tab
3. Click **"Add user"**
4. Enter:
   - **Email:** `admin@newculturetrends.com`
   - **Password:** (choose a strong password)
5. Click **"Add user"**
6. Save this password - you'll use it to log into `/admin`

## Step 7: (Optional) Configure Firebase Storage Security Rules

**Note:** If you're using base64 images in Firestore (default), you don't need Firebase Storage at all!

If you want to use Firebase Storage instead (requires billing):
1. Go to [Firebase Console](https://console.firebase.google.com/project/nctr-34dd5/storage)
2. Click on **"Rules"** tab
3. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /items/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.token.email in ['admin@newculturetrends.com'];
    }
  }
}
```

4. Click **"Publish"**

## Troubleshooting

- **Image too large error**: Use images smaller than 2MB, or use external URLs instead
- **Admin login 400 error**: Create the admin user in Firebase Auth (Step 6)
- **Votes don't sync**: Check browser console for Firebase errors
- **Verify your Firebase config is correct**: Check `.env` file or GitHub Secrets
- **Make sure Firestore is enabled**: Go to Firestore Database and create if needed
- **Base64 images not loading**: Check browser console, ensure imageUrl starts with `data:image/`

