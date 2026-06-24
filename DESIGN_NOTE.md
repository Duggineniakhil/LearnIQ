# Design Decision Note — Widget-to-Chat Dashboard

## Key Design Decisions

**1. Selection as a Primary Signal**
The widget selection state is communicated through multiple simultaneous signals: a blue border ring, a subtle background gradient wash, a spring-animated "Selected" badge appearing in the top-right corner, and a flash animation on click. This redundancy ensures the user always knows which widget is active — regardless of where they're looking — and satisfies WCAG contrast requirements via ARIA `aria-pressed` attributes.

**2. Context Transfer via the Banner Strip**
Rather than a generic "AI Chat" header, a persistent context banner at the top of the right panel mirrors the selected widget's icon, color, title, and key metric values. This creates an explicit, visible handshake between the widget and the chat: the manager sees exactly what the AI is reasoning about. When context switches, a spring-animated banner replacement with a subtle background pulse signals the transition without being disruptive.

**3. AI Responses as Structured Cards, Not Plain Text**
Each AI response renders as a structured card with a clear label, bold-formatted insight text, an inline mini-chart (trend line, bar chart, comparison, or skill gauge depending on the widget type), and tagged insight keywords. This mirrors the visual grammar of the widget cards on the left — creating a cohesive language where "data looks like data" whether you're browsing or conversing.

**4. Pre-loaded Example Exchange**
Each widget comes with a pre-loaded question-and-answer in the thread, rendered with a typing animation on first activation. This solves the "cold start" problem — managers immediately see what kinds of questions the AI can handle and how responses look, lowering the barrier to asking their own questions.

**5. Smooth Context Switching**
Switching between widgets (rather than first-time selection) triggers a crossfade on the message thread plus a translucent blue overlay pulse on the right panel. This differentiates "first activation" from "context change," giving a clear spatial metaphor: the right panel is a window into the selected widget's context, and flipping that window is intentionally visible.
