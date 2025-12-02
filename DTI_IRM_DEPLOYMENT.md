# DTI IRM Page Deployment Instructions

## ✅ IRM Page Created

The Internal Redress Mechanism (IRM) page has been created at:
- **Route:** `/irm`
- **Full URL:** `https://newculturetrends.com/irm`

## 📋 What Was Created

1. **IRM Page Component** (`src/pages/IRMPage.tsx`)
   - Contains all mandatory DTI-compliant sections
   - Lists all official business platform URLs
   - Mobile-responsive and accessible
   - No authentication required (publicly accessible)

2. **Route Added** (`src/App.tsx`)
   - Route `/irm` is publicly accessible
   - No password, no auth, no redirects

## ✅ DTI Compliance Checklist

The IRM page includes all required elements:

- ✅ **Complaint Channels:**
  - Email: nielcutter.nc@gmail.com
  - Website contact form
  - Facebook Messenger
  - Shopee chat

- ✅ **Acknowledgment Time:** 24-48 hours

- ✅ **Resolution Time:** 7-15 working days

- ✅ **Required Information from Customer:**
  - Full Name
  - Order Number
  - Description of Issue
  - Proof/Evidence
  - Contact Information
  - Preferred Resolution

- ✅ **Possible Resolutions:**
  - Full Refund
  - Partial Refund
  - Replacement
  - Exchange
  - Store Credit
  - Repair/Service

- ✅ **Escalation to DTI E-Commerce Bureau:**
  - Contact information provided
  - Escalation process explained

- ✅ **Data Privacy Compliance:**
  - Data Privacy Act of 2012 (RA 10173) compliance
  - Privacy rights explained

- ✅ **Official Business Platform URLs Listed:**
  - Website: https://newculturetrends.com
  - Shopee: https://shopee.ph/newculturetrends
  - Facebook: https://facebook.com/newculturetrends

- ✅ **Publicly Accessible:**
  - No password required
  - No authentication required
  - No redirects
  - Direct access at `/irm`

## 🚀 Deployment Steps

### Step 1: Build and Deploy

The IRM page is already included in your build. To deploy:

```bash
# Build the project
npm run build

# Deploy to Firebase (if using Firebase Hosting)
firebase deploy

# Or deploy to GitHub Pages (if using GitHub Actions)
git add .
git commit -m "Add DTI-compliant IRM page"
git push origin main
```

### Step 2: Verify IRM Page is Live

1. Visit: `https://newculturetrends.com/irm`
2. Verify the page loads without any authentication
3. Check that all sections are visible
4. Verify all links are working
5. Test on mobile device for responsiveness

### Step 3: Update DTI Registration

1. Log in to your DTI Trustmark account
2. Go to your business registration
3. Find the "Business URL" field
4. Enter exactly: `https://newculturetrends.com/irm`
5. Save the changes
6. Submit for review

## ⚠️ Important Notes

1. **Exact URL Required:** DTI requires the exact URL where the IRM is located. Use: `https://newculturetrends.com/irm`

2. **No Redirects:** The IRM must be directly accessible. Do not use redirects or short URLs.

3. **All URLs Must Match:** The business platform URLs listed in the IRM must exactly match those submitted in your DTI registration.

4. **Keep Updated:** If you change any business platform URLs, update both:
   - The IRM page (`src/pages/IRMPage.tsx`)
   - Your DTI registration

5. **Public Access:** Ensure the `/irm` route remains publicly accessible. Do not add authentication or password protection.

## 🔍 Testing Checklist

Before submitting to DTI, verify:

- [ ] Page loads at `https://newculturetrends.com/irm` without login
- [ ] All sections are visible immediately (no clicking required)
- [ ] All business platform URLs are listed and correct
- [ ] All links are working (email, website, Shopee, Facebook)
- [ ] Page is mobile-responsive
- [ ] No broken links or 404 errors
- [ ] Contact information is correct
- [ ] DTI registration number is displayed (7297002)
- [ ] BIR TIN is displayed (409-146-642-000)

## 📞 Support

If you need to update any information on the IRM page:

1. Edit `src/pages/IRMPage.tsx`
2. Update the relevant sections
3. Rebuild and redeploy

## ✅ Expected Result

After deployment and DTI review:
- **"With IRM" column in DTI Trustmark form should show: YES**

The automated DTI checker will:
1. Visit `https://newculturetrends.com/irm`
2. Verify the page is publicly accessible
3. Check for all mandatory sections
4. Verify business platform URLs match registration
5. Confirm compliance with DTI requirements

---

**Last Updated:** January 2025
**Status:** Ready for Deployment

