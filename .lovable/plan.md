# Home Page Premium Revamp

A complete redesign of `src/routes/index.tsx` to feel more premium, focused, and inspired by the reference screenshots — while keeping deep details on dedicated Products / Services / Platform pages.

---

## 1. Removals (declutter)

- **Remove the client marquee** ("Trusted by revenue teams across SaaS, fintech, and enterprise" + scrolling logos).
- **Remove the full Products grid** (7 product cards) from home — leave a teaser only.
- **Remove the full Services grid** (5 service cards) from home — leave a teaser only.
- **Remove the Platform deep-dive layered grid** (now teased compactly).
- Keep: Hero, Stats, Personas (Who it's for), Testimonials, FAQ, Investor band, Final CTA.

## 2. New Sections (added to home)

### A. Four Pillars of GTM Excellence (new)
Inspired by reference image #2. Four cards in a single row (responsive 1/2/4 cols):
1. **Acquire** — Market Intelligence, Outbound Campaigns & Content Engine
   - ICP Analysis & TAM Mapping · Multi-channel Outbound · AI Content Generation
2. **Engage** — Multi-channel Engagement & Personalized Outreach
   - Personalized Sequences · Social Selling Automation · Smart Follow-ups
3. **Convert** — Pipeline Management, Deal Qualification & Proposals
   - AI Deal Scoring · Automated Proposals · Contract Intelligence
4. **Retain & Expand** — Customer Success, Nurture Queues & Expansion
   - Health Score Monitoring · Expansion Opportunities · Churn Prevention

Premium dark styling: glassmorphic card, color-tinted icon chip per pillar (blue / green / violet / amber accent borders), checkmark bullet list, soft inner gradient on hover.

### B. How It Works (new)
Inspired by reference image #3. Three numbered steps connected by a horizontal accent line (desktop) / vertical line (mobile):
1. **Connect Your Stack** — Integrate your CRM, email, and data sources in minutes.
2. **AI Agents Activate** — 48 specialized agents analyze, strategize, and execute across your GTM motion.
3. **Revenue Grows** — Watch your pipeline fill and deals close faster than ever before.

Each step: numbered badge (top-right of icon tile), large icon tile with conic-gradient ring, bold title, supporting copy. Animated SVG connector line that draws in on scroll.

### C. Compact Products + Services teaser strip (replaces full grids)
A single premium "Two pillars of Magnivo" band with two sides:
- **Left**: "7 SaaS Products → Built for revenue teams" with mini chip-row of product names + `View Products →` link.
- **Right**: "5 Service Lines → Done with you" with chip-row of service names + `Explore Services →` link.

Keeps home page tight; full detail lives at `/products` and `/services`.

### D. Compact Platform teaser
Replace the 4-card layered grid with a slim "Magnivo AI Platform — The unified intelligence layer" band with one CTA. The deep architecture stays at `/platform`.

## 3. Premium Visual Enhancements

### Hero upgrades
- Add a subtle **animated gradient border** ring around the hero status pill.
- Add a **3D perspective tilt** on the hero dashboard mock (`HeroVisual`) on mouse-move.
- Add **scrolling code/log "ticker"** sliver below CTAs (e.g., `agent.dispatch("forecast") • +12 leads enriched • deal-risk: low`) — premium signal of "live system".
- Stronger spotlight: add second beam from bottom-left in green for color balance.

### Global polish
- Add new utilities to `src/styles.css`:
  - `.premium-card` — gradient border (1px) using `mask-composite` with subtle inner glow.
  - `.divider-glow` — horizontal gradient line for section separators.
  - `.step-line` — animated dashed line connector for How It Works.
  - `.tilt-3d` — mouse-tilt helper class (paired with small JS hook).
- Section headings get a small `eyebrow + gradient underline` treatment for consistency.
- Add **section dividers** between major sections using `divider-glow`.
- Slightly **tighten vertical rhythm** (py-16 → py-20/24 with consistent eyebrow spacing).

### Micro-interactions
- Numbered badges on Pillars use a soft pulse on view.
- Cards get a unified `group-hover` lift (translateY -2px + accent border).
- All new sections wrapped in existing `FadeIn` for scroll-in motion.

## 4. Files Affected

- **Edit** `src/routes/index.tsx` — remove marquee, products grid, services grid, platform deep-dive grid; add Four Pillars, How It Works, compact Products/Services teaser, compact Platform band; refine hero.
- **Edit** `src/styles.css` — add `.premium-card`, `.divider-glow`, `.step-line`, gradient underline helpers.
- **Edit** `src/components/HeroVisual.tsx` — add 3D mouse-tilt + the live "ticker" sliver.
- **(Optional new)** `src/components/Pillars.tsx` and `src/components/HowItWorks.tsx` — extracted for cleanliness, or kept inline in `index.tsx`.

## 5. What Stays Untouched

- `/products`, `/products/$slug`, `/services`, `/platform`, `/about`, `/investors`, `/contact`, `/admin`, `/auth` — unchanged. All deep content remains accessible from nav and from the new compact teasers on home.
- Header, Footer, DemoModal, AnimatedCard, AnimatedCounter, FadeIn — unchanged.
- Backend (Supabase submissions/admin) — unchanged.

## Outcome

A tighter, more premium home that tells the story in this order:
**Hero → Stats → Four Pillars → How It Works → Platform teaser → Products/Services teaser → Personas → Testimonials → FAQ → Investor → Final CTA.**

Deeper exploration is one click away on dedicated pages.