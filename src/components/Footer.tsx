"use client";
import { Globe } from "lucide-react";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: <GithubIcon />, href: "https://github.com/sadiks2712", label: "GitHub" },
  { icon: <LinkedinIcon />, href: "https://linkedin.com/in/sadik-shaikh-8587b7346", label: "LinkedIn" },
  { icon: <Globe size={18} />, href: "https://vercel.com/sadiks2712s-projects", label: "Vercel" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#070e1c", borderTop: "1px solid rgba(37,99,235,0.15)", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 36 }}>
          {/* Logo */}
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, background: "linear-gradient(135deg,#2563eb,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {"<SS />"}
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: "#64748b", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2563eb")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
              >{label}</a>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: 12 }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,99,235,0.25)"; el.style.color = "#2563eb"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,99,235,0.1)"; el.style.color = "#94a3b8"; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "#475569" }}>
            © 2026 <span style={{ color: "#64748b" }}>Sadik Shaikh</span> · Full Stack | Data | Android Developer · Pune, India
          </p>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, color: "#374151" }}>
            Built with Next.js &amp; Tailwind CSS · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
