# Cloudflare & DTI Detection Compatibility Guide

## ⚠️ Potential Cloudflare Issues

Cloudflare **CAN** hinder DTI detection if not configured properly. Here are the main concerns:

### 1. **Bot Protection / Challenge Pages**
- **Problem:** Cloudflare's "I'm Under Attack" mode or high security settings can show JavaScript challenges that DTI's crawler cannot solve
- **Impact:** DTI bot gets blocked and cannot access your site
- **Solution:** Whitelist DTI's crawler or lower security settings

### 2. **Caching Issues**
- **Problem:** Cloudflare caches your HTML, serving stale content without updated meta tags
- **Impact:** DTI sees old version without IRM detection elements
- **Solution:** Configure cache rules for HTML files

### 3. **JavaScript Challenges**
- **Problem:** Cloudflare's "Browser Integrity Check" requires JavaScript execution
- **Impact:** Some crawlers can't execute JavaScript, missing dynamic meta tags
- **Solution:** Disable for legitimate bots or ensure static meta tags are in HTML

### 4. **Rocket Loader / Auto Minify**
- **Problem:** Cloudflare optimizations might modify HTML structure
- **Impact:** Meta tags or JSON-LD might be altered
- **Solution:** Disable for HTML files or test thoroughly

### 5. **Page Rules**
- **Problem:** Page rules might redirect or modify responses
- **Impact:** DTI bot might not reach the correct page
- **Solution:** Review page rules for `/irm` and homepage

---

## ✅ Recommended Cloudflare Settings

### **1. Security Level**
**Recommended:** Medium or Low (for DTI detection period)

**Steps:**
1. Go to Cloudflare Dashboard → Security → Settings
2. Set Security Level to **"Medium"** or **"Low"**
3. **Avoid:** "High" or "I'm Under Attack" mode

**Why:** Lower security reduces chance of blocking legitimate bots

---

### **2. Bot Fight Mode**
**Recommended:** OFF (or configure exceptions)

**Steps:**
1. Go to Security → Bots
2. Set "Bot Fight Mode" to **OFF**
3. OR add DTI's user agents to allowlist

**Why:** Bot Fight Mode can block DTI's crawler

---

### **3. Browser Integrity Check**
**Recommended:** OFF (or set to "Low")

**Steps:**
1. Go to Security → Settings
2. Set "Browser Integrity Check" to **OFF** or **"Low"**
3. Save changes

**Why:** JavaScript challenges can block non-browser crawlers

---

### **4. Caching Rules for HTML**

**Recommended:** Cache HTML with short TTL or bypass cache

**Steps:**
1. Go to Caching → Configuration
2. Create a **Page Rule**:
   - **URL Pattern:** `*newculturetrends.com/*`
   - **Settings:**
     - Cache Level: **Standard**
     - Edge Cache TTL: **2 hours** (or "Respect Existing Headers")
     - Browser Cache TTL: **Respect Existing Headers**

**OR** Create specific rules:
- **URL Pattern:** `*newculturetrends.com/irm`
  - Cache Level: **Bypass** (always fresh)
- **URL Pattern:** `*newculturetrends.com/`
  - Cache Level: **Standard**
  - Edge Cache TTL: **2 hours**

**Why:** Ensures DTI sees latest HTML with meta tags

---

### **5. Auto Minify Settings**

**Recommended:** Disable HTML minification (or test thoroughly)

