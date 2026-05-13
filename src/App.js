import { useState, useEffect } from "react";

const PALETTE = {
  cream: "#FAF8F3",
  white: "#FFFFFF",
  gold: "#B8976A",
  goldLight: "#D4BFA0",
  goldDark: "#8C6E48",
  charcoal: "#1E1E1E",
  charcoalMid: "#3A3A3A",
  muted: "#7A7468",
  border: "#E5DDD0",
  borderLight: "#F0EAE0",
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${PALETTE.cream}; color: ${PALETTE.charcoal}; }
  ::selection { background: ${PALETTE.goldLight}; color: ${PALETTE.charcoalMid}; }

  .ibz-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.25rem 3rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.5s ease; }
  .ibz-nav.scrolled { background: rgba(250,248,243,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid ${PALETTE.border}; padding: 0.875rem 3rem; }
  .ibz-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .ibz-nav-links a { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; color: ${PALETTE.charcoalMid}; transition: color 0.3s; }
  .ibz-nav-links a:hover { color: ${PALETTE.gold}; }
  .ibz-nav-logo { font-family: 'Playfair Display', serif; font-size: 1.1rem; letter-spacing: 0.08em; color: ${PALETTE.charcoal}; font-style: italic; }

  .ibz-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; background: ${PALETTE.cream}; padding: 6rem 2rem 4rem; }
  .ibz-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 60%, rgba(184,151,106,0.07) 0%, transparent 60%), radial-gradient(ellipse at 75% 20%, rgba(184,151,106,0.05) 0%, transparent 50%); pointer-events: none; }
  .ibz-hero-photo { width: min(520px, 90vw); height: min(680px, 80vh); object-fit: cover; background: ${PALETTE.borderLight}; position: relative; overflow: hidden; filter: sepia(8%) brightness(1.02); }
  .ibz-hero-photo-inner { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: ${PALETTE.muted}; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; border: 1px solid ${PALETTE.border}; }
  .ibz-hero-content { text-align: center; margin-top: 3.5rem; }
  .ibz-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: ${PALETTE.gold}; margin-bottom: 1.25rem; }
  .ibz-names { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 400; line-height: 1.05; color: ${PALETTE.charcoal}; letter-spacing: -0.01em; }
  .ibz-names em { font-style: italic; color: ${PALETTE.goldDark}; }
  .ibz-ampersand { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 4rem); font-style: italic; font-weight: 300; color: ${PALETTE.goldLight}; display: block; line-height: 1; margin: 0.25rem 0; }
  .ibz-date-line { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 300; letter-spacing: 0.12em; color: ${PALETTE.muted}; margin-top: 1.5rem; }
  .ibz-hashtag { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: ${PALETTE.gold}; margin-top: 0.75rem; letter-spacing: 0.04em; }
  .ibz-divider { display: flex; align-items: center; gap: 1.25rem; margin: 3.5rem auto; max-width: 260px; }
  .ibz-divider-line { flex: 1; height: 1px; background: ${PALETTE.border}; }
  .ibz-divider-ornament { width: 6px; height: 6px; border: 1px solid ${PALETTE.gold}; transform: rotate(45deg); flex-shrink: 0; }

  .ibz-section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
  .ibz-section-label { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: ${PALETTE.gold}; margin-bottom: 1rem; }
  .ibz-section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 400; color: ${PALETTE.charcoal}; line-height: 1.15; margin-bottom: 0.5rem; }
  .ibz-section-title em { font-style: italic; }
  .ibz-body { font-family: 'DM Sans', sans-serif; font-size: 1.0rem; font-weight: 300; color: ${PALETTE.muted}; line-height: 1.9; max-width: 580px; }
  .ibz-rule { width: 100%; height: 1px; background: ${PALETTE.border}; margin: 0; }

  .ibz-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .ibz-story-photo { aspect-ratio: 3/4; background: ${PALETTE.borderLight}; border: 1px solid ${PALETTE.border}; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0.75rem; color: ${PALETTE.muted}; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; filter: sepia(6%); }
  .ibz-pull-quote { font-family: 'Cormorant Garamond', serif; font-size: 1.65rem; font-style: italic; font-weight: 300; color: ${PALETTE.charcoalMid}; line-height: 1.5; border-left: 2px solid ${PALETTE.gold}; padding-left: 1.75rem; margin: 2.5rem 0; }

  .ibz-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; }
  .ibz-detail-card { border: 1px solid ${PALETTE.border}; padding: 2.5rem; background: ${PALETTE.white}; position: relative; }
  .ibz-detail-card::before { content: ''; position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; border: 1px solid ${PALETTE.borderLight}; z-index: -1; }
  .ibz-detail-type { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: ${PALETTE.gold}; margin-bottom: 1rem; }
  .ibz-detail-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 400; color: ${PALETTE.charcoal}; margin-bottom: 1.25rem; }
  .ibz-detail-info { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 300; color: ${PALETTE.muted}; line-height: 2; }
  .ibz-detail-info strong { font-weight: 500; color: ${PALETTE.charcoalMid}; display: block; }

  .ibz-rsvp-wrap { background: ${PALETTE.white}; border: 1px solid ${PALETTE.border}; padding: 3.5rem; max-width: 700px; margin: 3rem auto 0; }
  .ibz-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
  .ibz-form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .ibz-label { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${PALETTE.muted}; }
  .ibz-input { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; color: ${PALETTE.charcoal}; border: none; border-bottom: 1px solid ${PALETTE.border}; background: transparent; padding: 0.6rem 0; outline: none; transition: border-color 0.3s; width: 100%; }
  .ibz-input:focus { border-bottom-color: ${PALETTE.gold}; }
  .ibz-select { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; color: ${PALETTE.charcoal}; border: none; border-bottom: 1px solid ${PALETTE.border}; background: transparent; padding: 0.6rem 0; outline: none; width: 100%; cursor: pointer; appearance: none; -webkit-appearance: none; }
  .ibz-textarea { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; color: ${PALETTE.charcoal}; border: 1px solid ${PALETTE.border}; background: transparent; padding: 0.75rem 1rem; outline: none; resize: vertical; width: 100%; min-height: 100px; transition: border-color 0.3s; margin-bottom: 1.5rem; }
  .ibz-textarea:focus { border-color: ${PALETTE.gold}; }
  .ibz-btn { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; color: ${PALETTE.white}; background: ${PALETTE.charcoal}; border: none; padding: 1rem 3rem; cursor: pointer; transition: background 0.3s; width: 100%; }
  .ibz-btn:hover { background: ${PALETTE.goldDark}; }
  .ibz-rsvp-deadline { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; color: ${PALETTE.muted}; text-align: center; margin-top: 1.25rem; }

  .ibz-travel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
  .ibz-travel-card { padding: 2rem 1.75rem; border-top: 2px solid ${PALETTE.gold}; background: ${PALETTE.white}; }
  .ibz-travel-icon { font-size: 1.5rem; margin-bottom: 1rem; }
  .ibz-travel-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 400; color: ${PALETTE.charcoal}; margin-bottom: 0.5rem; }
  .ibz-travel-detail { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 300; color: ${PALETTE.muted}; line-height: 1.75; }
  .ibz-travel-link { display: inline-block; margin-top: 0.75rem; font-family: 'DM Sans', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${PALETTE.gold}; text-decoration: none; border-bottom: 1px solid ${PALETTE.goldLight}; padding-bottom: 2px; transition: color 0.3s, border-color 0.3s; }
  .ibz-travel-link:hover { color: ${PALETTE.goldDark}; border-color: ${PALETTE.goldDark}; }

  .ibz-registry-intro { text-align: center; margin-bottom: 3.5rem; }
  .ibz-registry-intro .ibz-body { margin: 0 auto; text-align: center; }
  .ibz-registry-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .ibz-registry-card { border: 1px solid ${PALETTE.border}; padding: 2.25rem 1.75rem; background: ${PALETTE.white}; cursor: pointer; transition: all 0.35s; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  .ibz-registry-card:hover { border-color: ${PALETTE.gold}; background: ${PALETTE.cream}; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(184,151,106,0.12); }
  .ibz-registry-symbol { width: 52px; height: 52px; border: 1px solid ${PALETTE.border}; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
  .ibz-registry-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 400; color: ${PALETTE.charcoal}; }
  .ibz-registry-desc { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 300; color: ${PALETTE.muted}; line-height: 1.7; }
  .ibz-registry-cta { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${PALETTE.gold}; margin-top: auto; }

  .ibz-social-wrap { background: ${PALETTE.charcoal}; padding: 6rem 2rem; text-align: center; }
  .ibz-social-inner { max-width: 860px; margin: 0 auto; }
  .ibz-social-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: ${PALETTE.goldLight}; margin-bottom: 1rem; }
  .ibz-social-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 4rem); font-weight: 400; font-style: italic; color: ${PALETTE.white}; margin-bottom: 1rem; }
  .ibz-social-hashtag { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; color: ${PALETTE.goldLight}; letter-spacing: 0.06em; margin-bottom: 2.5rem; }
  .ibz-video-frame { width: 100%; aspect-ratio: 16/9; background: #111; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; }
  .ibz-video-play { width: 64px; height: 64px; border: 1.5px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .ibz-video-label { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
  .ibz-social-note { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.8; }
  .ibz-social-note code { font-family: inherit; color: ${PALETTE.goldLight}; }
  .ibz-social-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-top: 2.5rem; }
  .ibz-social-cell { aspect-ratio: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; }
  .ibz-social-cell-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.2); }

  .ibz-footer { padding: 3.5rem 2rem; background: ${PALETTE.cream}; border-top: 1px solid ${PALETTE.border}; text-align: center; }
  .ibz-footer-names { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-style: italic; color: ${PALETTE.charcoal}; margin-bottom: 0.5rem; }
  .ibz-footer-date { font-family: 'DM Sans', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: ${PALETTE.muted}; margin-bottom: 0.5rem; }
  .ibz-footer-tag { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; color: ${PALETTE.gold}; }

  @media (max-width: 768px) {
    .ibz-nav { padding: 1rem 1.25rem; }
    .ibz-nav.scrolled { padding: 0.75rem 1.25rem; }
    .ibz-nav-links { display: none; }
    .ibz-story-grid, .ibz-details-grid, .ibz-travel-grid, .ibz-registry-grid, .ibz-social-grid { grid-template-columns: 1fr; }
    .ibz-registry-grid { grid-template-columns: 1fr 1fr; }
    .ibz-form-row { grid-template-columns: 1fr; }
    .ibz-rsvp-wrap { padding: 2rem 1.25rem; }
    .ibz-section { padding: 4rem 1.25rem; }
    .ibz-social-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

function Divider() {
  return (
    <div className="ibz-divider">
      <div className="ibz-divider-line" />
      <div className="ibz-divider-ornament" />
      <div className="ibz-divider-line" />
    </div>
  );
}

function PhotoPlaceholder({ label, caption, aspect, style = {} }) {
  return (
    <div
      style={{
        aspectRatio: aspect || "3/4",
        background: PALETTE.borderLight,
        border: `1px solid ${PALETTE.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "0.75rem",
        filter: "sepia(5%) brightness(1.02)",
        ...style,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PALETTE.border} strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: PALETTE.muted, textAlign: "center", padding: "0 1rem" }}>
        {label}
      </span>
      {caption && (
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", fontStyle: "italic", color: PALETTE.goldLight, textAlign: "center", padding: "0 1rem" }}>
          {caption}
        </span>
      )}
    </div>
  );
}

function PasswordGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (code.trim().toUpperCase() === "FIB27") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <>
      <style>{FONTS}</style>
      <div style={{ minHeight: "100vh", background: PALETTE.cream, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "2rem" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: PALETTE.charcoal, marginBottom: "0.5rem", textAlign: "center" }}>
          Tochukwu <span style={{ fontStyle: "italic", color: PALETTE.gold }}>&</span> Kasi
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, color: PALETTE.muted, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          This page is private
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontStyle: "italic", color: PALETTE.gold, marginBottom: "2.5rem" }}>
          #TheIbezimakos
        </p>
        <div style={{ width: "min(420px, 90vw)", border: `1px solid ${PALETTE.border}`, background: PALETTE.white, padding: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: PALETTE.muted, marginBottom: "1.5rem", textAlign: "center" }}>
            Enter your invitation code
          </p>
          <input
            type="text"
            placeholder="Your code here..."
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 300, border: "none", borderBottom: `1px solid ${error ? "#c0392b" : PALETTE.border}`, background: "transparent", padding: "0.6rem 0", outline: "none", textAlign: "center", letterSpacing: "0.2em", marginBottom: "1.5rem", color: PALETTE.charcoal }}
          />
          {error && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "#c0392b", textAlign: "center", marginBottom: "1rem" }}>
              Incorrect code — please try again
            </p>
          )}
          <button
            onClick={handleSubmit}
            style={{ width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500, color: PALETTE.white, background: PALETTE.charcoal, border: "none", padding: "1rem", cursor: "pointer" }}
          >
            Enter
          </button>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: PALETTE.goldLight, marginTop: "2rem" }}>
          Code can be found on your invitation
        </p>
      </div>
    </>
  );
}

export default function WeddingWebsite() {
  const [unlocked, setUnlocked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", partner: "", guests: "2", attending: "yes", meal: "", dietary: "", notes: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const handleRsvp = () => {
    if (formData.name.trim()) {
      setRsvpSubmitted(true);
    }
  };

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "The Details", href: "#details" },
    { label: "RSVP", href: "#rsvp" },
    { label: "Travel", href: "#travel" },
    { label: "Gifts", href: "#gifts" },
    { label: "#TheIbezimakos", href: "#social" },
  ];

  const registryCards = [
    { symbol: "🏠", title: "Our First Home", desc: "Help us build the foundation of our life together — from artwork to furniture that will fill our home with love.", cta: "Contribute →", href: "#" },
    { symbol: "✈️", title: "Honeymoon Escapes", desc: "Send us on an unforgettable first adventure as a married couple. Every contribution counts.", cta: "Fund a moment →", href: "#" },
    { symbol: "🍽️", title: "Anniversary Dinners", desc: "Pre-fund our first dozen anniversary dinner dates — the memories we'll make year after year.", cta: "Book us a table →", href: "#" },
    { symbol: "🛁", title: "Home Luxuries", desc: "Elevate our everyday rituals with beautiful linens, cookware, and the details that make a house a home.", cta: "Shop registry →", href: "#" },
    { symbol: "📚", title: "Our Library", desc: "Books, subscriptions, and art — for the couple who loves to keep growing together.", cta: "Add to our shelf →", href: "#" },
    { symbol: "💛", title: "Open Gift", desc: "No preference? Give what feels right. We are grateful for your love and presence above all.", cta: "Give freely →", href: "#" },
  ];

  const hotels = [
    { name: "The Grand Palais Hotel", detail: "Preferred partner · 10% guest discount\n5 min from venue · Valet parking\nBook with code IBEZIMAKO25", link: "Reserve your room", href: "#" },
    { name: "The Ardmore Suites", detail: "Boutique luxury · 0.3 miles away\nSuites & connecting rooms available\nIdeal for families & long stays", link: "View availability", href: "#" },
    { name: "The Meridian", detail: "Contemporary & chic · 0.8 miles\nLively bar & rooftop lounge\nAsk about the wedding block rate", link: "Check rates", href: "#" },
  ];

  return (
    <>
      <style>{FONTS}</style>
      <style>{globalStyles}</style>

      {/* ── NAVIGATION ── */}
      <nav className={`ibz-nav ${scrolled ? "scrolled" : ""}`}>
        <span className="ibz-nav-logo">T & K</span>
        <ul className="ibz-nav-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="ibz-hero">
        <div className="ibz-hero-bg" />
        <PhotoPlaceholder
          label="Your hero portrait · replace with /images/hero.jpg"
          caption="Long-sleeved v-neck gown · editorial detail shot"
          style={{ width: "min(520px, 90vw)", height: "min(680px, 80vh)", aspectRatio: "unset" }}
        />

        <div className="ibz-hero-content">
          <p className="ibz-eyebrow">We are getting married</p>
          <h1 className="ibz-names">
            Tochukwu
            <span className="ibz-ampersand">&</span>
            Kasi
          </h1>
          <p className="ibz-date-line">Saturday, the Fourteenth of June · Two Thousand and Twenty-Five</p>
          <p className="ibz-hashtag">#TheIbezimakos</p>
        </div>

        <Divider />

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: PALETTE.muted, letterSpacing: "0.06em" }}>
          Lagos · London · Forever
        </p>
      </section>

      <div className="ibz-rule" />

      {/* ── OUR STORY ── */}
      <section className="ibz-section" id="story">
        <div className="ibz-story-grid">
          <div>
            <p className="ibz-section-label">Our Story</p>
            <h2 className="ibz-section-title">
              Two lives,<br />
              <em>one beautiful collision</em>
            </h2>
            <Divider />
            <p className="ibz-body">
              It started with a chance encounter neither of us planned for — and neither of us could ignore.
              Across continents, through residency shifts and red-eye flights, through laughter that echoed
              in tiny apartments and across oceans, we found in each other something neither of us knew we
              were looking for.
            </p>
            <blockquote className="ibz-pull-quote">
              "He showed up exactly when I'd stopped expecting anyone to."
            </blockquote>
            <p className="ibz-body">
              Now, we stand at the beginning of everything — our first home, our shared name,
              our story told together. We are so grateful you'll be there to witness it.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <PhotoPlaceholder
              label="Photo 1 · early days portrait"
              caption="Replace with /images/story-01.jpg"
              aspect="4/3"
            />
            <PhotoPlaceholder
              label="Photo 2 · proposal / milestone"
              caption="Replace with /images/story-02.jpg"
              aspect="4/3"
            />
          </div>
        </div>
      </section>

      <div className="ibz-rule" />

      {/* ── THE DETAILS ── */}
      <section className="ibz-section" id="details" style={{ textAlign: "center" }}>
        <p className="ibz-section-label">The Details</p>
        <h2 className="ibz-section-title">
          <em>Join us</em> for the celebration
        </h2>

        <div className="ibz-details-grid" style={{ textAlign: "left" }}>
          <div className="ibz-detail-card">
            <p className="ibz-detail-type">Ceremony</p>
            <h3 className="ibz-detail-title">The Exchange of Vows</h3>
            <div className="ibz-detail-info">
              <strong>Date & Time</strong>
              Saturday, 14th June 2025 · 2:00 PM
              <strong style={{ marginTop: "1rem" }}>Venue</strong>
              [Ceremony Venue Name]<br />
              [Full Address Line 1]<br />
              [City, State · ZIP]
              <strong style={{ marginTop: "1rem" }}>Attire</strong>
              Black Tie Optional · Celebratory & festive
              <strong style={{ marginTop: "1rem" }}>Parking</strong>
              Complimentary valet available on site
            </div>
          </div>

          <div className="ibz-detail-card">
            <p className="ibz-detail-type">Reception</p>
            <h3 className="ibz-detail-title">The Celebration Dinner</h3>
            <div className="ibz-detail-info">
              <strong>Time</strong>
              Cocktail Hour · 4:30 PM<br />
              Dinner & Dancing · 6:00 PM
              <strong style={{ marginTop: "1rem" }}>Venue</strong>
              [Reception Venue Name]<br />
              [Full Address Line 1]<br />
              [City, State · ZIP]
              <strong style={{ marginTop: "1rem" }}>Note</strong>
              An Afrobeats & R&B dance floor awaits you.<br />
              Come ready to celebrate.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <PhotoPlaceholder
            label="Venue or detail shot · replace with /images/venue.jpg"
            caption="Dress detail — long sleeves · v-neckline · back ruffles"
            aspect="21/9"
            style={{ maxWidth: "100%", aspectRatio: "21/9" }}
          />
        </div>
      </section>

      <div className="ibz-rule" />

      {/* ── RSVP ── */}
      <section className="ibz-section" id="rsvp" style={{ textAlign: "center" }}>
        <p className="ibz-section-label">RSVP</p>
        <h2 className="ibz-section-title"><em>Will you join us?</em></h2>
        <p className="ibz-body" style={{ margin: "0.75rem auto 0" }}>
          Kindly respond by 1st May 2025. We cannot wait to celebrate with you.
        </p>

        <div className="ibz-rsvp-wrap">
          {rsvpSubmitted ? (
            <div style={{ padding: "2rem 0", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontStyle: "italic", color: PALETTE.charcoal, marginBottom: "1rem" }}>
                We'll see you there 🥂
              </div>
              <p className="ibz-body" style={{ margin: "0 auto", textAlign: "center" }}>
                Thank you, {formData.name}. Your RSVP has been received.<br />
                Check your inbox for a confirmation note from us.
              </p>
              <div style={{ marginTop: "2rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontStyle: "italic", color: PALETTE.gold }}>
                #TheIbezimakos
              </div>
            </div>
          ) : (
            <>
              <div className="ibz-form-row">
                <div className="ibz-form-group">
                  <label className="ibz-label">Your Full Name</label>
                  <input className="ibz-input" type="text" placeholder="First & Last name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="ibz-form-group">
                  <label className="ibz-label">Guest / Partner Name</label>
                  <input className="ibz-input" type="text" placeholder="If bringing a guest" value={formData.partner} onChange={e => setFormData({ ...formData, partner: e.target.value })} />
                </div>
              </div>

              <div className="ibz-form-row">
                <div className="ibz-form-group">
                  <label className="ibz-label">Number of Guests</label>
                  <select className="ibz-select" value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
                    <option value="1">1 — Just me</option>
                    <option value="2">2 — Plus one</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
                <div className="ibz-form-group">
                  <label className="ibz-label">Will you attend?</label>
                  <select className="ibz-select" value={formData.attending} onChange={e => setFormData({ ...formData, attending: e.target.value })}>
                    <option value="yes">Joyfully accepts</option>
                    <option value="no">Regretfully declines</option>
                  </select>
                </div>
              </div>

              <div className="ibz-form-row">
                <div className="ibz-form-group">
                  <label className="ibz-label">Meal Preference</label>
                  <select className="ibz-select" value={formData.meal} onChange={e => setFormData({ ...formData, meal: e.target.value })}>
                    <option value="">Select preference</option>
                    <option value="chicken">Herb-roasted Chicken</option>
                    <option value="fish">Pan-seared Salmon</option>
                    <option value="veg">Roasted Vegetable Wellington</option>
                  </select>
                </div>
                <div className="ibz-form-group">
                  <label className="ibz-label">Dietary Requirements</label>
                  <input className="ibz-input" type="text" placeholder="Allergies, restrictions..." value={formData.dietary} onChange={e => setFormData({ ...formData, dietary: e.target.value })} />
                </div>
              </div>

              <div className="ibz-form-group" style={{ marginBottom: "1.5rem" }}>
                <label className="ibz-label">A note for us (optional)</label>
                <textarea className="ibz-textarea" placeholder="Share a well-wish, a memory, or a song request..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
              </div>

              <button className="ibz-btn" onClick={handleRsvp}>
                Send my RSVP
              </button>
              <p className="ibz-rsvp-deadline">Kindly respond by May 1st, 2025</p>
            </>
          )}
        </div>
      </section>

      <div className="ibz-rule" />

      {/* ── TRAVEL & STAY ── */}
      <section className="ibz-section" id="travel">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p className="ibz-section-label">Travel & Stay</p>
            <h2 className="ibz-section-title">
              Getting<br /><em>here</em>
            </h2>
            <p className="ibz-body" style={{ marginTop: "1.5rem" }}>
              Whether you're driving in from across town or flying in from abroad,
              we want your journey to be as seamless as the celebration itself.
              Below you'll find our curated recommendations for accommodation and travel.
            </p>
            <div style={{ marginTop: "2rem", padding: "1.5rem", border: `1px solid ${PALETTE.border}`, background: PALETTE.white }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: PALETTE.gold, marginBottom: "0.75rem" }}>Nearest Airports</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: PALETTE.muted, lineHeight: 2 }}>
                [Airport Name 1] · 25 min<br />
                [Airport Name 2] · 45 min<br />
                Rideshare & car rental available
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "2.5rem" }}>
            {hotels.map((h) => (
              <div key={h.name} className="ibz-travel-card">
                <p className="ibz-travel-name">{h.name}</p>
                <p className="ibz-travel-detail" style={{ whiteSpace: "pre-line" }}>{h.detail}</p>
                <a href={h.href} className="ibz-travel-link">{h.link}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ibz-rule" />

      {/* ── GIFTS & REGISTRY ── */}
      <section className="ibz-section" id="gifts">
        <div className="ibz-registry-intro">
          <p className="ibz-section-label">New Beginnings</p>
          <h2 className="ibz-section-title" style={{ textAlign: "center" }}>
            <em>Gifts & Registry</em>
          </h2>
          <Divider />
          <p className="ibz-body">
            Your presence at our celebration is the greatest gift of all. But if you'd like to
            contribute to our new chapter, we've put together a few ways to be part of the
            beautiful life we're building together.
          </p>
        </div>

        <div className="ibz-registry-grid">
          {registryCards.map((card) => (
            <a key={card.title} href={card.href} className="ibz-registry-card">
              <div className="ibz-registry-symbol">{card.symbol}</div>
              <p className="ibz-registry-title">{card.title}</p>
              <p className="ibz-registry-desc">{card.desc}</p>
              <span className="ibz-registry-cta">{card.cta}</span>
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontStyle: "italic", color: PALETTE.muted, textAlign: "center", marginTop: "2.5rem" }}>
          No box is required. Your love and presence mean the world to us.
        </p>
      </section>

      {/* ── SOCIAL HUB ── */}
      <section className="ibz-social-wrap" id="social">
        <div className="ibz-social-inner">
          <p className="ibz-social-eyebrow">Follow our journey</p>
          <h2 className="ibz-social-title">Our Story, Unfiltered</h2>
          <p className="ibz-social-hashtag">#TheIbezimakos</p>

          <div className="ibz-video-frame">
            <div className="ibz-video-play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <p className="ibz-video-label">Our Save the Date Vlog · Replace with YouTube or TikTok embed</p>
          </div>

          <div className="ibz-social-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="ibz-social-cell">
                <span className="ibz-social-cell-label">
                  {i === 1 ? "Photo" : i === 2 ? "Video" : i === 3 ? "Reel" : i === 5 ? "Vlog" : "#"}
                </span>
              </div>
            ))}
          </div>

          <p className="ibz-social-note" style={{ marginTop: "2.5rem" }}>
            Share your photos & videos with the tag{" "}
            <code>#TheIbezimakos</code>{" "}
            and they may appear right here on our wedding website.
            <br />
            Follow us on Instagram & TikTok{" "}
            <code>@[yourhandle]</code>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ibz-footer">
        <p className="ibz-footer-names">Tochukwu & Kasi Ibezimako</p>
        <p className="ibz-footer-date">14 · June · 2025</p>
        <p className="ibz-footer-tag">#TheIbezimakos</p>
      </footer>
    </>
  );
}