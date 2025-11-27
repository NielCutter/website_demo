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

## Troubleshooting

- If votes don't sync, check browser console for Firebase errors
- Verify your Firebase config is correct
- Make sure Firestore is enabled and rules allow read/write
- Check that environment variables are set correctly

