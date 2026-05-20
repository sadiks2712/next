"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "8+", label: "Technologies Mastered" },
  { value: "4", label: "Domains Covered" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}>
              {/* Main visual card */}
              <div style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 24, padding: 40, textAlign: "center", minHeight: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 140, height: 140, borderRadius: "50%", background: "#fff", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 24 }}>
                  <Image src="/logo.png" alt="Sadik Shaikh" width={140} height={140} style={{ objectFit: "cover", width: "100%", height: "100%" }} className="dark-invert" />
                </div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Sadik Shaikh</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, fontFamily: "'Sora',sans-serif", marginBottom: 20 }}>Freelance Developer · Pune, India</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {["React", "Node.js", "Android", "Python"].map((t) => (
                    <span key={t} className="skill-pill">{t}</span>
                  ))}
                </div>
              </div>
              {/* Decorative corner accent */}
              <div style={{ position: "absolute", top: -2, left: -2, width: 60, height: 60, borderTop: "3px solid #2563eb", borderLeft: "3px solid #2563eb", borderRadius: "24px 0 0 0" }} />
              <div style={{ position: "absolute", bottom: -2, right: -2, width: 60, height: 60, borderBottom: "3px solid #2563eb", borderRight: "3px solid #2563eb", borderRadius: "0 0 24px 0" }} />
            </div>

            {/* Available badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: -18, right: -18, background: "var(--bg-nav)", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 18px", backdropFilter: "blur(10px)", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Available for Work</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="section-label">— About Me</p>
            <div className="divider" />
            <h2 className="section-heading">
              Developer by Passion,<br />
              <span className="gradient-text">Problem-Solver by Nature</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
              I&apos;m a full-stack developer with hands-on expertise across web, mobile, and data domains. I build clean, scalable, and maintainable software — from MERN-powered web apps to native Android applications and data-driven dashboards.
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
              My approach is simple: understand the problem deeply, architect a solid solution, and deliver pixel-perfect results with reliable communication throughout the process.
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.9, marginBottom: 40 }}>
              Available for freelance projects globally with quick turnaround. Whether you need a web app, an Android app, or data insights — I&apos;ve got you covered.
            </p>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 24px", textAlign: "center" }}
                >
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--accent)", marginBottom: 6 }}>{stat.value}</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "var(--text-secondary)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
