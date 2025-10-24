# Website Offline Downloader V3 - Documentation

## Overview

`Donwnload_Website_OfflineV3.py` is a complete rewrite using Playwright for all web operations. It provides comprehensive website crawling with full JavaScript rendering support, asset management, API detection, and detailed reporting.

## Architecture

### Core Components

#### 1. **WebsiteAnalyzer**
Analyzes website structure before crawling begins.

**Methods:**
- `analyze(url)`: Main analysis entry point
- `_extract_navigation()`: Extract navigation menu items from header/nav elements
- `_count_forms()`: Count forms on the page
- `_detect_page_type()`: Identify page type (login, homepage, blog, etc.)

**Output:** `WebsiteStructure` dataclass with navigation, forms, and page type information.

#### 2. **AssetManager**
Manages downloading and organization of all website assets.

**Asset Categories:**
- `css/`: Stylesheets (.css)
- `js/`: JavaScript files (.js, .jsx, .ts, .tsx, .mjs)
- `img/`: Images (.jpg, .png, .gif, .svg, .webp, .ico, etc.)
- `fonts/`: Font files (.woff, .woff2, .ttf, .otf, .eot)
- `media/`: Audio/video (.mp4, .webm, .mp3, .wav, etc.)
- `documents/`: Documents (.pdf, .doc, .xls, etc.)
- `assets/`: Other resources

**Methods:**
- `classify_asset(url, content_type)`: Determine asset category by extension/MIME type
- `get_asset_local_path(url, base_url, category)`: Generate local path for asset
- `download_asset(page, url, base_url)`: Download using Playwright's request API

**Features:**
- Automatic classification by extension and MIME type
- Deduplication (tracks downloaded assets)
- Organized directory structure
- Failed asset tracking

#### 3. **APIDetector**
Monitors network requests to detect and document API calls.

**Detection Criteria:**
- Resource types: XHR, Fetch, WebSocket
- URL patterns: `/api/`, `/v1/`, `/rest/`, `/graphql`, `/ajax/`, `.json`

**Methods:**
- `is_api_call(url, resource_type)`: Determine if request is an API call
- `track_request(request, response)`: Record network request details
- `generate_api_report()`: Create comprehensive API usage report

**Tracked Information:**
- Request URL and method (GET, POST, PUT, DELETE, PATCH)
- Status codes
- Request/response headers
- External domains
- REST endpoints

#### 4. **WebsiteCrawler**
Main crawler orchestrating the entire download process.

**Initialization:**
- `initialize_browser()`: Launch Playwright browser with custom settings
- Network monitoring setup for API detection
- Custom user agent and viewport configuration

**Key Methods:**

##### `login()` - Authentication
- Navigate to login page
- Fill username and password fields using CSS selectors
- Click submit button
- Wait for navigation and verify cookies
- Returns: boolean success status

##### `analyze_website()` - Pre-crawl Analysis
- Analyzes main page structure
- Saves `website_structure.json`
- Provides insights before crawling begins

##### `crawl_recursive(url, depth, parent_node)` - Recursive Crawling
- Depth-first traversal of website
- URL normalization and deduplication
- Same-domain filtering
- Creates hierarchical link tree structure

##### `extract_links()` - Link Extraction
Extracts links from:
- `<a href>` tags
- `<form action>` attributes
- `<meta http-equiv="refresh">` tags
- Returns set of absolute URLs

##### `process_html(html, page_url, page_path)` - URL Rewriting
Processes HTML and rewrites all URLs to relative paths:
- CSS links (`<link href>`)
- JavaScript (`<script src>`)
- Images (`<img src>`, `<img srcset>`)
- Inline styles with `url()`
- Internal page links (`<a href>`)

**Relative Path Calculation:**
- Uses `os.path.relpath()` for accurate relative paths
- Converts Windows backslashes to forward slashes
- Handles complex nested directory structures

##### `save_page(url, depth)` - Page Saving
- Get rendered HTML with `page.content()`
- Process and rewrite all URLs
- Save to local directory structure
- Extract page metadata (title, forms, links)
- Return `PageInfo` object

