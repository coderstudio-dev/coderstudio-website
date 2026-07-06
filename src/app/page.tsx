"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "./coderstudio-logo.svg";

const NAV_LINKS = [{ href: "#services", label: "Services" }];

const FOOTER_INFO = {
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

type FooterModalKey = keyof typeof FOOTER_INFO;

const LOG_POOL = [
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

const SERVICES = [
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
      "Continuous monitoring, patching, and incident response with a <15-minute median. You sleep; we watch the perimeter.",
  },
  {
    tag: "BUILD",
    title: "Custom development",
    description:
      "Software that fits the way you actually work — shipped in two-week sprints, not open-ended quarters.",
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
      "Golden paths, CI/CD, and tooling your engineers actually enjoy — the difference between shipping weekly and shipping when you can.",
  },
  {
    tag: "SCALE",
    title: "Cloud-native delivery",
    description:
      "Containerized, Kubernetes-backed deployment that scales to zero and back — you pay for traffic, not idle servers.",
  },
];

const STATS = [
  { value: "40+", label: "SMEs kept online, fully remote" },
  { value: "99.98%", label: "Median uptime across managed fleets" },
  { value: "SOC 2", label: "Aligned security practices, audited yearly" },
  { value: "-38%", label: "Average cloud spend after our first review" },
];

function formatClock(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState<FooterModalKey | null>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#08090B] text-[#ECEBE2] font-sans">
      <header className="sticky top-0 z-[1000] border-b border-white/10 bg-[#08090B]/80 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between">
          <a className="flex items-center -space-x-1" href="#home">
            <Image className="h-16 w-auto" src={logo} alt="CoderStudio Labs" />
            <span className="font-mono font-semibold text-3xl tracking-wide text-[#9AA0A6]">
              /Labs
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 font-mono text-[12.5px] tracking-wide text-[#9AA0A6]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#ECEBE2] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[#ECEBE2] border border-white/20 px-4 py-2 hover:border-[#5dd0ff] hover:text-[#5dd0ff] transition-colors"
            >
              Book audit <span>→</span>
            </a>
          </nav>
          <button className="md:hidden z-50" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#08090B] border-l border-white/10 transform transition-transform duration-300 ease-in-out z-[999] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-end p-8 mt-20 gap-6 font-mono text-sm tracking-wide text-[#9AA0A6]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="hover:text-[#ECEBE2] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-[#ECEBE2] hover:text-[#5dd0ff] transition-colors"
          >
            Book audit →
          </a>
        </nav>
      </div>

      <main className="flex-1 relative overflow-hidden" id="home">
        {/* ambient layers */}
        <div
          className="absolute inset-0 pointer-events-none animate-gridpan"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="absolute -top-44 right-[8%] w-[620px] h-[620px] pointer-events-none rounded-full opacity-10 blur-[30px] animate-floaty"
          style={{ background: "radial-gradient(circle, #5dd0ff 0%, transparent 62%)" }}
        />

        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-10">
          {/* HERO */}
          <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center py-16 md:py-24">
            <div>
              <div
                className="inline-flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.22em] text-[#5dd0ff] mb-8 opacity-0 animate-rise"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="w-6 h-px bg-[#5dd0ff]" />
                IT &amp; digital transformation for SMEs
              </div>

              <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight mb-6">
                <span className="block opacity-0 animate-rise" style={{ animationDelay: "0.14s" }}>
                  The IT department
                </span>
                <span className="block opacity-0 animate-rise" style={{ animationDelay: "0.24s" }}>
                  you can&apos;t afford to hire — <em className="not-italic text-[#5dd0ff]">on tap</em>.
                </span>
              </h1>

              <p
                className="max-w-[500px] text-[17px] leading-relaxed text-[#A7ADB3] mb-9 opacity-0 animate-rise"
                style={{ animationDelay: "0.34s" }}
              >
                We run the cloud, security, and software that lets forward-thinking SMEs
                compete with companies ten times their size — without the enterprise
                headcount or the enterprise invoice.
              </p>

              <div
                className="flex flex-wrap items-center gap-4 mb-5 opacity-0 animate-rise"
                style={{ animationDelay: "0.44s" }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 bg-[#5dd0ff] text-[#08090B] font-semibold text-[14.5px] px-6 py-4 hover:brightness-110 transition-[filter]"
                >
                  Book a 20-min audit <span>→</span>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 text-[#ECEBE2] text-[14.5px] px-5 py-4 border border-white/[0.16] hover:border-white/40 transition-colors"
                >
                  See how it works
                </a>
              </div>
              <p
                className="font-mono text-xs text-[#6C7278] tracking-wide opacity-0 animate-rise"
                style={{ animationDelay: "0.5s" }}
              >
                # free infrastructure review — no sales theatre, no lock-in
              </p>
            </div>

            <div className="opacity-0 animate-rise" style={{ animationDelay: "0.4s" }}>
              <StatusPanel />
            </div>
          </section>

          {/* TRUST STRIP */}
          <section
            id="proof"
            className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/[0.09]"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 px-6 ${i % 2 === 0 ? "md:border-r" : ""} ${
                  i < 2 ? "border-b md:border-b-0" : ""
                } ${i !== STATS.length - 1 ? "md:border-r" : "md:border-r-0"} border-white/[0.09]`}
              >
                <div className="font-display text-3xl md:text-4xl leading-none">{stat.value}</div>
                <div className="text-[13.5px] text-[#8A9096] mt-2">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* SERVICES */}
          <section id="services" className="py-16 md:py-24 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.2em] text-[#5dd0ff] mb-4">
                  <span className="w-6 h-px bg-[#5dd0ff]" />
                  What we run for you
                </div>
                <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight tracking-tight max-w-[620px]">
                  Six capabilities, one accountable team.
                </h2>
              </div>
              <p className="font-mono text-xs text-[#6C7278] max-w-[210px] md:text-right">
                No hand-offs between vendors. One roadmap, one invoice, one number to call.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.09]">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  index={i + 1}
                  tag={service.tag}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" ref={contactRef} className="py-16 md:py-24">
            <div className="relative border border-white/[0.12] bg-gradient-to-br from-[#0E1114] via-[#0C0E10] to-[#5dd0ff]/[0.06] p-8 md:p-14 overflow-hidden">
              <div
                className="absolute -bottom-36 -right-16 w-[360px] h-[360px] rounded-full opacity-[0.12] blur-[20px] pointer-events-none"
                style={{ background: "radial-gradient(circle, #5dd0ff, transparent 65%)" }}
              />
              <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
                <div>
                  <div className="font-mono text-[11.5px] tracking-[0.2em] text-[#5dd0ff] mb-4">
                    Let&apos;s talk
                  </div>
                  <h2 className="font-display font-semibold text-3xl md:text-5xl leading-tight mb-4">
                    Start with a free infrastructure review.
                  </h2>
                  <p className="text-base leading-relaxed text-[#A7ADB3] max-w-[480px]">
                    Twenty minutes with an engineer — not a salesperson. We&apos;ll map what
                    you&apos;re running today and show you exactly where it&apos;s costing
                    you time, money, or sleep.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-8 font-mono text-[11.5px] text-[#6C7278] tracking-wide">
          <span>© {new Date().getFullYear()} CoderStudio Labs — fully remote, globally distributed</span>
          <nav className="flex items-center gap-6">
            {(Object.keys(FOOTER_INFO) as FooterModalKey[]).map((key) => (
              <div key={key} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenModal(openModal === key ? null : key)}
                  className="hover:text-[#ECEBE2] transition-colors"
                >
                  {FOOTER_INFO[key].label}
                </button>
                {openModal === key && (
                  <InfoPopover
                    title={FOOTER_INFO[key].title}
                    body={FOOTER_INFO[key].body}
                    onClose={() => setOpenModal(null)}
                  />
                )}
              </div>
            ))}
          </nav>
          <span className="inline-flex items-center gap-2">
            <span className="w-[7px] h-[7px] rounded-full bg-[#5dd0ff] animate-pulse-glow" />
            operational
          </span>
        </div>
      </footer>
    </div>
  );
}

interface InfoPopoverProps {
  title: string;
  body: string;
  onClose: () => void;
}

function InfoPopover({ title, body, onClose }: InfoPopoverProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[1999]" onClick={onClose} />
      <div
        className="absolute z-[2000] bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 border border-white/10 bg-gradient-to-b from-[#0E1114] to-[#0A0C0E] p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] font-sans normal-case"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          aria-hidden="true"
          className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-[#0A0C0E] border-r border-b border-white/10"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-[#6C7278] hover:text-[#ECEBE2] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-display font-semibold text-lg mb-2 pr-6 text-[#ECEBE2]">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-[#A7ADB3]">{body}</p>
      </div>
    </>
  );
}

interface ServiceCardProps {
  index: number;
  tag: string;
  title: string;
  description: string;
}

function ServiceCard({ index, tag, title, description }: ServiceCardProps) {
  return (
    <div className="relative p-8 border-r border-b border-white/[0.09] transition-colors hover:bg-[#5dd0ff]/[0.04]">
      <div className="flex justify-between items-baseline mb-10">
        <span className="font-mono text-xs text-[#5dd0ff]">{String(index).padStart(2, "0")}</span>
        <span className="font-mono text-[10px] tracking-wide text-[#6C7278] uppercase">{tag}</span>
      </div>
      <h3 className="font-display text-2xl font-normal mb-3">{title}</h3>
      <p className="text-[14.5px] leading-relaxed text-[#9AA0A6]">{description}</p>
    </div>
  );
}

function StatusPanel() {
  const counterRef = useRef(0);

  const makeLine = () => {
    const item = LOG_POOL[counterRef.current % LOG_POOL.length];
    counterRef.current += 1;
    return { id: counterRef.current, time: formatClock(new Date()), ...item };
  };

  const [logLines, setLogLines] = useState<
    { id: number; time: string; tag: string; color: string; msg: string }[]
  >([]);
  const [clock, setClock] = useState("");

  useEffect(() => {
    setLogLines(Array.from({ length: 6 }, makeLine));
    setClock(formatClock(new Date()));

    const clockTimer = setInterval(() => setClock(formatClock(new Date())), 1000);
    const logTimer = setInterval(() => {
      setLogLines((prev) => [...prev.slice(1), makeLine()]);
    }, 2600);

    return () => {
      clearInterval(clockTimer);
      clearInterval(logTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border border-white/10 bg-gradient-to-b from-[#0E1114] to-[#0A0C0E] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#5dd0ff] animate-pulse-glow" />
          <span className="font-mono text-[11.5px] tracking-wide uppercase text-[#C3C9CF]">
            All systems operational
          </span>
        </div>
        <span className="font-mono text-[11.5px] text-[#6C7278]">{clock} UTC</span>
      </div>
      <div className="p-4 font-mono text-xs leading-loose min-h-[176px]">
        {logLines.map((line) => (
          <div key={line.id} className="flex gap-3 whitespace-nowrap overflow-hidden">
            <span className="text-[#565B61]">{line.time}</span>
            <span style={{ color: line.color }}>{line.tag}</span>
            <span className="text-[#9AA0A6] overflow-hidden text-ellipsis">{line.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 text-[#565B61]">
          <span>&gt;</span>
          <span className="w-2 h-[15px] bg-[#5dd0ff] animate-blink" />
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-white/[0.08]">
        <div className="px-4 py-3.5 border-r border-white/[0.08]">
          <div className="font-mono text-xl text-[#ECEBE2]">
            99.98<span className="text-[#5dd0ff] text-sm">%</span>
          </div>
          <div className="font-mono text-[10px] text-[#6C7278] tracking-wide mt-0.5">UPTIME</div>
        </div>
        <div className="px-4 py-3.5 border-r border-white/[0.08]">
          <div className="font-mono text-xl text-[#ECEBE2]">
            &lt;15<span className="text-[#5dd0ff] text-sm">m</span>
          </div>
          <div className="font-mono text-[10px] text-[#6C7278] tracking-wide mt-0.5">RESPONSE</div>
        </div>
        <div className="px-4 py-3.5">
          <div className="font-mono text-xl text-[#ECEBE2]">
            24<span className="text-[#5dd0ff] text-sm">/7</span>
          </div>
          <div className="font-mono text-[10px] text-[#6C7278] tracking-wide mt-0.5">HUMANS ON CALL</div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const error = await response.text();
        setStatus(`Failed to send message: ${error}`);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.\n" + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        className="w-full bg-[#0E1114] border-white/[0.14] text-[#ECEBE2] placeholder:text-[#6C7278] focus-visible:ring-[#5dd0ff]"
        placeholder="Your Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        className="w-full bg-[#0E1114] border-white/[0.14] text-[#ECEBE2] placeholder:text-[#6C7278] focus-visible:ring-[#5dd0ff]"
        placeholder="Your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="w-full h-28 px-3 py-2 text-[#ECEBE2] bg-[#0E1114] border border-white/[0.14] resize-none focus:outline-none focus:ring-2 focus:ring-[#5dd0ff] text-sm placeholder:text-[#6C7278]"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button
        type="submit"
        className="w-full bg-[#5dd0ff] text-[#08090B] hover:bg-[#5dd0ff] hover:brightness-110"
        size="lg"
      >
        Send Message
      </Button>
      {status && <p className="text-center text-sm text-[#9AA0A6]">{status}</p>}
    </form>
  );
}
