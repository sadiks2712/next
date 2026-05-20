"use client";
import { motion } from "framer-motion";
import { Download, ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

const badges = [
  { emoji: "🌐", label: "MERN Stack", style: { top: "5%", left: "-8%" } },
  { emoji: "📱", label: "Android Dev", style: { top: "18%", right: "-16%" } },
  { emoji: "📊", label: "Data Analytics", style: { bottom: "20%", left: "-16%" } },
  { emoji: "🗄️", label: "DBMS Expert", style: { bottom: "5%", right: "-8%" } },
];

export default function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 70 }}>
      {/* Dot grid background */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 0 }} />

      {/* 3D Background */}
      <Scene3D />

      <div className="container" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", padding: "80px 24px" }}>
        {/* Left — Text */}
        <div>
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 500, color: "#60a5fa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>
            Hello, I&apos;m
          </motion.p>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 16 }}>
            <span className="gradient-text">Sadik</span><br />
            <span style={{ color: "var(--text-primary)" }}>Shaikh</span>
          </motion.h1>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {["Full Stack", "Data", "Android Developer"].map((tag) => (
              <span key={tag} className="tag-pill" style={{ fontSize: 13, padding: "5px 14px" }}>{tag}</span>
            ))}
          </motion.div>

          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 500, color: "#60a5fa", marginBottom: 12, fontStyle: "italic" }}>
            &ldquo;Turning data into insights. Ideas into apps. Code into products.&rdquo;
          </motion.p>

          <motion.p custom={4} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
            Freelance developer from Pune, India. I build scalable web apps, native Android applications, and data-driven solutions for businesses worldwide.
          </motion.p>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            <button id="hero-hire-btn" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary" style={{ fontSize: 15, padding: "15px 32px" }}>
              Hire Me <ArrowRight size={16} />
            </button>
            <button id="hero-work-btn" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline" style={{ fontSize: 15, padding: "15px 32px" }}>
              View My Work
            </button>
          </motion.div>

          <motion.a custom={6} variants={fadeUp} initial="hidden" animate="visible"
            href="/resume.pdf" download
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: 14, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>
            <Download size={15} /> Download Resume
          </motion.a>
        </div>

        {/* Right — Profile photo */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <div className="profile-ring-container" style={{ position: "relative", width: 320, height: 320 }}>
            {/* Spinning ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -12, borderRadius: "50%", background: "conic-gradient(from 0deg, #2563eb, transparent, #2563eb, transparent, #2563eb)", opacity: 0.4 }} />
            <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid rgba(37,99,235,0.6)", boxShadow: "0 0 40px rgba(37,99,235,0.4), inset 0 0 40px rgba(37,99,235,0.1)" }} />
            {/* Avatar */}
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", background: "#fff" }}>
                  <Image src="/logo.png" alt="Sadik Shaikh Logo" width={120} height={120} style={{ objectFit: "cover", width: "100%", height: "100%" }} priority className="dark-invert" />
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13, fontFamily: "'Sora',sans-serif" }}>Sadik Shaikh</div>
                <div style={{ color: "var(--accent)", fontSize: 11, marginTop: 4, fontFamily: "'Sora',sans-serif" }}>Full Stack Developer</div>
              </div>
            </div>
            {/* Badges */}
            {badges.map((badge, i) => (
              <motion.div key={badge.label} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                style={{ position: "absolute", ...badge.style, background: "var(--bg-nav)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", backdropFilter: "blur(10px)", zIndex: 10 }}>
                <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }} style={{ fontSize: 18 }}>{badge.emoji}</motion.span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "var(--text-muted)", cursor: "pointer", zIndex: 1 }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
        <ChevronDown size={28} />
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          #home .container { 
            display: flex !important; 
            flex-direction: column-reverse !important; 
            text-align: center; 
            gap: 50px !important; 
            padding-top: 40px !important;
          }
          #home .container > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #home .container > div > div { 
            justify-content: center; 
          }
        }
        @media (max-width: 480px) {
          #home .profile-ring-container { 
            transform: scale(0.75); 
          }
          #home h1 {
            font-size: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
