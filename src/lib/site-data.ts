import {
  Search, Send, Compass, Orbit, Share2, Bot, BrainCircuit,
  Workflow, Cpu, Sparkles, Hammer, GitBranch,
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
    description: "Conversation, deal, and pipeline intelligence — call analysis, risk scoring, and forecast accuracy in one signal layer.",
    icon: BrainCircuit,
    features: [
      "Call & meeting analysis with deal-level summaries",
      "Pipeline risk scoring and forecast accuracy",
      "Coaching insights and rep-level scorecards",
    ],
  },
];

export type Service = {
  name: string;
  description: string;
  included: string[];
  outcome: string;
  model: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    name: "GTM Operations",
    description: "End-to-end AI GTM deployment across systems, teams, and motions.",
    included: ["RevOps audit & blueprint", "Stack implementation", "AI workflow rollout", "Enablement & training"],
    outcome: "Cut ramp time and lift pipeline efficiency in 90 days.",
    model: "Done-for-you",
    icon: Workflow,
  },
  {
    name: "Agent Studio",
    description: "Custom AI agents and workflows built around your data and processes.",
    included: ["Use-case discovery", "Agent design & build", "Integrations & evals", "Ongoing optimization"],
    outcome: "Replace repetitive ops with measurable agent throughput.",
    model: "Retainer + project",
    icon: Cpu,
  },
  {
    name: "AI Growth",
    description: "AI-orchestrated marketing across content, demand, and lifecycle.",
    included: ["Growth model design", "Content & SEO engine", "Paid + lifecycle agents", "Reporting & attribution"],
    outcome: "Compounding pipeline from a leaner growth team.",
    model: "Retainer + project",
    icon: Sparkles,
  },
  {
    name: "Magnivo Build",
    description: "Idea to product in days — AI-native MVPs ready to ship.",
    included: ["Product scoping", "Design & build sprint", "Launch infrastructure", "Iterate & scale"],
    outcome: "Validated, production-ready products in weeks, not quarters.",
    model: "Done-for-you",
    icon: Hammer,
  },
  {
    name: "RevOps",
    description: "AI-augmented RevOps — auto-hygiene, auto-forecasting, and auto-routing powered by Magnivo agents on top of your stack.",
    included: ["CRM hygiene & data model", "Pipeline architecture & routing", "AI forecasting & dashboards", "Attribution & revenue analytics"],
    outcome: "A self-cleaning, self-forecasting revenue engine your team can trust.",
    model: "Retainer + project",
    icon: GitBranch,
  },
];

export const personas = [
  { title: "B2B SaaS Founders", hook: "Compress your GTM motion into a single AI-run system." },
  { title: "Growth-Stage Startups", hook: "Scale revenue without scaling headcount linearly." },
  { title: "Enterprise Sales Teams", hook: "Equip every rep with an AI co-pilot that closes." },
  { title: "D2C Brands Going B2B", hook: "Stand up a B2B motion in weeks with AI-native infrastructure." },
];

export const platformLayers = [
  { name: "Data Layer", description: "Unified customer, product, and intent data — clean, queryable, real-time." },
  { name: "Agent Layer", description: "Specialized AI agents trained on your domain, governed by guardrails." },
  { name: "Automation Layer", description: "Workflows that execute across your stack — sales, marketing, ops." },
  { name: "Orchestration Layer", description: "Cross-team coordination with shared context, memory, and outcomes." },
];