##### `generate_reports()` - Report Generation
Creates comprehensive documentation:
1. `link_tree.json`: Hierarchical site structure
2. `unique_links.csv`: All pages with metadata
3. `api_report.json`: Detailed API usage
4. `README.md`: Human-readable summary

### Data Classes

#### PageInfo
```python
@dataclass
class PageInfo:
    url: str                    # Original URL
    title: str                  # Page title
    depth: int                  # Crawl depth
    local_path: str            # Local file path
    links: List[str]           # Links found on page
    has_form: bool             # Whether page has forms
    form_actions: List[str]    # Form action URLs
    page_type: str             # Page category
```

#### WebsiteStructure
```python
@dataclass
class WebsiteStructure:
    base_url: str
    navigation_items: List[Dict[str, str]]
    page_types: Dict[str, int]
    total_forms: int
    external_domains: Set[str]
    asset_categories: Dict[str, int]
```

#### APICall
```python
@dataclass
class APICall:
    url: str
    method: str
    status_code: int
    resource_type: str
    timestamp: float
    request_headers: Dict[str, str]
    response_headers: Dict[str, str]
```

## Usage

### Basic Crawl
```bash
python Donwnload_Website_OfflineV3.py https://example.com
```

### With Login
```bash
python Donwnload_Website_OfflineV3.py https://example.com \
  --login \
  --username myuser \
  --password mypass \
  --username-selector "input[name='username']" \
  --password-selector "input[name='password']" \
  --submit-selector "button[type='submit']"
```

### Advanced Options
```bash
# Visible browser mode with custom depth and output directory
python Donwnload_Website_OfflineV3.py https://example.com \
  --visible \
  -d 5 \
  -o my_website_backup
```

### Command-Line Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `url` | Required | - | Website URL to crawl |
| `-d, --depth` | Optional | 10 | Maximum crawl depth |
| `-o, --output` | Optional | `downloaded_site` | Output directory |
| `--login` | Flag | False | Enable login before crawling |
| `--login-url` | Optional | Same as `url` | Login page URL |
| `--username` | Optional | - | Login username |
| `--password` | Optional | - | Login password |
| `--username-selector` | Optional | `input[name="mb_id"]` | CSS selector for username field |
| `--password-selector` | Optional | `input[name="mb_password"]` | CSS selector for password field |
| `--submit-selector` | Optional | `button:has-text("Login")` | CSS selector for submit button |
| `--visible` | Flag | False | Show browser window (default: headless) |

## Output Structure

```
downloaded_site/
├── example.com/
│   ├── css/
│   │   ├── style.css
│   │   └── theme.css
│   ├── js/
│   │   ├── main.js
│   │   └── jquery.min.js
│   ├── img/
│   │   ├── logo.png
│   │   └── banner.jpg
│   ├── fonts/
│   │   └── roboto.woff2
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   └── contact/
│       └── index.html
├── link_tree.json
├── unique_links.csv
├── api_report.json
├── website_structure.json
└── README.md
```

### Generated Files

#### link_tree.json
Hierarchical structure of crawled pages:
```json
{
  "url": "https://example.com",
  "title": "Home Page",
  "depth": 0,
  "has_form": false,
  "children": [
    {
      "url": "https://example.com/about",
      "title": "About Us",
      "depth": 1,
      "has_form": false,
      "children": []
    }
  ]
}
```

#### unique_links.csv
Flat list of all pages:
```csv
URL,Title,Depth,Has Form,Local Path
https://example.com,Home,0,No,/path/to/index.html
https://example.com/about,About,1,No,/path/to/about/index.html
```

#### api_report.json
Detailed API usage analysis:
```json
{
  "total_api_calls": 15,
  "external_domains": ["api.example.com", "cdn.example.com"],
  "rest_endpoints": {
    "api.example.com": [
      "GET /v1/users",
      "POST /v1/login"
    ]
  },
  "api_calls_by_domain": {
    "api.example.com": [
      {
        "url": "https://api.example.com/v1/users",
        "method": "GET",
        "status": 200,
        "resource_type": "fetch"
      }
    ]
  },
  "api_calls_by_method": {
    "GET": 12,
    "POST": 3
  }
}
```

#### website_structure.json
Initial site analysis:
```json
{
  "base_url": "https://example.com",
  "navigation_items": [
    {"text": "Home", "href": "/"},
    {"text": "About", "href": "/about"}
  ],
  "page_types": {
    "homepage": 1
  },
  "total_forms": 2,
  "external_domains": []
}
```

