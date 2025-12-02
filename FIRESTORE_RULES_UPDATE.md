# Firestore Rules Update for Profit Calculator

## Updated Rules

The Firestore security rules have been updated to include permissions for the Profit Calculator collections.

## New Collections Added

### 1. `profitCalculations`
- **Read**: Authenticated users can read their own calculations. Admins can read all.
- **Create**: Authenticated users can create calculations with their own `userId`.
- **Update/Delete**: Users can update/delete their own calculations. Admins can update/delete any.

### 2. `profitAdminSettings`
- **Read/Write**: Only admins can access settings.

### 3. `marketplacePresets`
- **Read/Write**: Only admins can manage marketplace presets.

## Deployment Instructions

### Option 1: Deploy via Firebase CLI

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase (if not already done):
   ```bash
   firebase init firestore
   ```

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Option 2: Update via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** > **Rules** tab
4. Copy the updated rules from `firebase.rules`
5. Paste into the rules editor
6. Click **Publish**

## Verification

After deploying the rules, test the Profit Calculator:

1. Go to `/admin/profit/calculator`
2. Create a calculation and save it
3. Go to `/admin/profit/dashboard`
4. Verify you can see your saved calculations
5. Go to `/admin/profit/settings`
6. Verify you can view and update settings

If you still see permission errors:
- Check that you're logged in as an admin
- Verify the rules were deployed successfully
- Check the browser console for specific error messages

## Current Admin Email

The rules use the `isAdmin()` function which currently checks for:
- `admin@newculturetrends.com`

To add more admin emails, update the `isAdmin()` function in `firebase.rules`:

```javascript
function isAdmin() {
  return request.auth != null
    && request.auth.token.email in [
      'admin@newculturetrends.com',
      'another-admin@example.com'
    ];
}
```

