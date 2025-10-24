# Quick Start Guide - Website Downloader V3

## Installation

```bash
# Install dependencies
pip install playwright beautifulsoup4

# Install browser
playwright install chromium
```

## Basic Usage

### 1. Simple Download (No Login)
```bash
python Donwnload_Website_OfflineV3.py https://example.com
```

### 2. With Login
```bash
python Donwnload_Website_OfflineV3.py https://example.com \
  --login \
  --username your_username \
  --password your_password
```

### 3. Visible Browser Mode (for debugging)
```bash
python Donwnload_Website_OfflineV3.py https://example.com \
  --visible \
  -d 3
```

## Common Scenarios

### Scenario 1: Download Public Website
```bash
# Basic crawl with depth limit
python Donwnload_Website_OfflineV3.py https://example.com -d 5
```

**Output:**
- `downloaded_site/example.com/` - Website files
- `downloaded_site/README.md` - Summary report
- `downloaded_site/link_tree.json` - Site structure
- `downloaded_site/api_report.json` - API calls detected

### Scenario 2: Download Protected Site (Korean Site Example)
```bash
python Donwnload_Website_OfflineV3.py https://xn--o39a0n963awza76tu9hduc.com \
  --login \
  --username wsh123 \
  --password 1234 \
  --username-selector "input[name='mb_id']" \
  --password-selector "input[name='mb_password']" \
  --submit-selector "button:has-text('로그인')" \
  --visible \
  -d 10
```

### Scenario 3: Custom Login Form
```bash
# Generic login form
python Donwnload_Website_OfflineV3.py https://mysite.com \
  --login \
  --login-url https://mysite.com/login \
  --username myuser \
  --password mypass \
  --username-selector "#username" \
  --password-selector "#password" \
  --submit-selector "button[type='submit']" \
  -d 5
```

### Scenario 4: Limited Depth Crawl
```bash
# Only crawl 2 levels deep
python Donwnload_Website_OfflineV3.py https://largesite.com -d 2 -o backup_site
```

## Finding CSS Selectors

### Method 1: Use Visible Mode
```bash
# Run with --visible to see the page
python Donwnload_Website_OfflineV3.py https://example.com --login --visible --username test --password test
```

Then manually inspect the page to find selectors.

### Method 2: Browser DevTools
1. Open the login page in browser
2. Right-click username field → Inspect
3. Look for `name`, `id`, or `class` attributes
4. Create selector:
   - By name: `input[name="username"]`
   - By id: `#username` or `input#username`
   - By class: `.username-field`

### Method 3: Common Patterns

**Username Field:**
```
input[name="username"]
input[name="user"]
input[name="email"]
input[name="login"]
input[name="mb_id"]
#username
#user
```

**Password Field:**
```
input[name="password"]
input[name="pass"]
input[name="pwd"]
input[name="mb_password"]
#password
#pass
```

**Submit Button:**
```
button[type="submit"]
input[type="submit"]
button:has-text("Login")
button:has-text("Sign In")
.login-button
#login-btn
```

## Understanding Output

### Directory Structure
```
downloaded_site/
├── example.com/          # Website domain
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── img/             # Images
│   ├── fonts/           # Font files
│   ├── index.html       # Homepage
│   └── about/
│       └── index.html   # Other pages
├── link_tree.json       # Hierarchical structure
├── unique_links.csv     # All pages (flat list)
├── api_report.json      # Detected API calls
├── website_structure.json  # Initial analysis
└── README.md            # Human-readable summary
```

### Viewing Downloaded Site
```bash
# Open in browser
cd downloaded_site/example.com
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

## Troubleshooting

### Problem: Login Fails
**Solution:**
```bash
# 1. Run with --visible to see what's happening
python Donwnload_Website_OfflineV3.py https://example.com \
  --login --visible --username test --password test

# 2. Check the console output for error messages
# 3. Verify selectors are correct
# 4. Check if CAPTCHA is required
```

### Problem: Missing Assets (CSS/JS/Images)
**Check:**
1. Review logs for "Asset download failed" messages
2. Check `failed_assets` in output
3. Verify assets are publicly accessible
4. Some assets may require authentication

**Solution:**
```bash
# Ensure login is working if assets are protected
python Donwnload_Website_OfflineV3.py https://example.com \
  --login --username user --password pass
