"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          transition: "all 0.4s ease",
          background: scrolled
            ? "var(--bg-nav)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(37,99,235,0.15)" : "none",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 70,
          }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
            whileHover={{ scale: 1.05 }}
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Image 
              src="/logo.png" 
              alt="Sadik Shaikh Logo" 
              width={40} 
              height={40} 
              style={{ objectFit: "cover", height: "40px", width: "40px", borderRadius: "50%", background: "#fff" }}
              priority
              className="dark-invert"
            />
          </motion.a>

          {/* Desktop Nav */}
          <ul
            style={{
              display: "flex",
              gap: 32,
              listStyle: "none",
              alignItems: "center",
            }}
            className="hidden-mobile"
          >
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    color:
                      activeSection === href.slice(1)
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    transition: "color 0.2s",
                    position: "relative",
                    paddingBottom: 4,
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      activeSection === href.slice(1)
                        ? "var(--accent)"
                        : "var(--text-secondary)")
                  }
                >
                  {label}
                  {activeSection === href.slice(1) && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "#2563eb",
                        borderRadius: 2,
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              style={{
                background: "var(--border-subtle)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "8px 10px",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Toggle dark mode"
            >
              {mounted && (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
              className="btn-primary hidden-mobile"
              style={{ padding: "10px 22px", fontSize: 14 }}
            >
              Hire Me
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "none",
              }}
              className="show-mobile"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "var(--bg-nav)",
                borderTop: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "20px 24px 24px" }}>
                {navLinks.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); handleNav(href); }}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color:
                        activeSection === href.slice(1)
                          ? "#2563eb"
                          : "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
                  className="btn-primary"
                  style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
