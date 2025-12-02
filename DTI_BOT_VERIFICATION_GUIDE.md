# How to Check What DTI Bot Will See - Complete Verification Guide

## 🔍 Quick Verification Methods

### Method 1: View Page Source (What Bots See First)

**Steps:**
1. Visit your homepage: `https://www.newculturetrends.com`
2. Right-click → **"View Page Source"** (or press `Ctrl+U`)
3. Search for these keywords (press `Ctrl+F`):

#### ✅ Check for Meta Tags:
```
dti-irm
dti-irm-url
dti-registration-number
```

**What to look for:**
```html
<meta name="dti-irm" content="yes" />
<meta name="dti-irm-url" content="https://www.newculturetrends.com/irm" />
<meta name="dti-registration-number" content="7297002" />
```

#### ✅ Check for JSON-LD Structured Data:
```
application/ld+json
DTI-IRM
IRM URL
```

**What to look for:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "additionalProperty": [
    {
      "name": "DTI-IRM",
      "value": "7297002"
    },
    {
      "name": "IRM URL",
      "value": "https://www.newculturetrends.com/irm"
    }
  ]
}
</script>
```

---

### Method 2: Check IRM Page Directly

**Steps:**
1. Visit: `https://www.newculturetrends.com/irm`
2. View page source (`Ctrl+U`)
3. Search for:
   - "Internal Redress Mechanism"
   - "Complaint Channels"
   - "Acknowledgment"
   - "Resolution"

**What DTI bot should see:**
- ✅ IRM Policy title
- ✅ Complaint channels (email, website, Facebook, Shopee)
- ✅ Acknowledgment time (24-48 hours)
- ✅ Resolution time (7-15 working days)
- ✅ Required customer information
- ✅ Possible resolutions
- ✅ DTI escalation information
- ✅ All business platform URLs

---

### Method 3: Test with Bot User-Agent (Simulate DTI Bot)

**Using Browser DevTools:**

1. Open Chrome/Firefox DevTools (`F12`)
2. Go to **Network** tab
3. Click **Settings** (gear icon) or right-click on any request
4. Enable **"User-Agent"** override
5. Set custom user-agent to:
   ```
   Mozilla/5.0 (compatible; DTI-Bot/1.0; +https://dti.gov.ph/bot)
   ```
6. Reload the page
7. Check if page loads correctly (not blocked)

**Using Command Line (curl):**

```bash
# Test homepage
curl -A "Mozilla/5.0 (compatible; DTI-Bot/1.0)" https://www.newculturetrends.com

# Test IRM page
curl -A "Mozilla/5.0 (compatible; DTI-Bot/1.0)" https://www.newculturetrends.com/irm

# Save to file to inspect
curl -A "Mozilla/5.0 (compatible; DTI-Bot/1.0)" https://www.newculturetrends.com > homepage.html
```

**What to check:**
- ✅ Page loads (not 403/blocked)
- ✅ HTML contains meta tags
- ✅ HTML contains JSON-LD
- ✅ IRM page is accessible

---

### Method 4: Validate Structured Data

**Using Google Rich Results Test:**
1. Visit: https://search.google.com/test/rich-results
2. Enter URL: `https://www.newculturetrends.com`
3. Click **"Test URL"**
4. Check if structured data is detected

**What to look for:**
- ✅ Organization schema detected
- ✅ DTI-IRM property found
- ✅ IRM URL property found
- ✅ No errors

**Using Schema.org Validator:**
1. Visit: https://validator.schema.org/
2. Enter URL: `https://www.newculturetrends.com`
3. Check validation results

---

### Method 5: Check Meta Tags in Browser DevTools

**Steps:**
1. Visit: `https://www.newculturetrends.com`
2. Open DevTools (`F12`)
3. Go to **Elements** tab
4. Expand `<head>` section
5. Look for meta tags:

**Expected Meta Tags:**
```html
<meta name="dti-irm" content="yes" />
<meta name="dti-irm-url" content="https://www.newculturetrends.com/irm" />
<meta name="dti-registration-number" content="7297002" />
<meta name="dti-platform-type" content="e-commerce" />
<meta name="dti-platform-url" content="https://newculturetrends.com" />
```

---

### Method 6: Test IRM Page Accessibility

**Checklist:**
- [ ] Visit `/irm` directly - should load without login
- [ ] No password protection
- [ ] No authentication required
- [ ] All content visible immediately
- [ ] No JavaScript required to see content
- [ ] All mandatory sections present

**Mandatory Sections to Verify:**
1. ✅ IRM Policy Title
2. ✅ Complaint Channels
3. ✅ Acknowledgment Time (24-48 hours)
4. ✅ Resolution Time (7-15 working days)
5. ✅ Required Customer Information
6. ✅ Possible Resolutions
7. ✅ DTI Escalation Information
8. ✅ Data Privacy Compliance
9. ✅ Business Platform URLs (Website, Shopee, Facebook)

---

## 📋 Complete Verification Checklist

### Homepage (`https://www.newculturetrends.com`)

**Meta Tags:**
- [ ] `<meta name="dti-irm" content="yes" />` exists
- [ ] `<meta name="dti-irm-url" content="...">` exists
- [ ] `<meta name="dti-registration-number" content="7297002" />` exists