```

### Problem: Too Many/Few Pages Downloaded
**Adjust depth:**
```bash
# More pages (increase depth)
python Donwnload_Website_OfflineV3.py https://example.com -d 15

# Fewer pages (decrease depth)
python Donwnload_Website_OfflineV3.py https://example.com -d 3
```

### Problem: Script Hangs
**Possible causes:**
1. Page taking long to load
2. Infinite redirect loop
3. Very large page

**Solution:**
```bash
# Ctrl+C to interrupt
# Check logs for last URL visited
# Exclude that URL manually if needed
```

### Problem: Encoding Errors
**Windows-specific:**
```bash
# Set UTF-8 encoding
set PYTHONIOENCODING=utf-8
python Donwnload_Website_OfflineV3.py https://example.com
```

## Tips & Best Practices

### 1. Test with Low Depth First
```bash
# Test crawl (depth 2)
python Donwnload_Website_OfflineV3.py https://example.com -d 2 -o test_crawl

# Review output
cd test_crawl
cat README.md

# Full crawl if satisfied
python Donwnload_Website_OfflineV3.py https://example.com -d 10 -o full_backup
```

### 2. Use Visible Mode for Debugging
```bash
# See what's happening
python Donwnload_Website_OfflineV3.py https://example.com --visible -d 2
```

### 3. Check Generated Reports
```bash
# After crawling
cd downloaded_site

# Read summary
cat README.md

# Check API usage
cat api_report.json

# View all pages
cat unique_links.csv
```

### 4. Monitor Disk Space
```bash
# Check size before crawling
du -sh downloaded_site/

# Large sites can use gigabytes of space
```

### 5. Respect Rate Limits
- The script adds 1 second delay between pages
- For heavy crawling, consider adding longer delays
- Respect robots.txt
- Don't overload servers

## Advanced Usage

### Custom Output Directory
```bash
python Donwnload_Website_OfflineV3.py https://example.com \
  -o backups/example_$(date +%Y%m%d)
```

### Different Login Page
```bash
python Donwnload_Website_OfflineV3.py https://example.com \
  --login \
  --login-url https://example.com/auth/login \
  --username user \
  --password pass
```

### Complex Selectors
```bash
# Using compound selectors
python Donwnload_Website_OfflineV3.py https://example.com \
  --login \
  --username-selector "div.login-form input[type='text']" \
  --password-selector "div.login-form input[type='password']" \
  --submit-selector "div.login-form button.submit-btn"
```

## Verification Checklist

After downloading:
- [ ] Check `README.md` for summary statistics
- [ ] Verify page count in `unique_links.csv`
- [ ] Review API calls in `api_report.json`
- [ ] Test navigation in browser (open `index.html`)
- [ ] Check for broken links or missing images
- [ ] Verify login-protected content was downloaded
- [ ] Review `website_structure.json` for site overview

## Next Steps

1. **Review Documentation**: See `V3_DOCUMENTATION.md` for detailed architecture
2. **Check Logs**: Review console output for warnings/errors
3. **Validate Output**: Open downloaded site in browser
4. **Report Issues**: Note any missing pages or assets
5. **Iterate**: Adjust depth/selectors and re-run if needed

## Support

For issues:
1. Check logs for error messages
2. Review selector configuration
3. Test with `--visible` mode
4. Verify credentials are correct
5. Check network connectivity

## Example Complete Workflow

```bash
# 1. Install dependencies
pip install playwright beautifulsoup4
playwright install chromium

# 2. Test crawl (low depth)
python Donwnload_Website_OfflineV3.py https://example.com -d 2 --visible

# 3. Review output
cd downloaded_site
cat README.md

# 4. Full crawl
cd ..
python Donwnload_Website_OfflineV3.py https://example.com -d 10 -o final_backup

# 5. Verify
cd final_backup/example.com
start index.html
```

## Performance Notes

- **Headless mode**: Faster (default)
- **Visible mode**: Slower but good for debugging
- **Depth**: Higher depth = more pages = longer time
- **Assets**: Many assets = longer download time
- **Network**: Speed depends on your connection

Typical speeds:
- Small site (10 pages): 1-2 minutes
- Medium site (100 pages): 10-20 minutes
- Large site (1000+ pages): 1+ hours

Happy crawling!
