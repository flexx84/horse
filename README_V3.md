# Website Offline Downloader V3

**Complete Playwright-based web crawler for creating offline website copies**

## What's New in V3?

V3 is a complete rewrite using Playwright exclusively for all operations:

- ✓ **JavaScript Support**: Full page rendering with JavaScript execution
- ✓ **API Detection**: Automatic detection and documentation of REST API calls
- ✓ **Asset Organization**: Intelligent categorization (css/, js/, img/, fonts/, media/)
- ✓ **Integrated Login**: Seamless authentication within the same browser session
- ✓ **Pre-Crawl Analysis**: Website structure analysis before downloading
- ✓ **Comprehensive Reports**: README, JSON, CSV outputs with detailed statistics
- ✓ **Complete URL Rewriting**: All URLs rewritten to relative paths for offline viewing
- ✓ **Professional Architecture**: Object-oriented design with full async/await

## Quick Start

### Installation

```bash
# Install dependencies
pip install playwright beautifulsoup4

# Install Chromium browser
playwright install chromium
```

### Basic Usage

```bash
# Simple crawl
python Donwnload_Website_OfflineV3.py https://example.com

# With login
python Donwnload_Website_OfflineV3.py https://example.com \
  --login \
  --username myuser \
  --password mypass

# Visible mode for debugging
python Donwnload_Website_OfflineV3.py https://example.com --visible -d 3
```

## Documentation

This project includes comprehensive documentation:

### 📖 [QUICK_START_V3.md](QUICK_START_V3.md)
**Start here!** Quick start guide with common scenarios and troubleshooting.

**Contents:**
- Installation instructions
- Common usage scenarios
- Finding CSS selectors for login
- Understanding output structure
- Troubleshooting guide
- Tips and best practices

### 📚 [V3_DOCUMENTATION.md](V3_DOCUMENTATION.md)
**Complete technical reference** with architecture details and API documentation.

**Contents:**
- Architecture overview
- Component documentation (WebsiteAnalyzer, AssetManager, APIDetector, WebsiteCrawler)
- Data class specifications
- Method descriptions
- Output file formats
- Technical implementation details

### 📊 [V3_SUMMARY.md](V3_SUMMARY.md)
**Implementation summary** with statistics and validation status.

**Contents:**
- Feature checklist
- Code statistics
- Validation status
- Success criteria
- Known limitations
- Testing recommendations

### ⚖️ [V2_VS_V3_COMPARISON.md](V2_VS_V3_COMPARISON.md)
**Detailed comparison** between V2 and V3 implementations.

**Contents:**
- Architecture differences
- Feature matrix
- Performance comparison
- Use case suitability
- Migration guide

## Features

### Core Functionality

#### 1. Website Crawling
- Recursive depth-first traversal
- Same-domain filtering
- URL normalization and deduplication
- Configurable maximum depth
- Progress logging

#### 2. Asset Management
Automatic organization into categorized folders:
- `css/` - Stylesheets
- `js/` - JavaScript files
- `img/` - Images (jpg, png, gif, svg, webp, ico, etc.)
- `fonts/` - Font files (woff, woff2, ttf, otf, eot)
- `media/` - Audio/video files
- `documents/` - PDF, Office docs
- `assets/` - Other resources

#### 3. Login Support
- Configurable CSS selectors for form fields
- Username and password authentication
- Submit button detection
- Cookie preservation
- Post-login navigation
- Optional separate login URL

#### 4. API Detection
Automatic detection and documentation of:
- XHR and Fetch requests
- REST endpoints (GET, POST, PUT, DELETE, PATCH)
- External API domains
- Request/response headers
- Status codes

#### 5. Website Analysis
Pre-crawl analysis of:
- Navigation menu structure
- Form presence and actions
- Page types (homepage, blog, product, etc.)
- External domains
- Asset categories

#### 6. URL Rewriting
Complete rewriting for offline viewing:
- CSS links (`<link href>`)
- JavaScript sources (`<script src>`)
- Images (`<img src>`, `<img srcset>`)
- Inline styles (`style="url(...)"`)
- Internal page links (`<a href>`)
- Form actions
- Meta refresh tags

#### 7. Comprehensive Reporting
Generated output files:
- `README.md` - Human-readable summary
- `link_tree.json` - Hierarchical site structure
- `unique_links.csv` - Flat list of all pages
- `api_report.json` - API usage details
- `website_structure.json` - Initial analysis

## Command-Line Reference

