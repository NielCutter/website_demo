# Business Profit Calculator - Implementation Guide

## Overview
A full-featured Business Profit Calculator Web App integrated into the admin panel, using the same portfolio styling for a consistent user experience.

## Features

### 1. Profit Calculator Page (`/admin/profit/calculator`)
- **Input Fields:**
  - Raw Materials
  - Labor
  - Packaging
  - Marketing
  - Marketplace Fees
  - Overhead
  - Tax Rate (%)
  - Selling Price

- **Real-time Calculations:**
  - Total Cost
  - Gross Profit
  - Net Profit
  - Profit Margin (%)
  - Markup (%)
  - Break-Even Point
  - ROI (Return on Investment)

- **Features:**
  - Auto-calculates all metrics as you type
  - Save calculations to Firestore
  - Reset form functionality
  - Item name for organization

### 2. Dashboard Page (`/admin/profit/dashboard`)
- View all saved calculations in a table
- Search by item name
- Sort by:
  - Date (newest/oldest)
  - Profit Margin (high/low)
  - Item Name (A-Z/Z-A)
- Actions:
  - View details (modal)
  - Edit calculation
  - Delete calculation
- Create new calculation button

### 3. Admin Settings Page (`/admin/profit/settings`)
- **Default Tax Rate:**
  - Set default tax rate (default: 12% for Philippines VAT)
  - Save to Firestore

- **Marketplace Fee Presets:**
  - Add custom marketplace presets (e.g., Shopee, Lazada)
  - Set fee percentage for each preset
  - Delete presets
  - Store in Firestore collection `marketplacePresets`

## File Structure

```
src/
├── components/
│   ├── admin/
│   │   └── profit/
│   │       ├── ProfitCalculator.tsx      # Main calculator component
│   │       ├── ProfitInputField.tsx      # Reusable input field
│   │       ├── ProfitResultCard.tsx      # Result display cards
│   │       └── ProfitNav.tsx             # Navigation component
│   └── ui/                                # Existing UI components
├── pages/
│   └── admin/
│       ├── ProfitCalculatorPage.tsx      # Calculator page
│       ├── ProfitDashboardPage.tsx       # Dashboard page
│       └── ProfitAdminSettingsPage.tsx    # Settings page
├── services/
│   └── profitService.ts                   # Firestore operations
├── types/
│   └── profit.ts                          # TypeScript interfaces
└── utils/
    └── profit.ts                          # Calculation formulas
```

## Routes

All routes are protected by `ProtectedRoute` and require admin authentication:

- `/admin/profit/calculator` - Profit Calculator
- `/admin/profit/dashboard` - Dashboard
- `/admin/profit/settings` - Admin Settings

## Firestore Collections

### `profitCalculations`
Stores user calculations:
```typescript
{
  itemName: string;
  inputs: ProfitInputs;
  results: ProfitResults;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `profitAdminSettings`
Stores admin settings:
```typescript
{
  defaultTaxRate: number;
  updatedAt: Timestamp;
  updatedBy: string;
}
```

### `marketplacePresets`
Stores marketplace fee presets:
```typescript
{
  name: string;
  feePercentage: number;
  createdAt: Timestamp;
}
```

## Calculation Formulas

All formulas are in `src/utils/profit.ts`:

- **Total Cost** = Raw Materials + Labor + Packaging + Marketing + Marketplace Fees + Overhead
- **Gross Profit** = Selling Price - Total Cost
- **Tax** = Gross Profit × (Tax Rate / 100)
- **Net Profit** = Gross Profit - Tax
- **Profit Margin** = (Net Profit / Selling Price) × 100
- **Markup** = ((Selling Price - Total Cost) / Total Cost) × 100
- **Break-Even** = Total Cost
- **ROI** = (Net Profit / Total Cost) × 100

## Styling

Uses the same portfolio styling (`portfolio-extra.css`) for consistency:
- Clean, modern design
- Responsive layout
- Professional color scheme
- Mobile-first approach

## Usage

1. **Access the Calculator:**
   - Navigate to Admin Dashboard
   - Click on "Profit Calculator" section
   - Select "New Calculation"

2. **Calculate Profit:**
   - Enter item name
   - Fill in all cost fields
   - Set tax rate and selling price
   - View real-time results
   - Click "Save Calculation" to store

3. **View Saved Calculations:**
   - Go to Dashboard
   - Search or sort as needed
   - View, edit, or delete calculations

4. **Manage Settings:**
   - Go to Settings
   - Update default tax rate
   - Add/remove marketplace presets

## Environment Variables

The app uses existing Firebase configuration from `.env`:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- (and other Firebase config variables)

See `.env.example` for reference.

## Authentication

Uses existing `useAdminAuth` hook:
- Only admin emails can access
- Protected routes ensure security
- User ID stored with each calculation

## Future Enhancements

Potential improvements:
- Export calculations to CSV/PDF
- Chart visualizations
- Bulk calculations
- Templates for common products
- Integration with product catalog
- Historical profit trends

## Notes

- All calculations are rounded to 2 decimal places
- Currency formatting uses PHP (₱) format
- Percentage values are displayed with 2 decimal places
- Dates are formatted using locale settings
- Error handling includes user-friendly alerts

