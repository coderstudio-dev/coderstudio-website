"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "./coderstudio-logo.svg";
import { InfoPopover } from "@/components/info-popover";
import { ServiceCard } from "@/components/service-card";
import { StatusPanel } from "@/components/status-panel";
import { ContactForm } from "@/components/contact-form";
import { FOOTER_INFO, NAV_LINKS, SERVICES, STATS, type FooterModalKey } from "@/lib/content";

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
