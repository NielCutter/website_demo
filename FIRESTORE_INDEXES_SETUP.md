# Firestore Indexes Setup for Profit Calculator

## Problem
Firestore requires composite indexes when you combine `where` clauses with `orderBy` on different fields. The profit calculator queries need these indexes.

## Solution

### Option 1: Quick Fix - Click the Link (Recommended)
When you see the error, Firebase provides a direct link to create the index:
1. Click the link in the error message
2. Firebase Console will open with the index pre-configured
3. Click "Create Index"
4. Wait 1-2 minutes for the index to build
5. Refresh your app

### Option 2: Deploy via Firebase CLI

If you have Firebase CLI installed:

1. Make sure `firestore.indexes.json` is in your project root (already created)

2. Deploy the indexes:
   ```bash
   firebase deploy --only firestore:indexes
   ```

3. Wait for the indexes to build (check Firebase Console > Firestore > Indexes)

### Option 3: Manual Creation in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** > **Indexes** tab
4. Click **Create Index**
5. Create these indexes:

#### Index 1: userId + createdAt (Ascending)
- Collection ID: `profitCalculations`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Ascending)

#### Index 2: userId + createdAt (Descending)
- Collection ID: `profitCalculations`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)

#### Index 3: userId + results.profitMargin (Ascending)
- Collection ID: `profitCalculations`
- Fields:
  - `userId` (Ascending)
  - `results.profitMargin` (Ascending)

#### Index 4: userId + results.profitMargin (Descending)
- Collection ID: `profitCalculations`
- Fields:
  - `userId` (Ascending)
  - `results.profitMargin` (Descending)

#### Index 5: userId + itemName (Ascending)
- Collection ID: `profitCalculations`
- Fields:
  - `userId` (Ascending)
  - `itemName` (Ascending)

#### Index 6: userId + itemName (Descending)
- Collection ID: `profitCalculations`
- Fields:
  - `userId` (Ascending)
  - `itemName` (Descending)

## Why These Indexes?

The profit calculator dashboard queries calculations with:
- A `where` filter on `userId`
- An `orderBy` on different fields (`createdAt`, `results.profitMargin`, or `itemName`)
- Both ascending and descending order

Firestore requires a composite index for each combination of `where` + `orderBy` fields.

## Index Building Time

- Small collections: 1-2 minutes
- Large collections: 5-10 minutes
- You'll see the status in Firebase Console

## Verification

After indexes are built:
1. Go to `/admin/profit/dashboard`
2. The calculations should load without errors
3. Try sorting by different fields - all should work

## Note

The `firestore.indexes.json` file has been created in your project root. This file can be deployed via Firebase CLI to automatically create all needed indexes.