**Steps:**
1. Go to Speed → Optimization
2. Under "Auto Minify":
   - **HTML:** OFF (or test that meta tags aren't affected)
   - **JavaScript:** ON (OK)
   - **CSS:** ON (OK)

**Why:** HTML minification might alter meta tag structure

---

### **6. Rocket Loader**

**Recommended:** OFF

**Steps:**
1. Go to Speed → Optimization
2. Set "Rocket Loader" to **OFF**

**Why:** Can interfere with JavaScript that adds meta tags

---

### **7. Always Online**

**Recommended:** ON (optional, but helpful)

**Steps:**
1. Go to Caching → Configuration
2. Enable "Always Online"

**Why:** Ensures site is accessible even if origin is down

---

## 🔍 How to Verify Cloudflare Isn't Blocking

### **Test 1: Direct Access**
1. Visit: `https://www.newculturetrends.com`
2. View page source (Ctrl+U)
3. Search for: `dti-irm`
4. Should see: `<meta name="dti-irm" content="yes" />`

### **Test 2: Bot User-Agent Test**
Use curl with a bot user-agent:
```bash
curl -A "Mozilla/5.0 (compatible; DTI-Bot/1.0)" https://www.newculturetrends.com
```

Check if you get:
- ✅ HTML content with meta tags → Good
- ❌ Challenge page or 403 → Cloudflare is blocking

### **Test 3: Check Cloudflare Logs**
1. Go to Cloudflare Dashboard → Analytics → Security Events
2. Look for blocked requests from bot user-agents
3. If you see blocks, adjust security settings

---

## 🛡️ Whitelist DTI's Crawler (Advanced)

If you want to keep high security but allow DTI:

### **Option 1: Firewall Rules**
1. Go to Security → WAF → Tools
2. Create a Firewall Rule:
   - **Field:** User Agent
   - **Operator:** Contains
   - **Value:** `DTI` or `dti.gov.ph`
   - **Action:** Allow

### **Option 2: IP Access Rules**
If you know DTI's IP ranges:
1. Go to Security → WAF
2. Add IP Access Rule:
   - **IP:** DTI's IP range
   - **Action:** Allow

---

## 📋 Quick Checklist

Before DTI crawls your site, verify:

- [ ] Security Level is **Medium** or **Low** (not High)
- [ ] Bot Fight Mode is **OFF** (or DTI whitelisted)
- [ ] Browser Integrity Check is **OFF** or **Low**
- [ ] HTML caching is configured (short TTL or bypass for `/irm`)
- [ ] Auto Minify HTML is **OFF** (or tested)
- [ ] Rocket Loader is **OFF**
- [ ] Page Rules don't interfere with `/irm` or homepage
- [ ] Test with bot user-agent shows HTML (not challenge page)
- [ ] View page source shows all meta tags
- [ ] JSON-LD structured data is present in HTML

---

## 🚨 If DTI Still Can't Detect

### **Troubleshooting Steps:**

1. **Check Cloudflare Analytics:**
   - Go to Analytics → Security Events
   - Look for blocked requests around DTI crawl time
   - Check if DTI's IP/user-agent was blocked

2. **Temporarily Lower Security:**
   - Set Security Level to **Low**
   - Disable Bot Fight Mode
   - Wait 24-48 hours for DTI to retry

3. **Bypass Cloudflare (Temporary):**
   - In Cloudflare DNS, set proxy to **DNS Only** (gray cloud)
   - This bypasses Cloudflare entirely
   - Wait for DTI detection, then re-enable proxy

4. **Contact Cloudflare Support:**
   - Ask about whitelisting DTI's crawler
   - Request IP ranges for `dti.gov.ph`

---

## ✅ Best Practice Configuration

**For DTI Detection Period:**

```
Security Level: Medium
Bot Fight Mode: OFF
Browser Integrity Check: OFF
Auto Minify HTML: OFF
Rocket Loader: OFF
Cache HTML: 2 hours TTL (or bypass for /irm)
```

**After DTI Detection (Optional):**

You can increase security settings, but ensure:
- DTI's crawler is whitelisted
- `/irm` page cache is bypassed or short TTL
- HTML meta tags remain accessible

---

## 🔗 Cloudflare Dashboard Links

- **Security Settings:** https://dash.cloudflare.com → Your Domain → Security → Settings
- **Bot Management:** https://dash.cloudflare.com → Your Domain → Security → Bots
- **Caching:** https://dash.cloudflare.com → Your Domain → Caching → Configuration
- **Page Rules:** https://dash.cloudflare.com → Your Domain → Rules → Page Rules
- **Analytics:** https://dash.cloudflare.com → Your Domain → Analytics → Security Events

---

## 📞 Need Help?

If DTI still can't detect after adjusting Cloudflare:

1. **Temporarily disable Cloudflare proxy:**
   - DNS → Edit record → Toggle proxy to gray (DNS only)
   - Wait for DTI detection
   - Re-enable proxy after

2. **Contact DTI:**
   - Ask if they have specific IP ranges to whitelist
   - Request user-agent string for their crawler

3. **Test with different tools:**
   - Use Google Search Console to verify meta tags
   - Use Schema.org validator
   - Check with different bot user-agents

---

**Last Updated:** January 2025
**Status:** Cloudflare compatibility guide for DTI detection

