# Quick Start - Firebase Vote Storage

## ✅ What's Already Done

1. ✅ Firebase credentials are configured in `utils/firebase.ts`
2. ✅ Firebase package is installed
3. ✅ Vote storage system is set up with Firebase integration

## 🚀 Final Step: Enable Firestore Database

**This is the only step you need to complete:**

1. Go to [Firebase Console](https://console.firebase.google.com/project/nctr-34dd5/firestore)
2. Click **"Create database"** (if you haven't already)
3. Choose **"Start in test mode"**
4. Select a location (choose closest to your users)
5. Click **"Enable"**

## 🔒 Set Up Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Replace the rules with:

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

3. Click **"Publish"**

## ✨ That's It!

Once Firestore is enabled, votes will:
- ✅ Save to localStorage (instant updates)
- ✅ Sync to Firebase (cross-device)
- ✅ Update in real-time across all devices

## 🧪 Test It

1. Run `npm run dev`
2. Vote on a product
3. Check Firebase Console > Firestore Database - you should see a `productVotes` collection
4. Open the site on another device - votes should appear!

## 📝 Note

The Firebase config is already in the code, so it will work even without environment variables. The `.env` file is optional but recommended for production.