#### README.md
Human-readable summary with:
- Overview statistics
- Asset counts by category
- API usage summary
- External domains
- Directory structure
- Navigation instructions

## Key Features

### 1. **Playwright-Only Implementation**
- All HTTP requests use Playwright's API
- Full JavaScript rendering support
- Network monitoring for API detection
- No external HTTP libraries (requests, urllib, etc.)

### 2. **Intelligent Asset Classification**
- Extension-based detection
- MIME type fallback
- Organized directory structure
- Automatic categorization

### 3. **Complete URL Rewriting**
- Relative path calculation
- Asset URL rewriting
- Internal link rewriting
- Inline style URL rewriting
- Srcset attribute handling

### 4. **API Detection & Documentation**
- Automatic API call detection
- REST endpoint cataloging
- External domain tracking
- Detailed request/response logging

### 5. **Login Support**
- Flexible CSS selector configuration
- Cookie preservation
- Post-login navigation
- Authenticated crawling

### 6. **Comprehensive Reporting**
- Hierarchical link tree
- Flat CSV listing
- API usage report
- Website structure analysis
- Human-readable README

## Technical Details

### URL Normalization
```python
def normalize_url(url: str) -> str:
    # Remove fragments (#section)
    # Remove trailing slashes
    # Ensure consistent format for deduplication
```

### Path Conversion
```python
def url_to_local_path(url: str) -> Path:
    # Convert URL to filesystem path
    # Add index.html for directories
    # Handle query parameters
```

### Asset Download
```python
async def download_asset(page, url, base_url) -> Optional[Path]:
    # Use Playwright's request API
    response = await page.request.get(url)
    # Classify by content-type header
    # Save to organized directory
```

### HTML Processing
```python
async def process_html(html, page_url, page_path) -> str:
    # Parse with BeautifulSoup
    # Download all assets
    # Calculate relative paths
    # Rewrite all URLs
    # Return modified HTML
```

## Comparison with V2

| Feature | V2 (requests) | V3 (Playwright) |
|---------|--------------|-----------------|
| HTTP Library | requests | Playwright API |
| JavaScript Support | No | Yes (full rendering) |
| Asset Download | requests.get() | page.request.get() |
| API Detection | Manual parsing | Network monitoring |
| Login | Separate Playwright script | Integrated |
| Asset Organization | Basic | Categorized by type |
| URL Rewriting | Partial | Complete |
| Reporting | Basic JSON/CSV | Comprehensive + README |
| Network Monitoring | None | Full request/response tracking |

## Dependencies

```bash
pip install playwright beautifulsoup4
playwright install chromium
```

## Error Handling

- Failed assets are tracked but don't stop crawling
- Network timeouts are logged and skipped
- Invalid URLs are caught and reported
- Graceful cleanup on interruption (Ctrl+C)

## Performance Considerations

- Assets are deduplicated (only downloaded once)
- Pages are visited exactly once (URL normalization)
- Parallel asset downloads within page processing
- Efficient relative path calculation

## Best Practices

1. **Start with low depth** for testing: `-d 2`
2. **Use visible mode** for debugging: `--visible`
3. **Check selectors** before login crawl
4. **Monitor output directory** size
5. **Review README.md** for API dependencies

## Troubleshooting

### Login Fails
- Check CSS selectors with `--visible`
- Verify credentials are correct
- Check if site has CAPTCHA
- Try different `--submit-selector`

### Missing Assets
- Check `failed_assets` in logs
- Verify asset URLs are accessible
- Check for authentication requirements
- Review network errors in console

### Incomplete Crawl
- Increase `--depth` value
- Check for JavaScript navigation
- Verify same-domain filtering
- Review excluded URL patterns

## Future Enhancements

Potential improvements:
- Parallel page crawling (multiple browser contexts)
- Custom URL filtering rules
- Configurable asset download patterns
- Screenshot capture for each page
- Sitemap.xml generation
- Duplicate content detection
- Broken link detection
- Accessibility analysis integration

## License

This is a development tool. Use responsibly and respect robots.txt and website terms of service.
