# Dating Matching Funnel — Landing Page

## Projekt
Premium-Landingpage mit Heyflow-Style Multi-Step Fragebogen für einen "Reverse Tinder" Dating-Matching-Service. Zielgruppe: Frauen 22-30, ambitioniert, sportlich, international.

## Tech Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (kein Framework — clean, schnell, self-hosted)
- **Design:** Mobile-first, Premium/Luxury Look, Dark Theme mit Akzentfarben
- **Formular:** One-question-per-screen Flow (Heyflow-Style), Smooth Transitions
- **Foto-Upload:** Client-side Preview, File Input
- **Backend:** Kein Backend nötig für V1 — Formspree.io oder Netlify Forms als Submission-Endpunkt
- **Hosting:** GitHub Pages oder lokaler Server

## Design-Vorgaben
- **Vibe:** Premium Dating Service, nicht "Tech Startup". Denke: Raya App meets Bumble Premium.
- **Farben:** Dark Background (#0a0a0a), Gold/Champagner Akzente (#c9a96e), Weiß für Text
- **Typografie:** Modern Sans-Serif (Inter oder ähnlich via Google Fonts)
- **Bilder:** Hochwertige Lifestyle-Bilder als Hintergründe (Zypern, Mittelmeer, Sunset)
- **Animationen:** Smooth slide-in Transitions zwischen Fragen, Progress Bar oben
- **Mobile First:** 90%+ der Nutzer kommen von IG Ads → Mobile muss perfekt sein

## Fragebogen-Flow (8 Screens)
1. **Welcome Screen** — Headline + CTA ("Find Your Match")
2. **"Was beschreibt dich am besten?"** — 4 Choice Cards (Abenteurerin / Kreative Seele / Powerfrau / Ruhiger Genießer)
3. **"Was machst du beruflich / wofür brennst du?"** — Freetext Input
4. **"Worüber könntest du stundenlang reden?"** — Freetext Input
5. **"Was ist dir wichtiger?"** — Visual Slider oder Choice (Spontanes Abenteuer ↔ Geplanter Abend)
6. **"Was suchst du?"** — Choice Cards (Ernsthafte Beziehung / Erstmal kennenlernen / Offen für alles)
7. **"Zeig dich!"** — Foto Upload mit Preview
8. **"Wie können wir dich erreichen?"** — WhatsApp + IG Handle + Submit

Nach Submit: Thank-You Screen mit "Wir melden uns innerhalb von 48h"

## Constraints
- Kein Framework (React, Vue etc.) — alles Vanilla JS
- Keine externen Dependencies außer Google Fonts
- Mobile-responsive (375px - 430px primary)
- Smooth 60fps Animations (CSS transitions, kein JS-Animation-Library)
- Formular-Daten: console.log + optional Formspree POST (konfigurierbar)
- Alle Texte Englisch
- DSGVO: Checkbox "I agree to the privacy policy" vor Submit
- Accessibility: Keyboard-navigierbar, ARIA Labels

## Verifikation
- Alle 8 Screens navigierbar (vor + zurück)
- Foto Upload funktioniert mit Preview
- Form Validation (Pflichtfelder markiert)
- Mobile responsive (Chrome DevTools)
- Progress Bar zeigt korrekten Fortschritt
- Thank You Screen nach Submit

## Discovered Patterns
- [US-001] Used 100dvh instead of 100vh for better mobile viewport handling
- [US-001] Progress bar uses will-change:width for GPU-accelerated transitions
- [US-001] Screen transitions use transform+opacity for 60fps performance (will-change hints added)
- [US-001] Included a placeholder screen-1 so CTA navigation can be verified immediately
- [US-002] TOTAL_STEPS=7 (screens 1-7 are questionnaire; 0=welcome, 8=thankyou)
- [US-002] Choice cards auto-advance with 300ms delay for visual feedback
- [US-002] MutationObserver restores choice card selections on back-navigation
- [US-002] requestAnimationFrame for focus management after screen transitions
- [US-002] GDPR checkbox change event gates submit button via disabled attribute
- [US-002] Choice card auto-advance needs a brief delay (300ms) so users see their selection highlighted before sliding
- [US-002] MutationObserver on class attribute changes is a clean way to restore UI state when navigating back to choice screens
- [US-002] TOTAL_STEPS changed from 8 to 7 (screens 1-7 are questionnaire, screen 8 is thank-you, screen 0 is welcome)
- [US-002] Focus management after screen transitions improves keyboard accessibility (requestAnimationFrame timing)
- [US-002] Submit button uses disabled attribute gated by GDPR checkbox change event
- [US-003] Choice card icons use inline SVGs with currentColor for CSS-driven color transitions
- [US-003] Choice cards use flex layout with choice-card__icon + choice-card__label for icon+text alignment
- [US-003] Freetext validation uses required attribute + validateCurrentScreen() before goForward()
- [US-003] Validation errors animate with opacity + max-height (display:none can't be transitioned)
- [US-003] Event delegation on formContainer for input events clears validation errors in real-time
