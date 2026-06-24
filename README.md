# LearnIQ — Widget-to-Chat Dashboard

A manager-facing analytics dashboard that lets users click any data widget and ask AI-powered follow-up questions about that widget's data in a live chat panel.

Built as a UI design task demonstrating **Widget-to-Chat interaction design**, inspired by Linear, Notion, and Slack AI.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher

### Installation

```bash
# Clone or download the project, then:
cd "UI Task"
npm install
```

### Run Locally

```bash
node server.js
```

Open **http://localhost:3000** in your browser.

> Target viewport: **1280px wide** (desktop layout).

---

## Project Structure

```
UI Task/
├── server.js           # Express server + mock AI response API
├── package.json
├── DESIGN_NOTE.md      # 5-point design decision writeup
├── README.md           # This file
└── public/
    ├── index.html      # Semantic HTML structure + ARIA labels
    ├── style.css       # Full CSS design system (no framework)
    └── app.js          # All interaction logic (vanilla JS)
```

No build step required — the server serves static files directly from `public/`.

---

## Features

### Left Panel — Data Widgets

| Widget | Metric | Chart Type |
|---|---|---|
| ✅ Course Completion | 84.7% completion rate | Sparkline trend |
| 🕐 Learning Hours | 31.4 avg hrs/week | Mini bar chart |
| 📈 Team Performance | 82.3 avg score | Line chart with dots |
| ⭐ Skill Coverage | 59.4% certified | Skill progress bars |

Each widget:
- Shows live-style metric data with trend indicators
- Is fully clickable and keyboard-accessible (`Enter` / `Space`)
- Displays a hover **"Ask AI"** hint badge
- Shows a spring-animated **"Selected"** badge when active

### Right Panel — AI Chat

- **Context banner** — reflects the active widget's icon, color, title, and key stats
- **Pre-loaded Q&A** — each widget opens with an example question + AI response already in the thread (with typing animation), so managers immediately see what the AI can do
- **Inline AI charts** — responses include widget-appropriate visualizations: trend lines, bar charts, Q1 vs Q2 comparisons, skill gauges
- **Insight tags** — each AI response is tagged with key takeaway labels
- **Suggested questions** — clickable chips tailored to each widget
- **Input context chip** — shows which widget is active at the cursor level
- **Per-widget history** — switching back to a widget restores its prior conversation

### Selection Interaction

The moment of widget selection uses layered signals:
1. Blue border ring + gradient background wash on the card
2. Spring-animated **"Selected"** badge pops in (top-right of card)
3. Flash ring animation radiates outward from the card
4. Right panel: context banner cross-fades in with a blue overlay pulse
5. Message thread fades + slides in for context switches

---

## Tech Stack

| Layer | Technology |
|---|---|
| Server | Node.js + Express |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Styling | Custom CSS design system (no Tailwind/Bootstrap) |
| Data | Hardcoded mock data — no backend or API calls |
| Fonts | Inter (Google Fonts) |

---

## Design Principles

See [`DESIGN_NOTE.md`](./DESIGN_NOTE.md) for the full 5-point design decision writeup. Summary:

1. **Selection as a Primary Signal** — Multiple redundant visual cues ensure the active widget is always obvious
2. **Context Transfer via Banner** — The chat panel mirrors the widget's identity so managers know what the AI is reasoning about
3. **Structured AI Cards** — Responses use the same visual language as the widgets (cards, charts, tags) rather than plain text
4. **Pre-loaded Example Exchange** — Solves the cold-start problem; managers see capability immediately
5. **Distinct Transition States** — First activation vs. context switch use different animations to communicate spatial meaning

---

## Accessibility

- Semantic HTML5 (`<header>`, `<main>`, `<aside>`, `<section>`, `<article>`)
- ARIA roles, labels, and `aria-pressed` on interactive widgets
- `aria-live` regions for dynamic chat updates
- Full keyboard navigation support
- Focus-visible outlines on all interactive elements
