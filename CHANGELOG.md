# Changelog

## [2026-03-10] US-005 — Photo upload screen
- Enhanced upload area with premium drag-drop zone, camera icon, file type/size hints, and animated drag-over state
- Added 5MB file size validation with animated error message, and drag-and-drop support alongside click-to-upload
- Photo preview with gold-bordered image, remove button with X icon, and preview restore on back-navigation

## [2026-03-10] US-004 — Slider + intent screens
- Enhanced lifestyle screen (screen 4) with side-by-side visual choice cards — globe icon for adventure, calendar icon for planned — with hint text and responsive sizing
- Added inline SVG icons to relationship intent cards (screen 5): heart for serious, coffee cup for casual, star for open
- Added CSS for visual choice variant (flex-row layout, centered text, larger icons) with small-phone responsive overrides

## [2026-03-10] US-003 — Choice cards + freetext screens
- Added inline SVG icons to personality choice cards (adventurer, creative soul, powerwoman, relaxed enjoyer) with color transitions on hover/selection
- Enhanced choice card styling with flex icon+label layout, box-shadow hover effect, and double-border selection state
- Added freetext validation for profession and talk-about screens with animated error messages and real-time error clearing

## [2026-03-10] US-002 — Multi-step form engine + transitions
- Added all 8 questionnaire screens (personality, profession, talk-about, lifestyle, intent, photo upload, contact/submit) + thank-you screen
- Implemented JS form engine with forward/back navigation, smooth CSS slide transitions, keyboard Enter support, and state management
- Added back button on all question screens, choice card auto-advance, photo upload with preview, GDPR checkbox, and submit flow

## [2026-03-10] US-001 — Project scaffold + Welcome Screen
- Created index.html, styles.css, app.js with dark premium theme (bg #0a0a0a, gold #c9a96e, white text)
- Welcome screen with "Exclusive Matching" badge, headline, subtext, and "Get Started" CTA
- Fixed progress bar at top (0% on welcome), mobile-first responsive design (375px-768px+)
