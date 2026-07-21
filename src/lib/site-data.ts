import {
  Search,
  Send,
  Compass,
  Orbit,
  Share2,
  Bot,
  BrainCircuit,
  Workflow,
  Cpu,
  Sparkles,
  Hammer,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export const products: Product[] = [
  {
    slug: "leadfinder",
    name: "Leadfinder",
    tagline: "B2B lead intelligence",
    description: "Find, enrich, and prioritize high-intent accounts with AI-graded signals.",
    icon: Search,
    features: [
      "Real-time intent and firmographic enrichment",
      "ICP scoring with self-learning models",
      "Native CRM and outreach integrations",
    ],
  },
  {
    slug: "reachout",
    name: "Reachout",
    tagline: "Omnichannel outreach",
    description: "Run personalized email, LinkedIn, and voice sequences from one AI brain.",
    icon: Send,
    features: [
      "AI-personalized messaging at scale",
      "Unified inbox across channels",
      "Built-in deliverability and warm-up",
    ],
  },
  {
    slug: "compass",
    name: "Compass",
    tagline: "AI-native CRM",
    description: "A CRM that updates itself, predicts pipeline, and writes its own playbooks.",
    icon: Compass,
    features: [
      "Auto-logged calls, emails, and meetings",
      "Predictive deal scoring and forecasts",
      "Workflow agents per pipeline stage",
    ],
  },
  {
    slug: "orbit",
    name: "Orbit",
    tagline: "ABM platform",
    description: "Run account-based motions across marketing and sales with shared intelligence.",
    icon: Orbit,
    features: [
      "Account intent and engagement graph",
      "Coordinated multi-touch plays",
      "Closed-loop revenue attribution",
    ],
  },
  {
    slug: "socialiq",
    name: "Socialiq",
    tagline: "Social & content AI",
    description: "Generate, schedule, and learn from on-brand content across every channel.",
    icon: Share2,
    features: [
      "Brand-trained content generation",
      "Multi-channel scheduling",
      "Performance learning loops",
    ],
  },
  {
    slug: "agentdesk",
    name: "Agentdesk",
    tagline: "AI agent builder",
    description: "Design, deploy, and govern custom revenue agents — no code required.",
    icon: Bot,
    features: [
      "Visual agent designer",
      "Tool, API, and data connectors",
      "Observability and guardrails",
    ],
  },
  {
    slug: "intelligence",
    name: "Intelligence",
    tagline: "Revenue intelligence",
    description:
      "Conversation, deal, and pipeline intelligence — call analysis, risk scoring, and forecast accuracy in one signal layer.",
    icon: BrainCircuit,
    features: [
      "Call & meeting analysis with deal-level summaries",
      "Pipeline risk scoring and forecast accuracy",
      "Coaching insights and rep-level scorecards",
    ],
  },
];

export type Solution = {
  slug: string;
  name: string;
  description: string;
  included: string[];
  outcome: string;
  model: string;
  icon: LucideIcon;
};

export const solutions: Solution[] = [
  {
    slug: "gtm-operations",
    name: "GTM Operations",
    description: "End-to-end AI GTM deployment across systems, teams, and motions.",
    included: [
      "RevOps audit & blueprint",
      "Stack implementation",
      "AI workflow rollout",
      "Enablement & training",
    ],
    outcome: "Cut ramp time and lift pipeline efficiency in 90 days.",
    model: "Done-for-you",
    icon: Workflow,
  },
  {
    slug: "agent-studio",
    name: "Agent Studio",
    description: "Custom AI agents and workflows built around your data and processes.",
    included: [
      "Use-case discovery",
      "Agent design & build",
      "Integrations & evals",
      "Ongoing optimization",
    ],
    outcome: "Replace repetitive ops with measurable agent throughput.",
    model: "Retainer + project",
    icon: Cpu,
  },
  {
    slug: "ai-growth",
    name: "AI Growth",
    description: "AI-orchestrated marketing across content, demand, and lifecycle.",
    included: [
      "Growth model design",
      "Content & SEO engine",
      "Paid + lifecycle agents",
      "Reporting & attribution",
    ],
    outcome: "Compounding pipeline from a leaner growth team.",
    model: "Retainer + project",
    icon: Sparkles,
  },
  {
    slug: "magnivo-build",
    name: "Magnivo Build",
    description: "Idea to product in days — AI-native MVPs ready to ship.",
    included: [
      "Product scoping",
      "Design & build sprint",
      "Launch infrastructure",
      "Iterate & scale",
    ],
    outcome: "Validated, production-ready products in weeks, not quarters.",
    model: "Done-for-you",
    icon: Hammer,
  },
  {
    slug: "revops",
    name: "RevOps",
    description:
      "AI-augmented RevOps — auto-hygiene, auto-forecasting, and auto-routing powered by Magnivo agents on top of your stack.",
    included: [
      "CRM hygiene & data model",
      "Pipeline architecture & routing",
      "AI forecasting & dashboards",
      "Attribution & revenue analytics",
    ],
    outcome: "A self-cleaning, self-forecasting revenue engine your team can trust.",
    model: "Retainer + project",
    icon: GitBranch,
  },
];

export type Resource = {
  slug: string;
  type: "Blog" | "Playbook" | "Guide" | "Case Study" | "Benchmark" | "Glossary";
  title: string;
  description: string;
  content?: string;
  tags?: string[];
  phase?: "Find" | "Understand" | "Reach";
};

export const resources: Resource[] = [
  {
    slug: "hidden-cost-of-manual-lead-research",
    type: "Blog",
    title: "The Hidden Cost of Manual Lead Research: Why GTM Teams Are Losing Millions (and How Magnivo AI Fixes It)",
    description: "Prospecting research consumes up to 72% of a rep's week. Learn how Magnivo AI replaces tool sprawl and manual research with a unified GTM Operating System.",
  },
  {
    slug: "ai-gtm-playbook-2025",
    type: "Guide",
    title: "The 2025 AI GTM Playbook",
    description: "How to replace manual SDR functions with autonomous agents.",
  },
  {
    slug: "series-b-saas-pipeline",
    type: "Case Study",
    title: "Doubling pipeline for a Series B SaaS",
    description: "A deep dive into how Magnivo.ai automated outbound for a scaling team.",
  },
  {
    slug: "future-of-revops",
    type: "Blog",
    title: "The Future of AI-Native RevOps",
    description: "Why the traditional RevOps stack is being replaced by autonomous agents.",
  },
  {
    slug: "agent-governance-guide",
    type: "Playbook",
    title: "The AI Agent Governance Framework",
    description: "Ensuring safety, reliability, and performance in revenue agents.",
  },
  {
    slug: "24-hour-window-timing-vs-targeting",
    type: "Blog",
    phase: "Find",
    title: "The 24-Hour Window: Why Timing Beats Targeting in B2B Sales",
    description:
      "Buying signals decay fast — a signal acted on in week one is worth roughly 2.5x the same signal a month later. Here's why timing beats targeting in B2B GTM.",
    tags: ["AI GTM operating system", "autonomous GTM", "revenue intelligence", "B2B AI automation", "buying signals"],
    content: `> Here's an uncomfortable truth: you can have the perfect B2B AI automation stack, the perfect ICP, the perfect message and still lose the deal, because you were three days late.

Most GTM teams obsess over who to target. Almost nobody builds a system around when. That's backwards, and the math proves it.

## Buying signals decay. Fast.

A funding announcement, a leadership change, a hiring spree — these aren't static facts about a company, they're perishable goods. In Magnivo's scoring model, every signal carries a weight (funding = 10, leadership change = 9, hiring = 8, expansion = 7, competitor complaint = 6) and that weight gets multiplied by a freshness factor the moment it's detected:

- Full value inside 14 days
- Down to 70% by day 30
- Down to 40% by day 60
- A floor of 10% after that

A "hot" signal you act on in week one is worth roughly **2.5x** what the same signal is worth a month later. Same company. Same trigger. Different outcome, purely because of the clock.

Stop doing "targeting-only" GTM. Targeting tells you who could theoretically buy. Timing tells you who is buying right now — and that's the difference between a rep who looks psychic and a rep who looks late.

## Why most teams miss the window

**72% of a rep's week** is wasted on manual prospecting research — scanning LinkedIn, Googling "company + funding," piecing together whether a signal is even real. By the time a human finishes that research loop, the 14-day freshness window is already half gone. You're not losing to a better competitor. You're losing to your own research latency.

The fix isn't "work faster." It's "detect continuously."

This is the entire premise behind an autonomous GTM system: signal detection has to run as a standing process, not a Tuesday-afternoon task. Magnivo's signal-detection agent plans and runs targeted searches per lead continuously, classifies each hit for real buying intent (discarding noise), and timestamps it the moment it's found — so the freshness clock starts ticking the instant the signal exists, not whenever a rep gets around to checking.

Pair that with an AI GTM operating system that also plans the send window per lead (right channel, right cadence, right hour) and you've closed the loop: signal detected fresh → scored while it's still worth full points → reached while the prospect is still in-market.

The takeaway: the best way to win more deals isn't a better pitch. It's shrinking the gap between "this company started buying" and "we showed up." Across 40+ teams running Magnivo, that shrinking gap is a big part of why $4.2M in pipeline got built on top of 52 AI agents working the clock nobody else was watching.`,
  },
  {
    slug: "from-vague-icp-to-usable-icp",
    type: "Blog",
    phase: "Find",
    title: "How to Turn \"We Sell to Mid-Market SaaS\" Into an Actual, Usable ICP",
    description:
      "\"Mid-market SaaS\" is a vibe, not an ICP — and vibes don't generate pipeline. Here's how to turn a fuzzy target market into a structured filter every agent can use.",
    tags: ["AI GTM operating system", "ICP", "B2B AI automation", "revenue intelligence", "GTM strategy"],
    content: `"We sell to mid-market SaaS" is not an ICP. It's a vibe. And vibes don't generate pipeline — structured, queryable data does.

Here's the test: hand your current ICP description to two different reps and ask them to each build a list of 20 target companies. If you get two wildly different lists, you don't have an ICP. You have a Slack message that everyone interprets differently.

## Why vague ICPs quietly wreck your GTM AI automation

Every downstream system — lead generation, scoring, personalization, even your outreach cadence — inherits its precision (or lack of it) from the ICP definition. Feed a fuzzy ICP into an automated pipeline and you don't get fuzzy results slowly; you get confidently wrong results fast, which is worse. "Mid-market SaaS" could mean 50 employees or 500. It could mean $5M ARR or $50M. Without hard boundaries, an AI GTM operating system has nothing to filter against.

## What an actual, usable ICP contains

Magnivo's ICP-definition agent takes a single free-text prompt — the kind a founder types in thirty seconds — and structures it into fields a machine can actually act on:

- Geography (with location-specific search hints)
- Industry and growth stage — not just "SaaS"; Series B fintech vs. bootstrapped healthtech behave completely differently
- Company size band (employee count, not adjectives)
- Buyer titles — who actually holds budget (defaults to CEO/Founder/Head-of if unspecified, but real ICPs name names: "VP of RevOps," not "leadership")
- Users vs. blockers — the people who'll live in the product daily vs. the people (often Procurement or Legal) who can kill the deal
- The pain point, stated specifically enough that a copywriting agent could reference it without sounding generic

Run "mid-size HR-tech SaaS in India, 50–200 employees, target Heads of HR" through that structure once, and every agent downstream — lead gen, enrichment, scoring, personalization — now has boundaries to search inside instead of guessing.

Stop writing ICPs as adjectives. Start writing them as filters.

The difference between "mid-market SaaS" and a structured ICP profile is the difference between a search query and a search strategy. One returns noise. The other returns a revenue intelligence asset your whole team can reuse — the same ICP row feeds lead gen, market sizing, and outreach personalization without anyone re-explaining the target market in a meeting.`,
  },
  {
    slug: "why-your-tam-looks-big-on-paper",
    type: "Blog",
    phase: "Find",
    title: "Why Your TAM Looks Big on Paper but Small in Your CRM",
    description:
      "Directory listings, aggregator pages, and duplicate entries can make your CRM 30–40% junk before a rep touches it. Here's how to fix TAM shrinkage at the source.",
    tags: ["TAM SAM SOM", "B2B AI automation", "autonomous GTM", "revenue intelligence", "lead generation"],
    content: `Every board deck has a beautiful TAM slide. Every CRM tells a different story.

Here's what's actually happening between the slide and the CRM: your "big" market included a lot of companies that were never real. Directory listings mistaken for companies. Aggregator pages (G2, Capterra, Crunchbase, Wikipedia, even LinkedIn company pages) scraped as if they were prospects. Domains that don't resolve. Duplicate entries from three different searches that all found the same company under slightly different names.

## The shrinkage happens at lead generation, not at close

A lead-generation process that isn't built to filter aggregator noise will hand your CRM a list that's 30–40% junk before a single rep touches it. Magnivo's lead-gen agent builds targeted search queries per ICP (industry × geography, with size and growth-stage qualifiers) and explicitly excludes aggregator domains at the query level — no G2, no Capterra, no Crunchbase, no Wikipedia — before it even normalizes results into company records. Then it resolves an actual company domain per candidate (not just a name), and dedupes against the run and against everything already sitting in your database.

That's the difference between "TAM on paper" and "TAM in your CRM": one counts mentions, the other counts reachable, non-duplicate, real companies.

## Stop confusing search results with a market

The other half of the gap is measurement. TAM/SAM/SOM shouldn't be a slide you built once for a fundraiser and never touched again — it should be a living number. Magnivo's market-sizing agent recalculates TAM/SAM/SOM per ICP on a rolling weekly basis, with a priority rank, so "how big is our market, really" stops being an annual offsite question and becomes a number you can check on a Tuesday.

## The fix

If your TAM looks big on paper but small in your CRM, the problem isn't your market — it's everything between the market and the CRM: dirty sourcing, no dedupe, no domain verification, and a TAM number nobody's updated since the seed round. An autonomous GTM system fixes the pipe, not the paper.`,
  },
  {
    slug: "real-reason-cold-emails-dont-get-opened",
    type: "Blog",
    phase: "Find",
    title: "The Real Reason Half Your Cold Emails Never Get Opened",
    description:
      "It's not your subject line. It's the unverified addresses dragging your whole sending batch into spam — and the -30 point penalty they should carry in your scoring model.",
    tags: ["B2B AI automation", "email deliverability", "revenue intelligence", "cold outreach", "lead enrichment"],
    content: `It's not your subject line. Best way to find out: check how many of your "prospects" have an email address that was never verified before you hit send.

## The invisible tax: bad data

Cold email has a dirty secret: a huge share of "sent" emails were never deliverable in the first place. Wrong pattern guesses (j.smith@ when it's actually jsmith@), stale contacts who left the company eight months ago, catch-all domains that silently swallow everything. None of that shows up as a bounce in your dashboard if your ESP isn't checking hard enough. It just shows up as "0% open rate" and gets blamed on the copy.

## How real verification actually works

Magnivo's enrichment agent doesn't guess and hope. For every lead, it generates the standard email patterns (first.last@, flast@, and the rest), then verifies each candidate against a live verification service until one actually passes — with a Hunter.io fallback if the first pass comes up empty. Every lead gets tagged verified or gets a bounce_status (no_mx, invalid, bounced) attached to the record.

That tag isn't cosmetic; it feeds directly into scoring. A lead with a bad bounce_status takes a flat **–30 point penalty** in Magnivo's fit score, specifically because a beautifully-targeted, perfectly-timed email to an address that bounces is worth zero. Stop letting bad addresses eat your sender reputation and your rep's time.

## The compounding cost

Here's the part people miss: bounces don't just waste one email. They degrade domain reputation, which suppresses deliverability on the good addresses in the same sending batch. Half your open problem might genuinely be caused by the other half of your list — the unverified half dragging the whole batch into spam folders.

## The fix

An AI GTM operating system treats "is this email real" as a gate, not an afterthought — verify before enrich completes, penalize in scoring if it fails, and never let an unverified contact reach a copywriting or send step. Fix deliverability at the data layer and the subject-line problem gets a lot smaller on its own.`,
  },
  {
    slug: "math-behind-lead-scoring",
    type: "Blog",
    phase: "Find",
    title: "The Math Behind Lead Scoring: How to Rank Without Guesswork",
    description:
      "\"Gut feel\" is not a scoring model. Here's the exact 0–100 formula — firmographic fit, signal freshness, bounce penalties, and why explainable beats black-box.",
    tags: ["lead scoring", "B2B AI automation", "revenue intelligence", "autonomous GTM", "AI GTM operating system"],
    content: `"Gut feel" is not a scoring model. If your team's definition of a "hot lead" changes depending on who's looking at the list, you don't have lead scoring, you have vibes with a spreadsheet attached.

## Here's the actual math

Magnivo scores every lead on a 0–100 scale built from two additive components:

Firmographic fit — max 70 points:

- Geography match: 18
- Buyer title match: 18
- Reachability (verified contact): 14
- Quality signal: 10
- Data completeness: 10

Aggregate signal score — max 30 points, computed as the sum of each detected buying signal's weight, multiplied by a freshness factor:

- 1.0x if detected within 14 days
- 0.7x within 30 days
- 0.4x within 60 days
- 0.1x floor beyond that

Then a hard rule kicks in: a bounce penalty of **–30** if the contact's email is unverified or dead, and an automatic disqualification to score 0 if the company is already an existing customer — no amount of firmographic fit or fresh signal should ever route your CS team's own account back into new-business outreach.

## The tiers

Clamp the total 0–100, and it sorts into three buckets: hot at 80+, warm at 50+, cold below that. Every score carries a version tag (Magnivo runs v2.0) so when the rubric changes, you can tell whether last quarter's "hot" leads were scored under the same rules as this quarter's.

## Why "explainable" beats "black box"

The other thing this math buys you: every score comes with a breakdown. A rep can see why a lead is 84 instead of guessing — geography hit, buyer title hit, contact verified, one fresh funding signal at full weight. That's not just satisfying, it's how you catch a broken model before it burns 200 reps' worth of trust. An AI scoring system that can't show its work is a system nobody will believe the first time it's wrong.

Stop guessing. Start ranking on math you can defend in a meeting.

Firmographic fit tells you if a company could be a customer. Signal freshness tells you if they're ready right now. Multiply timing into your model, not just targeting, and your "hot" list actually means something.`,
  },
  {
    slug: "signs-your-account-research-is-broken",
    type: "Blog",
    phase: "Understand",
    title: "5 Signs Your Account Research Process Is Broken",
    description:
      "Every brief looks the same, nobody knows when it was last updated, and it doesn't scale past 20 accounts. Five signs your account research quietly fell apart.",
    tags: ["account intelligence", "B2B AI automation", "revenue intelligence", "autonomous GTM", "GTM research"],
    content: `Account research is the thing every team says they do and almost nobody does consistently. Here are five signs yours has quietly fallen apart.

## 1. Every account brief looks the same

If your "research" is a template with the company name swapped in, it's not research, it's mail merge with extra steps. Real account intelligence should surface what a company actually does, its recent moves, and its specific pain points — not a generic paragraph that could describe any company in the vertical.

## 2. Nobody knows when the brief was last updated

A brief written in January describing a company's Q4 priorities is worse than no brief at all in June. It's confidently wrong. If there's no timestamp discipline, reps are working off information with an invisible expiration date.

## 3. Research lives in someone's head, not in a system

Ask a rep to hand off an account and watch what happens. If the "research" doesn't transfer cleanly, it was never actually captured; it was tribal knowledge riding along in one person's memory, which leaves the building the moment they do.

## 4. You can't answer "why now" for a single account on your list

Good account intelligence connects a company's public signals (a hire, a product launch, a news mention) to an actual reason to reach out today. If your briefs are static descriptions with no "why now," you've got a directory, not intelligence.

## 5. It doesn't scale past 20 accounts

The real tell: research quality drops the moment volume goes up. A process that only works for your top 20 hand-picked logos isn't a process — it's a favor a rep did once.

## What fixes this

Magnivo's account-intelligence agent builds a structured, timestamped brief per account — pulling from the lead record plus live web and news search — covering what the company does, its recent moves, its pain points, and its active signals. It's the same depth for account #1 and account #400, because it's a system, not a favor. That's the actual definition of B2B AI automation done right: not "faster," but "consistently thorough at a volume no human researcher could sustain."

The best way to fix broken account research isn't hiring more analysts. It's removing the part of the job that's just "read ten tabs and summarize" and pointing the humans at the part that's actually judgment: deciding what to do with the brief.`,
  },
  {
    slug: "how-to-map-a-buying-committee",
    type: "Blog",
    phase: "Understand",
    title: "How to Map a Buying Committee Without Guessing Who Holds the Budget",
    description:
      "\"I think the VP is the decision-maker\" is a guess dressed up as strategy. Here's how to map buyer, user, and blocker roles — and find the right entry point.",
    tags: ["buying committee", "stakeholder mapping", "revenue intelligence", "B2B AI automation", "autonomous GTM"],
    content: `"I think the VP is the decision-maker" is not a stakeholder map. It's a guess dressed up as strategy — and it's how deals stall in "let me check with my team" purgatory for six weeks.

## Why guessing the buying committee is so expensive

Every wrong assumption about who holds a budget costs you a full sales cycle's worth of wasted effort: pitching the wrong person, building the wrong business case, getting championed by someone with no actual purchasing authority. By the time the real economic buyer surfaces, you've burned your best material on the wrong audience.

## How to actually map it

Stop asking "who's the decision-maker" as a single question — real buying committees have multiple roles, and conflating them is exactly how deals get misrouted:

- Buyer — holds or approves the budget
- User — will actually live in the product day to day
- Blocker — Procurement, Legal, Security; can't say yes, absolutely can say no

Magnivo's stakeholder-mapping agent builds this out per account by pulling from the account-intelligence brief and running targeted LinkedIn searches for the roles the ICP already flagged as relevant — then produces a recommended entry point: not "the most senior title," but the person most likely to actually engage first and pull others in.

## The entry-point insight is the part most teams skip

Everyone knows to map the committee. Almost nobody builds a system that also recommends where to start. The highest-title person on the list is frequently the worst first contact; they're the hardest to reach and the least likely to respond to a cold intro. A structured stakeholder map with a ranked entry point turns "who do I even email" from a coin flip into a decision backed by role data.

## Stop treating the buying committee like a mystery novel

You don't need to interrogate your way to the org chart deal by deal. An AI GTM operating system that maps stakeholders as a standing process — not a one-off Slack thread asking "does anyone know who's over there" — means every rep starts the account with the committee already sketched out, freeing them up to actually sell instead of investigate.`,
  },
  {
    slug: "competitor-battlecards-without-the-rebuild",
    type: "Blog",
    phase: "Understand",
    title: "How to Position Against Competitors Without Building a Battlecard From Scratch",
    description:
      "A battlecard built once in a Google Doc goes stale the moment a competitor ships. Here's how to keep competitive intel — and talk tracks — continuously refreshed.",
    tags: ["competitive intelligence", "battlecard", "B2B AI automation", "revenue intelligence", "sales enablement"],
    content: `Every sales team has, at some point, built a battlecard in a Google Doc that was accurate for exactly one quarter before the competitor shipped a new feature and the whole thing went stale. Then nobody updated it, and reps started freelancing their competitive positioning in live calls. That's how you lose deals to objections you actually had a good answer for — you just didn't have it ready.

## The core problem: battlecards decay, but the update process doesn't exist

Competitive intel isn't a one-time research project. Competitors ship features, change pricing, get acquired, get bad press. A battlecard built in Q1 and never revisited is worse than nothing, because reps trust it and it's wrong.

## What a living battlecard actually needs

Magnivo's competitive-intelligence agent builds competitor cards continuously — pulling from the ICP profile (so it knows who your actual competitive set is, not a generic top-5) plus live web and news search — and attaches talk tracks, not just feature comparisons. The difference matters: a feature-comparison table tells a rep what's different. A talk track tells them what to say when a prospect brings up that competitor mid-call.

## Stop rebuilding competitive positioning per-deal

The old workflow: rep hears a competitor's name on a call, scrambles to remember what they know, maybe Slacks a colleague mid-pitch. The new workflow: the competitive intel already exists, tied to the ICP, refreshed continuously, with a talk track sitting one click away — so the response to "we're also looking at [Competitor]" is confident instead of improvised.

## Why this belongs in an automated GTM system, not a wiki page

A wiki page is exactly as current as the last person who remembered to update it. An autonomous GTM process treats competitive intelligence the same way it treats buying signals — as something that needs continuous refresh, not a quarterly project. Build the battlecard once as a system, and every new competitor mentioned gets folded in automatically instead of waiting for someone to notice the market moved.

The best way to win competitive deals isn't out-arguing the prospect. It's never being surprised by the objection in the first place.`,
  },
  {
    slug: "weekly-tam-sam-som-without-a-research-team",
    type: "Blog",
    phase: "Understand",
    title: "How to Get a Weekly TAM/SAM/SOM Map Without a Research Team",
    description:
      "TAM/SAM/SOM built once for a fundraise fossilizes fast. Here's how to turn market sizing into a living, weekly-refreshed number instead of a stale board slide.",
    tags: ["TAM SAM SOM", "market sizing", "revenue intelligence", "autonomous GTM", "B2B AI automation"],
    content: `TAM/SAM/SOM is one of those slides that gets built once — usually under fundraise pressure — and then quietly fossilizes. Eighteen months later, the "market size" in the deck describes a market that's moved on, while the deck hasn't.

## Why static market sizing quietly misleads everyone

Your addressable market isn't a fixed number. New companies enter it, some exit it, growth-stage bands shift, and the segments worth prioritizing this quarter aren't necessarily the ones that looked biggest a year ago. A TAM number frozen in time tells your GTM team where to aim based on stale information — and stale targeting compounds: wrong segment priority means wrong lead gen queries, which means wrong pipeline.

## What "weekly" actually buys you

Magnivo's market-sizing agent recalculates TAM/SAM/SOM per ICP, on a rolling weekly cadence, and attaches a priority rank — so instead of one static number, you get a living view of which segments are growing, which are shrinking, and which deserve budget this week, not last year.

## How to get this without hiring analysts

The traditional path to "know your market size accurately" is a research team pulling data from multiple directories, cross-referencing firmographic databases, and manually re-running the exercise every time someone asks. That's expensive and it still goes stale the moment the report is finished. The alternative: an AI GTM operating system that treats market sizing as a standing calculation fed by the same lead and ICP data already flowing through the pipeline — so TAM/SAM/SOM updates itself as a byproduct of the system running, not as a separate research sprint.

## Stop treating market sizing like a one-time deliverable

The fix isn't "hire more research analysts to update the slide more often." It's removing the slide entirely and replacing it with a number that refreshes on its own. A weekly TAM/SAM/SOM view with priority ranking means your GTM leadership can answer "where should we focus this quarter" with current data instead of a number somebody built for a board meeting two years ago.`,
  },
  {
    slug: "nine-data-sources-one-gtm-brief",
    type: "Blog",
    phase: "Understand",
    title: "How to Turn 9 Scattered Data Sources Into One GTM Brief, Human-Approved",
    description:
      "Account intel, stakeholder maps, competitive cards, market sizing — that's nine browser tabs, not a research process. Here's how synthesis (and human approval) should work.",
    tags: ["AI GTM operating system", "GTM brief", "revenue intelligence", "autonomous GTM", "B2B AI automation"],
    content: `Account intelligence. Stakeholder maps. Competitive cards. Market sizing. LinkedIn. News search. Firmographic data. The ICP itself. Your own CRM history. That's not a research process — that's nine browser tabs, and somebody has to hold all of it in their head to write one coherent brief. Most reps don't. They pick two or three sources, skim them, and call it "prepped."

## The synthesis problem nobody talks about

Individually, each data source is useful. Account intelligence tells you what's happening at the company. Stakeholder maps tell you who to talk to. Competitive intel tells you what to say when a rival comes up. Market sizing tells you whether this segment is even worth prioritizing. None of them, alone, tells a rep what to actually do this week. That synthesis step — turning five separate intelligence outputs into one coherent, actionable brief — is where most GTM stacks fall apart, because nobody owns stitching it together.

## How Magnivo does the stitching

The GTM insight generator is the synthesis layer: it pulls together everything the account-intelligence, stakeholder, competitive, and market-sizing agents have already produced for a given lead and turns it into a single actionable brief — not a data dump, a recommendation.

## "Human-approved" is the part that matters most

Here's the detail that separates a real AI GTM operating system from a black box that fires outreach on its own: the brief doesn't get treated as final the moment the AI produces it. There's an explicit approval step — a human reviews and approves the synthesized insight before it flows downstream into personalization and outreach. That's the actual trust model for autonomous GTM: the system does the scattered, exhausting synthesis work across every data source, and a human makes the final call on what goes out. Automation handles volume. Judgment stays with people.

## Stop asking reps to be their own synthesis engine

Nine data sources is too many for a person to reliably combine, every single time, at scale, without missing something. The fix isn't asking reps to read faster — it's building a system that does the combining automatically and hands humans a decision, not a research project.`,
  },
  {
    slug: "founder-writing-cold-emails-at-11pm",
    type: "Blog",
    phase: "Reach",
    title: "Your Founder Is Writing Cold Emails at 11PM Instead of Building the Product",
    description:
      "A 5-step outreach sequence is a mechanical, repeatable craft once the inputs are already known. Here's why founder-written cold email is a bad use of a founder's night.",
    tags: ["AI GTM operating system", "cold email automation", "B2B AI automation", "founder-led sales", "revenue intelligence"],
    content: `There's a specific kind of exhaustion that comes from being a founder who's spent the day on product decisions, hiring, and a customer escalation — and now it's 11PM and you're staring at a blank email trying to remember the right way to open a cold outreach sequence without sounding like every other cold outreach sequence.

## This is not where your time should go

Writing a 5-step outreach sequence — intro, three follow-ups, and a breakup email, each with subject line variants worth testing — is a real craft. It's also a completely mechanical, repeatable craft once the inputs (who the prospect is, what they care about, what's true about their situation right now) are already known. A founder rewriting that from scratch every night isn't doing high-leverage work. They're doing a job an AI GTM operating system should already be handling.

## What "already known" actually means here

By the time outreach copy needs to get written, an autonomous system has already done the upstream work: the ICP is defined, the lead is scored, the account brief exists, the personalization angles are picked. Magnivo's copywriting agent takes that context — the personalization data, the account intelligence — and produces the full sequence: a 5-step cadence with two subject-line variants per step, ready for a human to skim and approve, not draft from a blank page at midnight.

## The real cost of founder-written cold email

It's not just the time. It's the opportunity cost — every hour a founder spends manually writing outreach is an hour not spent on the thing only they can do: product direction, key hires, the calls that actually need a founder's voice. Cold email at scale is not one of those things. It's B2B AI automation territory, precisely because volume and repeatability are exactly what automation is good at.

## Stop wearing "I write my own cold emails" as a badge of hustle

It's not a hustle. It's a founder doing a job the system should already have automated, at 11PM, when they should be asleep. Reclaim that hour. Let the sequence get drafted by the system that already has all the context — and spend the founder's actual judgment on the ten-minute review, not the two-hour write.`,
  },
  {
    slug: "you-emailed-them-at-2am",
    type: "Blog",
    phase: "Reach",
    title: "You Emailed Them at 2AM. They Never Opened It. They Never Will.",
    description:
      "Different roles check email at different hours. Sending every prospect the same email at 9AM Tuesday ignores that — and it shows up in your open rates.",
    tags: ["send timing", "channel strategy", "autonomous GTM", "B2B AI automation", "revenue intelligence"],
    content: `Somewhere, a rep hit "send" on a perfectly good email at exactly the wrong hour, and that email is now sitting at the bottom of an inbox, buried under everything that arrived during actual business hours. It will never get opened. Not because the copy was bad — because the timing was.

## Timing isn't a nice-to-have. It's a variable your system should own.

Different roles check email at different times. A VP of Sales might triage inbox first thing at 7AM before the day gets chaotic. An engineering lead might not look at anything non-urgent until after lunch. A founder might be checking email at 9PM because that's the only quiet hour they get. Sending every prospect the same email at the same hour ignores all of that — and it shows in your open rates, which quietly get blamed on the subject line instead of the send-time.

## How channel and timing should actually get decided

Magnivo's channel-strategy agent determines, per lead, the channel order, the send window, and the cadence — using the ICP, the account intelligence, and the contact's actual title as inputs. A VP gets a different window than an individual contributor. A role known to be buried in meetings gets a different cadence than one known to check inbox constantly. This isn't guesswork dressed up as a rule, it's a plan built per lead, not a blanket "send at 9AM Tuesday" policy applied to everyone regardless of role.

## Stop treating send time like an afterthought

Most teams put enormous effort into subject lines and zero effort into when those subject lines actually arrive. That's backwards. A great email sent at 2AM local time to a prospect's inbox is functionally the same as a great email that was never written; it's buried before the recipient's day even starts.

## The fix

An autonomous GTM system that plans channel and cadence per lead instead of per campaign closes exactly this gap. The best way to stop losing opens to bad timing: stop assuming every prospect operates on the same clock your sending tool defaults to.`,
  },
  {
    slug: "speed-to-lead-competitors-reached-first",
    type: "Blog",
    phase: "Reach",
    title: "While You Were Copy-Pasting Emails, Three Competitors Already Reached Your Prospect",
    description:
      "72% of a rep's week is manual prospecting research. If competitors have automated the research-to-outreach loop and you haven't, they're not smarter — they're just faster.",
    tags: ["speed to lead", "B2B AI automation", "autonomous GTM", "revenue intelligence", "AI GTM operating system"],
    content: `Speed to lead is one of those metrics everyone claims to care about and almost nobody actually measures, because measuring it means confronting how slow the manual process really is.

## Here's what "slow" actually costs

By the time a rep manually researches a company, figures out who to contact, drafts a personalized opener, and hits send, hours — sometimes days — have passed since the buying signal that made this prospect worth contacting in the first place. Signal freshness decays fast (full weight at 14 days, dropping to 40% by day 60). Every hour spent copy-pasting a template and swapping in a company name is an hour a faster competitor's automated system didn't need.

## The real competitive advantage isn't a better pitch. It's a faster, less-manual pipeline.

**72% of a rep's week** gets consumed by manual prospecting research — the exact work that has to happen before outreach can even start. If three competitors have automated that research-to-outreach loop and you haven't, they're not winning because they're smarter. They're winning because they showed up while the signal was still fresh and you were still building the target list by hand.

## What automated actually looks like end to end

This is the entire point of running FIND → UNDERSTAND → REACH as one continuous system instead of three disconnected manual steps: a lead gets sourced and scored, its account gets researched and its stakeholders mapped, personalization angles get generated from real triggers, a sequence gets written, a channel and send-window get planned, and outreach goes out without a human doing the copy-paste in the middle. Each of those steps used to be a task on someone's to-do list. In an AI GTM operating system, they're a pipeline.

## Stop competing on message quality alone

Message quality matters, but it's not the battlefield most deals are actually lost on. They're lost in the latency gap between "this prospect started buying" and "someone from a vendor showed up in their inbox." Close that gap with automation, and the copy-paste era of outreach stops costing you deals to whoever automated first.`,
  },
  {
    slug: "worst-email-going-out-six-months",
    type: "Blog",
    phase: "Reach",
    title: "Your Worst Email Has Been Going Out for 6 Months. Nobody Noticed.",
    description:
      "A losing subject line variant can run for months if nobody's watching. Here's why real A/B testing needs a volume threshold and a standing retirement loop.",
    tags: ["A/B testing", "B2B AI automation", "revenue intelligence", "autonomous GTM", "sales outreach optimization"],
    content: `Somewhere in your outreach tool right now, there's a subject line variant with a terrible open rate that's been running, unexamined, since Q1. Nobody killed it because nobody was watching closely enough to notice it was the weak half of an A/B test that never got resolved.

## Why "set it and forget it" outreach quietly bleeds pipeline

Sequences get written once and then run for months. Without a standing process that actually looks at performance and retires underperformers, a bad variant doesn't get pulled; it just keeps going out, quietly dragging down your average metrics while everyone assumes the sequence "performs okay" because nobody's isolated the losing half from the winning half.

## What real A/B discipline requires

Magnivo's A/B-testing agent pulls live analytics from the outreach platform, scores each variant, and retires the losers — but only once there's enough data to trust the call: it requires roughly **50 sends per variant** before making a retirement decision, specifically so a bad early sample doesn't kill a subject line that just needed more volume to prove itself. That threshold matters as much as the testing itself; testing too early is how you retire a winner by mistake.

## Why this has to be continuous, not a one-time review

A/B testing that happens once, at launch, and never again is really just "we picked one variant and stopped checking." Real testing is a standing loop: sends happen, opens and replies get pulled, variants get scored, losers get retired, and the sequence keeps improving instead of calcifying around whatever the first draft happened to be.

## The fix

Stop assuming your outreach sequence is fine just because nobody complained about it recently. If there's no process actively pulling analytics and retiring underperforming variants, there's a good chance your worst email is still running right now, quietly costing you replies every single week. An autonomous GTM system treats this the same way it treats every other stage: not a task someone remembers to do, but a loop that runs on its own.`,
  },
  {
    slug: "personalization-that-isnt-copy-paste",
    type: "Blog",
    phase: "Reach",
    title: "Somewhere Right Now, a Prospect Is Reading Your Email and Thinking \"Copy-Paste.\"",
    description:
      "Merge fields aren't personalization. Here's how to generate 2–3 verifiable angles per lead — trigger, pain, competitive, role — that hold up when a prospect Googles you.",
    tags: ["personalization", "B2B AI automation", "revenue intelligence", "generative engine optimization (GEO)", "cold outreach"],
    content: `Prospects have gotten very good at spotting a template. The tell isn't the grammar — templates are usually grammatically perfect. The tell is that nothing in the email could only be true about them. Swap the company name and the email still makes sense for literally any other prospect in the same industry. That's the moment they stop reading.

## Real personalization isn't a merge field. It's a verifiable claim.

"Hi {{FirstName}}, I noticed {{Company}} is in the {{Industry}} space" is not personalization — it's a mail-merge trick wearing personalization's clothes. Real personalization references something specific and true enough that the prospect thinks "how did they know that," not "oh, this is templated."

## How to actually generate that per lead, at scale

Magnivo's personalization agent builds 2–3 verifiable angles per lead, pulled from real data rather than invented on the spot — drawing from the account-intelligence brief and the synthesized GTM insight to surface angles across four categories:

- Trigger — something that just happened (a hire, a launch, a funding round)
- Pain — a specific, sourced pain point tied to their situation, not a generic industry pain
- Competitive — a relevant angle tied to what they're currently using or evaluating
- Role — something specific to what this exact buyer title cares about

The word "verifiable" is doing real work here; these aren't guessed angles designed to sound plausible. They're grounded in the same account intelligence and signal data the rest of the pipeline already produced, so when a copywriting step turns them into an actual email, the personalization holds up to scrutiny instead of collapsing the moment the prospect Googles it.

## Stop hoping merge fields feel personal. They don't.

The prospect thinking "copy-paste" isn't a tone problem you can fix with better adjectives. It's a data problem: the email didn't contain anything that could only be true about them. Fix it upstream, at the personalization layer, with real per-lead research instead of a first-name token, and the "this feels templated" reaction stops happening before it starts.

The best way to stop sounding like everyone else's cold email is to make sure your outreach actually knows something real about the person reading it before a single word of copy gets written.`,
  },
];

export const personas = [
  { title: "B2B SaaS Companies", hook: "(Series Seed–A) needing scalable pipeline" },
  {
    title: "Professional Services & Agencies",
    hook: "seeking consistent inbound and outbound leads",
  },
  { title: "B2B Marketplaces", hook: "scaling both supply and demand sides efficiently" },
  {
    title: "RevOps & Sales-Led Teams",
    hook: "automating and augmenting their existing GTM motions",
  },
  {
    title: "Funded Startups",
    hook: "pre-Sales hire looking to build automated GTM infrastructure",
  },
];

export const platformLayers = [
  {
    name: "Data Layer",
    description: "Unified customer, product, and intent data — clean, queryable, real-time.",
  },
  {
    name: "Agent Layer",
    description: "Specialized AI agents trained on your domain, governed by guardrails.",
  },
  {
    name: "Automation Layer",
    description: "Workflows that execute across your stack — sales, marketing, ops.",
  },
  {
    name: "Orchestration Layer",
    description: "Cross-team coordination with shared context, memory, and outcomes.",
  },
];
