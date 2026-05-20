"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  { icon: "🎨", title: "Frontend", skills: ["React", "Next.js", "HTML/CSS", "Tailwind CSS", "JavaScript"] },
  { icon: "⚙️", title: "Backend", skills: ["Node.js", "Express", "Python", "Django", "REST APIs"] },
  { icon: "📱", title: "Mobile", skills: ["Android Dev", "Java", "Kotlin", "Android Studio", "API Integration"] },
  { icon: "📊", title: "Data & Analytics", skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Power BI", "Excel", "EDA"] },
  { icon: "🗄️", title: "Database & DBMS", skills: ["MySQL", "PostgreSQL", "MongoDB", "Schema Design", "Query Optimization", "ER Diagrams"] },
  { icon: "🛠️", title: "Tools & DevOps", skills: ["Git", "GitHub", "Vercel", "VS Code", "Android Studio", "Postman"] },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding" ref={ref} style={{ background: "var(--bg-surface-2)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="section-label">— Skills & Expertise</p>
          <div className="divider" style={{ margin: "0 auto 0" }} />
          <h2 className="section-heading" style={{ marginTop: 12 }}>
            Technologies I Work With
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto", fontSize: 15, lineHeight: 1.8 }}>
            A versatile skill set spanning frontend, backend, mobile, data, and database development.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>{cat.title}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
