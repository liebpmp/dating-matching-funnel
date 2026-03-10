# Dating Matching Funnel

Premium Heyflow-style landing page with multi-step questionnaire for a reverse-Tinder dating matching service.

## Setup

No build step required. Open `index.html` in a browser or serve with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Architecture

```
index.html   — Single page with all screen sections
styles.css   — Dark premium theme, CSS custom properties, mobile-first responsive
app.js       — Screen navigation, progress bar, form state management (IIFE, vanilla JS)
```

### Design Tokens (CSS Variables)

- **Background:** `#0a0a0a` | **Gold accent:** `#c9a96e` | **Text:** `#e8e8e8`
- **Font:** Inter (Google Fonts)
- **Mobile-first** with breakpoints at 374px, 430px, 768px

### Screen System

Each questionnaire step is a `<section class="screen">` element. Navigation is handled by `goToScreen(index)` in app.js, which manages CSS transform transitions and progress bar updates.

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (no frameworks)
- Google Fonts (Inter) — only external dependency
- Mobile-first, 60fps CSS transitions