```
python Donwnload_Website_OfflineV3.py [url] [options]

Required Arguments:
  url                        Website URL to crawl

Optional Arguments:
  -d, --depth DEPTH         Maximum crawl depth (default: 10)
  -o, --output OUTPUT       Output directory (default: downloaded_site)

Login Options:
  --login                   Enable login before crawling
  --login-url URL          Login page URL (if different from main URL)
  --username USERNAME      Login username
  --password PASSWORD      Login password
  --username-selector SEL  CSS selector for username input
                           (default: input[name="mb_id"])
  --password-selector SEL  CSS selector for password input
                           (default: input[name="mb_password"])
  --submit-selector SEL    CSS selector for submit button
                           (default: button:has-text("Login"))

Browser Options:
  --visible                Show browser window (default: headless)
```

## Example Usage

### Public Website
```bash
python Donwnload_Website_OfflineV3.py https://example.com -d 5 -o example_backup
```

### Protected Site with Login
```bash
python Donwnload_Website_OfflineV3.py https://members.example.com \
  --login \
  --username john.doe \
  --password secret123 \
  --username-selector "#email" \
  --password-selector "#pwd" \
  --submit-selector "button.login-btn" \
  -d 10
```

### Debug Mode
```bash
python Donwnload_Website_OfflineV3.py https://example.com \
  --visible \
  -d 2 \
  -o debug_test
```

## Output Structure

```
downloaded_site/
├── example.com/
│   ├── css/
│   │   ├── style.css
│   │   └── theme.css
│   ├── js/
│   │   ├── main.js
│   │   └── vendor.js
│   ├── img/
│   │   ├── logo.png
│   │   └── hero.jpg
│   ├── fonts/
│   │   └── roboto.woff2
│   ├── index.html
│   └── about/
│       └── index.html
├── link_tree.json
├── unique_links.csv
├── api_report.json
├── website_structure.json
└── README.md
```

## Architecture

### Core Components

1. **WebsiteAnalyzer** - Analyzes site structure before crawling
2. **AssetManager** - Downloads and organizes assets by type
3. **APIDetector** - Monitors network for API calls
4. **WebsiteCrawler** - Main orchestrator for crawling

### Data Classes

- **PageInfo** - Information about each downloaded page
- **WebsiteStructure** - Complete site structure analysis
- **APICall** - Detected API call details

## Requirements

- Python 3.7+
- Playwright
- BeautifulSoup4

## Common Use Cases

### 1. Backup Website
```bash
python Donwnload_Website_OfflineV3.py https://mysite.com -d 20 -o backups/mysite
```

### 2. Create Offline Documentation
```bash
python Donwnload_Website_OfflineV3.py https://docs.example.com -d 15
```

### 3. Archive Protected Content
```bash
python Donwnload_Website_OfflineV3.py https://internal.company.com \
  --login --username user --password pass -d 10
```

### 4. Test Crawl Before Full Download
```bash
python Donwnload_Website_OfflineV3.py https://largesite.com -d 2 --visible
```

## Troubleshooting

### Login Not Working?
1. Run with `--visible` to see the page
2. Use browser DevTools to find correct selectors
3. Check if site has CAPTCHA
4. Verify credentials are correct

### Missing Assets?
1. Check console for "Asset download failed" messages
2. Verify assets don't require authentication
3. Review `failed_assets` in logs

### Too Few/Many Pages?
- Adjust `-d` (depth) parameter
- Check if JavaScript navigation is being used
- Verify same-domain filtering is working

## Performance

Typical crawling speeds:
- **Small site** (10 pages): 1-2 minutes
- **Medium site** (100 pages): 10-20 minutes
- **Large site** (1000+ pages): 1+ hours

Factors affecting speed:
- Network connection
- Page complexity
- Number of assets
- JavaScript execution time
- Depth of crawl

## Best Practices

1. **Test First**: Start with `-d 2` to verify everything works
2. **Use Visible Mode**: Debug login issues with `--visible`
3. **Check Reports**: Review generated README.md for completeness
4. **Monitor Space**: Large sites can use gigabytes of storage
5. **Respect Limits**: Don't overload servers, respect robots.txt

## Support

Documentation files:
- **[QUICK_START_V3.md](QUICK_START_V3.md)** - Usage guide
- **[V3_DOCUMENTATION.md](V3_DOCUMENTATION.md)** - Technical reference
- **[V3_SUMMARY.md](V3_SUMMARY.md)** - Implementation details
- **[V2_VS_V3_COMPARISON.md](V2_VS_V3_COMPARISON.md)** - Version comparison

## License

Development tool - use responsibly and respect website terms of service.

## Version History

- **V3**: Complete Playwright rewrite (current)
- **V2**: Requests + Playwright login
- **V1**: Basic implementation

## Credits

Built with:
- [Playwright](https://playwright.dev/) - Browser automation
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) - HTML parsing

---

**Ready to download?** See [QUICK_START_V3.md](QUICK_START_V3.md) for detailed instructions!
