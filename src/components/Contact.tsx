"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, MapPin, Mail, Clock, Globe, CheckCircle } from "lucide-react";

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

const WhatsappIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const services = [
  "Full Stack Web Development",
  "Android App Development",
  "Data Analytics & Visualization",
  "Database Design & Management",
  "Backend API Development",
  "UI/UX Implementation",
  "Other / Not Sure",
];

const budgets = ["Less than $500", "$500 – $1,000", "$1,000 – $5,000", "$5,000+"];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Listen for pre-fill events from Services section
  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>("#service-select");
    if (!select) return;
    const handler = () => setForm((f) => ({ ...f, service: select.value }));
    select.addEventListener("change", handler);
    return () => select.removeEventListener("change", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (!formspreeId || formspreeId === "YOUR_FORM_ID") {
      setError("Formspree is not configured. Please add your Form ID to .env.local");
      setSending(false);
      return;
    }

    try {
      const endpoint = formspreeId.startsWith("http")
        ? formspreeId
        : `https://formspree.io/f/${formspreeId}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding" ref={ref} style={{ background: "var(--bg-surface-2)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p className="section-label">— Get In Touch</p>
          <div className="divider" style={{ margin: "0 auto 0" }} />
          <h2 className="section-heading" style={{ marginTop: 12 }}>Let&apos;s Work Together</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", fontSize: 15, lineHeight: 1.8 }}>
            Have a project in mind? Fill out the form and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48 }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 24, padding: 36 }}
          >
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 20px" }}>
                <CheckCircle size={56} style={{ color: "#22c55e", margin: "0 auto 20px" }} />
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: "var(--text-secondary)" }}>Thank you for reaching out. I&apos;ll reply within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-primary" style={{ marginTop: 24 }}>Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input id="contact-name" name="name" type="text" required placeholder="Your name" className="form-input" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input id="contact-email" name="email" type="email" required placeholder="your@email.com" className="form-input" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label className="form-label" htmlFor="service-select">Service Needed</label>
                    <select id="service-select" name="service" required className="form-input" value={form.service} onChange={handleChange}
                      style={{ cursor: "pointer", appearance: "none" }}>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-budget">Budget Range</label>
                    <select id="contact-budget" name="budget" required className="form-input" value={form.budget} onChange={handleChange}
                      style={{ cursor: "pointer", appearance: "none" }}>
                      <option value="">Select budget</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label className="form-label" htmlFor="contact-message">Project Description</label>
                  <textarea id="contact-message" name="message" required rows={5} placeholder="Tell me about your project..." className="form-input" value={form.message} onChange={handleChange} style={{ resize: "vertical", minHeight: 120 }} />
                </div>

                {error && <p style={{ color: "#f87171", fontSize: 14, marginBottom: 12 }}>{error}</p>}

                <button id="contact-submit" type="submit" className="btn-primary" disabled={sending}
                  style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1, fontSize: 15, padding: "15px" }}>
                  {sending ? "Sending…" : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {[
              { icon: <MapPin size={20} />, label: "Location", value: "Pune, Maharashtra, India" },
              { icon: <Mail size={20} />, label: "Email", value: "sadiks2712@gmail.com", href: "mailto:sadiks2712@gmail.com" },
              { icon: <WhatsappIcon size={20} />, label: "WhatsApp", value: "+91 8177900698", href: "https://wa.me/918177900698" },
              { icon: <Clock size={20} />, label: "Response Time", value: "Within 24 hours" },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)", textDecoration: "none" }}>{item.value}</a>
                    : <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>{item.value}</div>}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 16 }}>Find Me Online</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: <GithubIcon />, label: "GitHub", href: "https://github.com/sadiks2712", handle: "sadiks2712" },
                  { icon: <LinkedinIcon />, label: "LinkedIn", href: "https://linkedin.com/in/sadik-shaikh-8587b7346", handle: "sadik-shaikh" },
                  { icon: <Globe size={18} />, label: "Vercel", href: "https://vercel.com/sadiks2712s-projects", handle: "sadiks2712" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.14)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.4)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.15)"; }}
                  >
                    <span style={{ color: "#2563eb" }}>{s.icon}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{s.label}</span>
                    <span style={{ marginLeft: "auto", fontFamily: "'Sora',sans-serif", fontSize: 12, color: "var(--text-secondary)" }}>{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
