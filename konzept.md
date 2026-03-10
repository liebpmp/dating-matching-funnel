# Dating Matching Funnel — "Reverse Tinder"

## Idee (Tom, 10.03.2026)
Statt Tom auf Dating-Apps swipen lassen → Frauen bewerben sich über einen Premium-Matching-Funnel.
Meta Ads → Fragebogen (Heyflow-Style) → AI-Analyse + Tom Review → Profil-Vorschlag → Match oder kein Match.

## Konzept

### Positioning
- **NICHT:** "Finde diesen Typen"
- **SONDERN:** "Premium Matching Service für ambitionierte Singles auf Zypern"
- Fühlt sich an wie ein exklusiver Service, nicht wie ein Ego-Projekt
- Tom ist "einer der Matches" — nicht der offensichtliche Protagonist

### Ad-Targeting
- Frauen, 22-30, Zypern + DE/AT/CH + International
- Interessen: Fitness, Travel, Entrepreneurship, Personal Development
- Persönlichkeits-Targeting in der Ansprache: "Du bist ambitioniert, sportlich, liebst Abenteuer aber auch deep Conversations?"
- Spricht direkt Tom's Archetypen an (Löwin + Fische-Typ, siehe `dating/erkenntnisse.md`)

### Funnel-Architektur
```
Meta Ad (IG/FB)
  → Landingpage (Premium-Look, Matching-Service Branding)
    → Heyflow-Style Fragebogen (5-8 Fragen + Foto-Upload)
      → AI-Analyse (Foto + Antworten → Fit Score)
        → Tom Review (Dashboard: Foto + Antworten + Score)
          → Fit: Ihr wird Tom's Profil vorgeschlagen (Swipe Ja/Nein)
            → Match: Kontaktaufnahme (WhatsApp/IG)
          → Kein Fit: Freundliche Absage ("Aktuell kein Match")
```

### Fragebogen (Heyflow-Style, eine Frage pro Screen)
1. **"Was beschreibt dich am besten?"** — Multiple Choice (Abenteurerin / Kreative Seele / Powerfrau / Ruhiger Genießer) → Personality-Filter
2. **"Was machst du beruflich / wofür brennst du?"** — Freetext → Ambition-Filter
3. **"Worüber könntest du stundenlang reden?"** — Freetext → Compatibility
4. **"Was ist dir wichtiger: ein spontanes Abenteuer oder ein geplanter Abend?"** — Slider oder Choice → Lifestyle-Fit
5. **"Gym?"** — Ja / Nein / Manchmal → Lifestyle
6. **"Was suchst du?"** — Ernsthafte Beziehung / Erstmal kennenlernen / Offen für alles → Intent
7. **"Zeig dich! Lade ein Foto hoch"** — File Upload → Attractiveness + AI-Analyse
8. **"Wie können wir dich erreichen?"** — WhatsApp + IG Handle (optional)

### Filter-Logik (Disqualifizierung)
- Frage 1: Wenn Antwort nicht zu Tom's Typ passt → Soft-Reject (trotzdem speichern)
- Frage 6: "Nur Freundschaft" → Raus
- Kein Foto → Raus (Foto ist Pflicht)
- Alles andere → Tom entscheidet

### Match-Vorschlag (an die Frau)
- Sie bekommt ein "Profil" vorgeschlagen: Foto von Tom + kurzer Text
- Kein Name nötig am Anfang — Mystik
- Sie kann Ja oder Nein swipen
- Ja → Match-Nachricht mit Kontakt
- Nein → Respektvolles Ende

### Tech-Stack
- **Landingpage:** Custom HTML/CSS/JS (Heyflow-Style, self-hosted)
- **Backend:** Formular-Daten → Notion oder Airtable
- **AI-Analyse:** Optional (Foto-Analyse, Text-Scoring)
- **Hosting:** GitHub Pages oder eigener Server
- **Ads:** Meta Business Manager

### DSGVO
- Einwilligung im Formular nötig (Foto + personenbezogene Daten)
- Datenschutz-Hinweis auf Landingpage
- Löschfrist nach X Tagen wenn kein Match

### Offene Fragen
- [ ] Branding: Eigenständiger Name für den Service? Oder unter Tom's Brand?
- [ ] Ad Creatives: Welcher Hook? Humor vs. Premium?
- [ ] Wie wird Tom's Profil präsentiert? (Welche Fotos, welcher Text?)
- [ ] Automatisierung: Wie weit? (Full-Auto bis zum Match oder manuelles Review?)
- [ ] Budget: Wie viel Adspend pro Tag?

## Status
- [x] Konzept dokumentiert (10.03.2026)
- [ ] Landingpage gebaut
- [ ] Ad Creatives erstellt
- [ ] Funnel live
