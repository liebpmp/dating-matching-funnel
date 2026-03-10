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

| Screen | Type | Content |
|--------|------|---------|
| 0 | Welcome | Headline + CTA |
| 1 | Choice cards | Personality type (4 options, auto-advance) |
| 2 | Freetext | Profession / passion |
| 3 | Freetext | What you talk about |
| 4 | Choice cards | Spontaneous vs Planned (2 options) |
| 5 | Choice cards | Relationship intent (3 options) |
| 6 | Photo upload | Drag-drop + click upload, 5MB limit, preview |
| 7 | Contact | WhatsApp + IG + GDPR + submit |
| 8 | Thank you | Confirmation message |

**Navigation:** Forward via CTA/choice/continue buttons or Enter key. Back button on all question screens (1-7). Progress bar shows 0-100% across screens 1-7.

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (no frameworks)
- Google Fonts (Inter) — only external dependency
- Mobile-first, 60fps CSS transitions