**JSON-LD Structured Data:**
- [ ] Organization schema present
- [ ] `DTI-IRM` property in `additionalProperty`
- [ ] `IRM URL` property in `additionalProperty`
- [ ] Valid JSON syntax (no errors)

**Visible Links:**
- [ ] Link to `/irm` visible in footer or navigation
- [ ] Link is clickable and works

**Accessibility:**
- [ ] Page loads without authentication
- [ ] No Cloudflare challenge page
- [ ] HTML source is readable

---

### IRM Page (`https://www.newculturetrends.com/irm`)

**Content:**
- [ ] "Internal Redress Mechanism" title visible
- [ ] All complaint channels listed
- [ ] Acknowledgment time specified (24-48 hours)
- [ ] Resolution time specified (7-15 working days)
- [ ] Required customer information section
- [ ] Possible resolutions section
- [ ] DTI escalation information
- [ ] Data Privacy compliance statement

**Business URLs:**
- [ ] Website URL listed: `https://www.newculturetrends.com`
- [ ] Shopee URL listed: `https://shopee.ph/newculturetrends`
- [ ] Facebook URL listed (if applicable)

**Structured Data:**
- [ ] Organization schema with IRM details
- [ ] ContactPoint schema with email
- [ ] Valid JSON-LD syntax

**Accessibility:**
- [ ] Publicly accessible (no password)
- [ ] No redirects
- [ ] HTTP 200 status
- [ ] Content visible in HTML source

---

## 🛠️ Tools for Testing

### 1. **Browser Extensions:**
- **Meta Tags Viewer** - View all meta tags
- **Structured Data Testing Tool** - Check JSON-LD

### 2. **Online Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Meta Tags Checker: https://metatags.io/
- W3C Validator: https://validator.w3.org/

### 3. **Command Line Tools:**
```bash
# Check if page is accessible
curl -I https://www.newculturetrends.com

# Get full HTML
curl https://www.newculturetrends.com > page.html

# Search for specific content
curl https://www.newculturetrends.com | grep "dti-irm"

# Test with bot user-agent
curl -A "DTI-Bot/1.0" https://www.newculturetrends.com
```

---

## 🚨 Common Issues to Check

### Issue 1: Meta Tags Not in HTML Source
**Problem:** Meta tags added via JavaScript only
**Solution:** Ensure static meta tags in `index.html`

### Issue 2: Cloudflare Blocking
**Problem:** Bot gets challenge page or 403
**Solution:** Lower Cloudflare security settings (see `CLOUDFLARE_DTI_COMPATIBILITY.md`)

### Issue 3: JSON-LD Syntax Errors
**Problem:** Invalid JSON breaks parsing
**Solution:** Validate JSON syntax, check for trailing commas

### Issue 4: IRM Page Not Accessible
**Problem:** Requires authentication or redirects
**Solution:** Ensure `/irm` is publicly accessible

### Issue 5: Missing Business URLs
**Problem:** Platform URLs not listed in IRM page
**Solution:** Verify all business platforms are listed

---

## ✅ Quick Test Script

**Copy and paste this in browser console (F12):**

```javascript
// Check meta tags
const metaTags = {
  'dti-irm': document.querySelector('meta[name="dti-irm"]')?.content,
  'dti-irm-url': document.querySelector('meta[name="dti-irm-url"]')?.content,
  'dti-registration-number': document.querySelector('meta[name="dti-registration-number"]')?.content
};

console.log('Meta Tags:', metaTags);

// Check JSON-LD
const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
const jsonLd = scripts.map(s => {
  try {
    return JSON.parse(s.textContent);
  } catch (e) {
    return null;
  }
}).filter(Boolean);

console.log('JSON-LD Scripts:', jsonLd);

// Check for DTI-IRM in structured data
const hasDTIIRM = jsonLd.some(data => {
  if (data.additionalProperty) {
    return data.additionalProperty.some(prop => prop.name === 'DTI-IRM');
  }
  return false;
});

console.log('Has DTI-IRM in structured data:', hasDTIIRM);

// Check IRM link
const irmLink = document.querySelector('a[href*="/irm"]');
console.log('IRM Link found:', !!irmLink);
console.log('IRM Link href:', irmLink?.href);
```

---

## 📊 Expected Results

### ✅ **If Everything is Correct:**
- Meta tags visible in HTML source
- JSON-LD structured data present
- IRM page accessible and complete
- All business URLs listed
- No blocking or authentication required

### ❌ **If Something is Wrong:**
- Missing meta tags → Add to `index.html`
- No JSON-LD → Check `DTIRegistration` component
- IRM page blocked → Check Cloudflare settings
- Missing content → Verify IRM page sections

---

## 🎯 Final Verification Steps

1. **View Page Source** → Check meta tags and JSON-LD
2. **Test IRM Page** → Verify all sections present
3. **Test with Bot User-Agent** → Ensure not blocked
4. **Validate Structured Data** → Use Google Rich Results Test
5. **Check Accessibility** → No auth, no redirects

**If all checks pass → Your site is ready for DTI bot! ✅**

---

**Last Updated:** January 2025
**Status:** Complete verification guide for DTI bot detection

