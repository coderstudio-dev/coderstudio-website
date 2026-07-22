export const NAV_LINKS = [{ href: "#services", label: "Services" }];

export const FOOTER_INFO = {
  about: {
    label: "About",
    title: "About CoderStudio",
    body: "CoderStudio Labs is a fully remote, distributed startup providing affordable, comprehensive IT and digital transformation services tailored for small and medium-sized enterprises (SMEs). Our mission is to empower SMEs with enterprise-grade technology solutions, enabling them to compete and thrive in the digital age.",
  },
  mission: {
    label: "Mission",
    title: "Our Mission",
    body: "To democratize access to cutting-edge IT solutions for SMEs, enabling them to leverage technology for growth and innovation, regardless of their size or resources.",
  },
  vision: {
    label: "Vision",
    title: "Our Vision",
    body: "To create a world where every SME has the technological capabilities to compete globally, innovate fearlessly, and drive economic growth in their communities.",
  },
} as const;

export type FooterModalKey = keyof typeof FOOTER_INFO;

export const LOG_POOL = [
  { tag: "[deploy]", color: "#C8F050", msg: "api-gateway v2.14 rolled out · 0 downtime" },
  { tag: "[scale] ", color: "#7FB2FF", msg: "orders-svc 3→6 pods · cpu 71%" },
  { tag: "[secure]", color: "#C8F050", msg: "cert renewed · acme.tls · 12 domains" },
  { tag: "[watch] ", color: "#8A9096", msg: "perimeter scan clean · 0 findings" },
  { tag: "[backup]", color: "#7FB2FF", msg: "pg-cluster snapshot · 4.2GB · verified" },
  { tag: "[patch] ", color: "#C8F050", msg: "CVE-2026-118 auto-patched on 9 hosts" },
  { tag: "[alert] ", color: "#F2C14E", msg: "latency spike absorbed · autoscaled" },
  { tag: "[cost]  ", color: "#8A9096", msg: "idle nodes reaped · -$214/mo" },
  { tag: "[ci]    ", color: "#7FB2FF", msg: "pipeline #8842 green · 2m41s" },
  { tag: "[health]", color: "#C8F050", msg: "all 6 regions healthy · sla 99.98%" },
];

export const SERVICES = [
  {
    tag: "CLOUD",
    title: "Cloud infrastructure",
    description:
      "Right-sized, self-healing cloud with cost guardrails baked in — so you scale on demand without the end-of-month surprise.",
  },
  {
    tag: "SECURITY",
    title: "Cybersecurity",
    description:
      "AI-driven threat detection paired with continuous monitoring, patching, and incident response — a <15-minute median. You sleep; we watch the perimeter.",
  },
  {
    tag: "BUILD",
    title: "Custom development",
    description:
      "Software that fits the way you actually work — built with AI-assisted development and shipped in two-week sprints, not open-ended quarters.",
  },
  {
    tag: "HOSTING",
    title: "Managed hosting",
    description:
      "Always-on hosting at 99.98% uptime, backed by real humans — not a ticket queue that answers next week.",
  },
  {
    tag: "DEVEX",
    title: "Developer experience",
    description:
      "Golden paths, CI/CD, and AI-assisted tooling your engineers actually enjoy — the difference between shipping weekly and shipping when you can.",
  },
  {
    tag: "SCALE",
    title: "Cloud-native delivery",
    description:
      "Containerized, Kubernetes-backed deployment that scales to zero and back — you pay for traffic, not idle servers.",
  },
];

export const STATS = [
  { value: "40+", label: "SMEs kept online, fully remote" },
  { value: "99.98%", label: "Median uptime across managed fleets" },
  { value: "SOC 2", label: "Aligned security practices, audited yearly" },
  { value: "-38%", label: "Average cloud spend after our first review" },
];
