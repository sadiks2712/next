"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const allProjects = [
  { id: 1, name: "Agrivision", desc: "A comprehensive agricultural platform leveraging Next.js", tags: ["Next.js", "React", "Tailwind CSS"], categories: ["Web Apps"], gradient: "linear-gradient(135deg,#1e3a8a,#1d4ed8)", icon: "🌱", link: "https://agrivision-sadiks2712s-projects.vercel.app" },
  { id: 2, name: "Bloodlink AI", desc: "AI-powered blood donation management system", tags: ["Next.js", "AI", "Tailwind"], categories: ["Web Apps", "Data Analytics"], gradient: "linear-gradient(135deg,#7f1d1d,#b91c1c)", icon: "🩸", link: "https://bloodlink-ai-black.vercel.app" },
  { id: 3, name: "AI Master Hub", desc: "Centralized hub for AI mastery and resources", tags: ["React", "AI", "Frontend"], categories: ["Web Apps", "Open Source"], gradient: "linear-gradient(135deg,#3b1f5e,#5b21b6)", icon: "🤖", link: "https://ai-master-hub.vercel.app" },
  { id: 4, name: "DB Assistant", desc: "Interactive database query and management tool", tags: ["Database", "Next.js", "Tools"], categories: ["APIs/Backend", "Data Analytics"], gradient: "linear-gradient(135deg,#1a3a1a,#166534)", icon: "🗄️", link: "https://dbasistant.vercel.app" },
  { id: 5, name: "Docto Analy AI", desc: "Medical document analysis and insights generator", tags: ["AI", "HealthTech", "Next.js"], categories: ["Web Apps", "Data Analytics"], gradient: "linear-gradient(135deg,#1e3a5f,#0369a1)", icon: "🩺", link: "https://docto-analy-ai.vercel.app" },
  { id: 6, name: "Sahara Fabrication", desc: "Professional business website for a fabrication company", tags: ["React", "Tailwind", "Business"], categories: ["Client Projects", "UI/UX"], gradient: "linear-gradient(135deg,#2d1b4e,#6d28d9)", icon: "🏗️", link: "https://sahara-fabrication.vercel.app" },
  { id: 7, name: "Smart Community", desc: "Community management system for efficient society operations", tags: ["Next.js", "React", "Firebase"], categories: ["Web Apps", "Client Projects"], gradient: "linear-gradient(135deg,#0d9488,#115e59)", icon: "🏙️", link: "https://nextgencoders123.vercel.app" },
  { id: 8, name: "Personal Portfolio", desc: "A creative digital portfolio showcasing my past work", tags: ["React", "Next.js", "Tailwind"], categories: ["Web Apps"], gradient: "linear-gradient(135deg,#1a2a1a,#15803d)", icon: "💻", link: "https://sadikshaikh.vercel.app" },
];

const tabs = ["All", "Web Apps", "Data Analytics", "APIs/Backend", "UI/UX", "Open Source", "Client Projects"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.categories.includes(active));

  return (
    <section id="projects" className="section-padding" ref={ref} style={{ background: "var(--bg-surface-2)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <p className="section-label">— Portfolio</p>
          <div className="divider" style={{ margin: "0 auto 0" }} />
          <h2 className="section-heading" style={{ marginTop: 12 }}>My Work</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", fontSize: 15, lineHeight: 1.8 }}>
            A selection of my recent live projects encompassing web apps, AI integration, and data management.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`filter-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActive(tab)}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: 13,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: active === tab ? "var(--accent)" : "transparent",
                borderColor: active === tab ? "var(--accent)" : "var(--border)",
                color: active === tab ? "#fff" : "var(--text-secondary)",
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}
                whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(0,0,0,0.1), 0 0 30px var(--accent-glow)" }}
              >
                {/* Thumbnail */}
                <div style={{ height: 160, background: proj.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
                  <span style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}>{proj.icon}</span>
                </div>

                <div style={{ padding: 22 }}>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{proj.name}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{proj.desc}</p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {proj.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer"
                      className="btn-primary" style={{ padding: "7px 14px", fontSize: 12 }}>
                      <ExternalLink size={12} /> Live Demo
                    </a>
                    <a href="https://github.com/sadiks2712" target="_blank" rel="noopener noreferrer"
                      className="btn-outline" style={{ padding: "7px 14px", fontSize: 12, color: "var(--text-primary)", borderColor: "var(--border)" }}>
                      <GithubIcon size={12} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
