"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const services = [
  { icon: "🌐", title: "Full Stack Web Development", desc: "End-to-end web apps using MERN, Next.js & Django with clean architecture and scalable code.", price: "From $500", id: "Full Stack Web Development" },
  { icon: "📱", title: "Android App Development", desc: "Native Android apps in Java/Kotlin with REST API integration, local databases, and polished UX.", price: "From $400", id: "Android App Development" },
  { icon: "📊", title: "Data Analytics & Visualization", desc: "Data cleaning, EDA, and interactive dashboards using Python & Power BI for business insights.", price: "From $300", id: "Data Analytics & Visualization" },
  { icon: "🗄️", title: "Database Design & Management", desc: "Schema design, query optimization, and administration across MySQL, PostgreSQL & MongoDB.", price: "From $250", id: "Database Design & Management" },
  { icon: "⚙️", title: "Backend API Development", desc: "Scalable, well-documented REST APIs using Node.js/Express or Django with JWT auth.", price: "From $350", id: "Backend API Development" },
  { icon: "🎨", title: "UI/UX Implementation", desc: "Clean, pixel-perfect, fully responsive interfaces with React & Tailwind CSS.", price: "From $200", id: "UI/UX Implementation" },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleQuote = (serviceId: string) => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const select = document.querySelector<HTMLSelectElement>("#service-select");
        if (select) {
          select.value = serviceId;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 800);
    }
  };

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="section-label">— What I Offer</p>
          <div className="divider" style={{ margin: "0 auto 0" }} />
          <h2 className="section-heading" style={{ marginTop: 12 }}>Services & Expertise</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto", fontSize: 15, lineHeight: 1.8 }}>
            From concept to deployment — I handle every layer of your product with quality and speed.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 30, display: "flex", flexDirection: "column", transition: "all 0.3s ease", cursor: "default", position: "relative", overflow: "hidden" }}
              whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(0,0,0,0.3), 0 0 30px rgba(37,99,235,0.1)" }}
            >
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #2563eb, transparent)" }} />

              <div style={{ fontSize: 36, marginBottom: 16 }}>{svc.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.3 }}>{svc.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{svc.desc}</p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 20, borderTop: "1px solid rgba(37,99,235,0.15)" }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 700, color: "#2563eb" }}>{svc.price}</span>
                <button
                  id={`quote-${svc.id.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => handleQuote(svc.id)}
                  className="btn-primary"
                  style={{ padding: "9px 18px", fontSize: 13 }}
                >
                  Get a Quote <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
