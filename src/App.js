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
  body { background: #FAF8F3; color: #1E1E1E; }
  ::selection { background: #D4BFA0; color: #3A3A3A; }

  .ibz-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.25rem 3rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.5s ease; }
  .ibz-nav.scrolled { background: rgba(250,248,243,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid #E5DDD0; padding: 0.875rem 3rem; }
  .ibz-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .ibz-nav-links a { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; color: #3A3A3A; transition: color 0.3s; }
  .ibz-nav-links a:hover { color: #B8976A; }
  .ibz-nav-logo { font-family: 'Playfair Display', serif; font-size: 1.1rem; letter-spacing: 0.08em; color: #1E1E1E; font-style: italic; }

  .ibz-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; background: #FAF8F3; padding: 6rem 2rem 4rem; }
  .ibz-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 60%, rgba(184,151,106,0.07) 0%, transparent 60%), radial-gradient(ellipse at 75% 20%, rgba(184,151,106,0.05) 0%, transparent 50%); pointer-events: none; }
  .ibz-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: #B8976A; margin-bottom: 1.25rem; }
  .ibz-names { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 400; line-height: 1.05; color: #1E1E1E; letter-spacing: -0.01em; }
  .ibz-ampersand { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 4rem); font-style: italic; font-weight: 300; color: #D4BFA0; display: block; line-height: 1; margin: 0.25rem 0; }
  .ibz-date-line { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 300; letter-spacing: 0.12em; color: #7A7468; margin-top: 1.5rem; }
  .ibz-hashtag { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: #B8976A; margin-top: 0.75rem; letter-spacing: 0.04em; }
  .ibz-divider { display: flex; align-items: center; gap: 1.25rem; margin: 3.5rem auto; max-width: 260px; }
  .ibz-divider-line { flex: 1; height: 1px; background: #E5DDD0; }
  .ibz-divider-ornament { width: 6px; height: 6px; border: 1px solid #B8976A; transform: rotate(45deg); flex-shrink: 0; }

  .ibz-section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
  .ibz-section-label { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: #B8976A; margin-bottom: 1rem; }
  .ibz-section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 400; color: #1E1E1E; line-height: 1.15; margin-bottom: 0.5rem; }
  .ibz-section-title em { font-style: italic; }
  .ibz-body { font-family: 'DM Sans', sans-serif; font-size: 1.0rem; font-weight: 300; color: #7A7468; line-height: 1.9; max-width: 580px; }
  .ibz-rule { width: 100%; height: 1px; background: #E5DDD0; margin: 0; }

  .ibz-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .ibz-pull-quote { font-family: 'Cormorant Garamond', serif; font-size: 1.65rem; font-style: italic; font-weight: 300; color: #3A3A3A; line-height: 1.5; border-left: 2px solid #B8976A; padding-left: 1.75rem; margin: 2.5rem 0; }

  .ibz-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; }
  .ibz-detail-card { border: 1px solid #E5DDD0; padding: 2.5rem; background: #FFFFFF; position: relative; }
  .ibz-detail-card::before { content: ''; position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; border: 1px solid #F0EAE0; z-index: -1; }
  .ibz-detail-type { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: #B8976A; margin-bottom: 1rem; }
  .ibz-detail-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 400; color: #1E1E1E; margin-bottom: 1.25rem; }
  .ibz-detail-info { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 300; color: #7A7468; line-height: 2; }
  .ibz-detail-info strong { font-weight: 500; color: #3A3A3A; display: block; }

  .ibz-rsvp-wrap { background: #FFFFFF; border: 1px solid #E5DDD0; padding: 3.5rem; max-width: 700px; margin: 3rem auto 0; }
  .ibz-form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
  .ibz-label { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: #7A7468; }
  .ibz-input { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; color: #1E1E1E; border: none; border-bottom: 1px solid #E5DDD0; background: transparent; padding: 0.6rem 0; outline: none; transition: border-color 0.3s; width: 100%; }
  .ibz-input:focus { border-bottom-color: #B8976A; }
  .ibz-select { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; color: #1E1E1E; border: none; border-bottom: 1px solid #E5DDD0; background: transparent; padding: 0.6rem 0; outline: none; width: 100%; cursor: pointer; appearance: none; -webkit-appearance: none; }
  .ibz-textarea { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; color: #1E1E1E; border: 1px solid #E5DDD0; background: transparent; padding: 0.75rem 1rem; outline: none; resize: vertical; width: 100%; min-height: 100px; transition: border-color 0.3s; margin-bottom: 1.5rem; }
  .ibz-textarea:focus { border-color: #B8976A; }
  .ibz-btn { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; color: #FFFFFF; background: #1E1E1E; border: none; padding: 1rem 3rem; cursor: pointer; transition: background 0.3s; width: 100%; }
  .ibz-btn:hover { background: #8C6E48; }
  .ibz-rsvp-deadline { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; color: #7A7468; text-align: center; margin-top: 1.25rem; }
  .ibz-small-wedding-note { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; color: #B8976A; text-align: center; margin-top: 1rem; border: 1px solid #E5DDD0; padding: 1rem 1.5rem; background: #FAF8F3; }

  .ibz-registry-intro { text-align: center; margin-bottom: 3.5rem; }
  .ibz-registry-intro .ibz-body { margin: 0 auto; text-align: center; }
  .ibz-registry-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .ibz-registry-card { border: 1px solid #E5DDD0; padding: 2.25rem 1.75rem; background: #FFFFFF; cursor: pointer; transition: all 0.35s; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  .ibz-registry-card:hover { border-color: #B8976A; background: #FAF8F3; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(184,151,106,0.12); }
  .ibz-registry-symbol { width: 52px; height: 52px; border: 1px solid #E5DDD0; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
  .ibz-registry-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 400; color: #1E1E1E; }
  .ibz-registry-desc { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 300; color: #7A7468; line-height: 1.7; }
  .ibz-registry-cta { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #B8976A; margin-top: auto; }

  .ibz-photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2.5rem; }
  .ibz-photo-cell { aspect-ratio: 1; background: #F0EAE0; border: 1px solid #E5DDD0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; overflow: hidden; }
  .ibz-photo-cell img { width: 100%; height: 100%; object-fit: cover; filter: sepia(5%) brightness(1.02); }
  .ibz-photo-placeholder-text { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: #D4BFA0; text-align: center; padding: 0 1rem; }

  .ibz-social-wrap { background: #1E1E1E; padding: 6rem 2rem; text-align: center; }
  .ibz-social-inner { max-width: 960px; margin: 0 auto; }
  .ibz-social-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: #D4BFA0; margin-bottom: 1rem; }
  .ibz-social-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 4rem); font-weight: 400; font-style: italic; color: #FFFFFF; margin-bottom: 1rem; }
  .ibz-social-hashtag { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; color: #D4BFA0; letter-spacing: 0.06em; margin-bottom: 2.5rem; }
  .ibz-video-frame { width: 100%; aspect-ratio: 16/9; background: #111; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; }
  .ibz-video-play { width: 64px; height: 64px; border: 1.5px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .ibz-video-label { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
  .ibz-social-note { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.8; }
  .ibz-social-note code { font-family: inherit; color: #D4BFA0; }

  .ibz-footer { padding: 3.5rem 2rem; background: #FAF8F3; border-top: 1px solid #E5DDD0; text-align: center; }
  .ibz-footer-names { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-style: italic; color: #1E1E1E; margin-bottom: 0.5rem; }
  .ibz-footer-date { font-family: 'DM Sans', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #7A7468; margin-bottom: 0.5rem; }
  .ibz-footer-tag { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; color: #B8976A; }

  @media (max-width: 768px) {
    .ibz-nav { padding: 1rem 1.25rem; }
    .ibz-nav.scrolled { padding: 0.75rem 1.25rem; }
    .ibz-nav-links { display: none; }
    .ibz-story-grid, .ibz-details-grid, .ibz-registry-grid { grid-template-columns: 1fr; }
    .ibz-photo-grid { grid-template-columns: repeat(2, 1fr); }
    .ibz-section { padding: 4rem 1.25rem; }
    .ibz-rsvp-wrap { padding: 2rem 1.25rem; }
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

function PhotoPlaceholder({ label, caption, style = {} }) {
  return (
    <div style={{ background: "#F0EAE0", border: "1px solid #E5DDD0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.75rem", filter: "sepia(5%) brightness(1.02)", ...style }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E5DDD0" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4BFA0", textAlign: "center", padding: "0 1rem" }}>{label}</span>
      {caption && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", fontStyle: "italic", color: "#D4BFA0", textAlign: "center", padding: "0 1rem" }}>{caption}</span>}
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
      <div style={{ minHeight: "100vh", background: "#FAF8F3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "2rem" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#1E1E1E", marginBottom: "0.5rem", textAlign: "center" }}>
          Kasi <span style={{ fontStyle: "italic", color: "#B8976A" }}>&</span> Tochukwu
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, color: "#7A7468", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          This page is private
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontStyle: "italic", color: "#B8976A", marginBottom: "2.5rem" }}>
          #TheIbezimakos
        </p>
        <div style={{ width: "min(420px, 90vw)", border: "1px solid #E5DDD0", background: "#FFFFFF", padding: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A7468", marginBottom: "1.5rem", textAlign: "center" }}>
            Enter your invitation code
          </p>
          <input
            type="text"
            placeholder="Your code here..."
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 300, border: "none", borderBottom: `1px solid ${error ? "#c0392b" : "#E5DDD0"}`, background: "transparent", padding: "0.6rem 0", outline: "none", textAlign: "center", letterSpacing: "0.2em", marginBottom: "1.5rem", color: "#1E1E1E" }}
          />
          {error && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "#c0392b", textAlign: "center", marginBottom: "1rem" }}>
              Incorrect code — please try again
            </p>
          )}
          <button onClick={handleSubmit} style={{ width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500, color: "#FFFFFF", background: "#1E1E1E", border: "none", padding: "1rem", cursor: "pointer" }}>
            Enter
          </button>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "#D4BFA0", marginTop: "2rem" }}>
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
  const [formData, setFormData] = useState({ name: "", attending: "yes", notes: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const handleRsvp = () => {
    if (formData.name.trim()) {
      // Send to Notion form
      window.open("https://www.notion.so/36e573a5dfd680c4a6dbe4b973f9b567?pvs=106", "_blank");
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
    { symbol: "🏠", title: "Our First Home", desc: "Help us lay the foundation of our life together — from the art on our walls to the table where we'll share every meal.", cta: "Contribute →", href: "#" },
    { symbol: "💛", title: "Open Gift", desc: "No preference? Simply give what feels right. Your love, your presence, and your blessing mean more than any gift ever could.", cta: "Give freely →", href: "#" },
    { symbol: "✈️", title: "Honeymoon Escapes", desc: "Send us on our first adventure as husband and wife. Every contribution becomes a memory we'll carry forever.", cta: "Fund a moment →", href: "#" },
  ];

  const photosGrid = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <style>{FONTS}</style>
      <style>{globalStyles}</style>

      {/* NAV */}
      <nav className={`ibz-nav ${scrolled ? "scrolled" : ""}`}>
        <span className="ibz-nav-logo">K & T</span>
        <ul className="ibz-nav-links">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="ibz-hero">
        <div className="ibz-hero-bg" />
        <PhotoPlaceholder
          label="Your hero portrait · replace with your photo"
          caption="Long-sleeved v-neck gown · editorial detail shot"
          style={{ width: "min(520px, 90vw)", height: "min(680px, 80vh)" }}
        />
        <div className="ibz-hero-content" style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <p className="ibz-eyebrow">We are getting married</p>
          <h1 className="ibz-names">
            Kasi
            <span className="ibz-ampersand">&</span>
            Tochukwu
          </h1>
          <p className="ibz-date-line">May 15, 2027</p>
          <p className="ibz-hashtag">#TheIbezimakos</p>
        </div>
        <Divider />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: "#7A7468", letterSpacing: "0.06em" }}>
          Maryland, USA
        </p>
      </section>

      <div className="ibz-rule" />

      {/* OUR STORY */}
      <section className="ibz-section" id="story">
        <div className="ibz-story-grid">
          <div>
            <p className="ibz-section-label">Our Story</p>
            <h2 className="ibz-section-title">
              Ten years in,<br />
              <em>a lifetime to go</em>
            </h2>
            <Divider />
            <p className="ibz-body" style={{ marginBottom: "1.5rem" }}>
              We met in undergrad and our first date was at Cold Stone. Neither of us knew it then, 
              but we had just met the person we would spend the next decade growing up with.
            </p>
            <blockquote className="ibz-pull-quote">
              "The first time Tochukwu met my mom, he told her he was going to marry me."
            </blockquote>
            <p className="ibz-body" style={{ marginBottom: "1.5rem" }}>
              No hesitation. Looking back now, it is funny because he ended up doing exactly what he said he would do.
            </p>
            <p className="ibz-body" style={{ marginBottom: "1.5rem" }}>
              We have been through almost every stage of life together. Through college, 
              career changes, long nights, moving boxes, and new cities, we have continued choosing each other through it all.
            </p>
            <p className="ibz-body">
              After a decade of building a life together, we cannot wait to celebrate with the people 
              who have loved and supported us along the way.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <PhotoPlaceholder
              label="Early days · undergrad"
              caption="Replace with /images/story-01.jpg"
              style={{ aspectRatio: "4/3" }}
            />
            <PhotoPlaceholder
              label="The Bahamas · proposal"
              caption="Replace with /images/story-02.jpg"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>

      <div className="ibz-rule" />

      {/* THE DETAILS */}
      <section className="ibz-section" id="details" style={{ textAlign: "center" }}>
        <p className="ibz-section-label">The Details</p>
        <h2 className="ibz-section-title"><em>Join us</em> for the celebration</h2>

        <div className="ibz-details-grid" style={{ textAlign: "left" }}>
          <div className="ibz-detail-card">
            <p className="ibz-detail-type">Ceremony</p>
            <h3 className="ibz-detail-title">The Exchange of Vows</h3>
            <div className="ibz-detail-info">
              <strong>Date & Time</strong>
              Saturday, May 15, 2027 · Time TBD
              <strong style={{ marginTop: "1rem" }}>Location</strong>
              Maryland, USA<br />
              Venue details to follow
              <strong style={{ marginTop: "1rem" }}>Attire</strong>
              Asoebi
            </div>
          </div>

          <div className="ibz-detail-card">
            <p className="ibz-detail-type">Reception</p>
            <h3 className="ibz-detail-title">The Celebration Dinner</h3>
            <div className="ibz-detail-info">
              <strong>Time</strong>
              Cocktail Hour & Dinner to follow
              <strong style={{ marginTop: "1rem" }}>Location</strong>
              Maryland, USA<br />
              Venue details to follow
              <strong style={{ marginTop: "1rem" }}>Note</strong>
              An Afrobeats & R&B dance floor awaits.<br />
              Come ready to celebrate all night.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3rem", position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/IY025Bs8D0w"
            title="Kasi & Tochukwu"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </section>

      <div className="ibz-rule" />

      {/* RSVP */}
      <section className="ibz-section" id="rsvp" style={{ textAlign: "center" }}>
        <p className="ibz-section-label">RSVP</p>
        <h2 className="ibz-section-title"><em>Will you join us?</em></h2>
        <p className="ibz-body" style={{ margin: "0.75rem auto 0" }}>
          Kindly respond by February 15th, 2027.
        </p>

        <div className="ibz-rsvp-wrap">
          <div className="ibz-small-wedding-note">
            🕊️ Our celebration is an intimate affair. We kindly ask that each guest RSVPs individually — 
            this one is just for you, with love.
          </div>

          {rsvpSubmitted ? (
            <div style={{ padding: "2rem 0", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontStyle: "italic", color: "#1E1E1E", marginBottom: "1rem" }}>
                We'll see you there 🥂
              </div>
              <p className="ibz-body" style={{ margin: "0 auto", textAlign: "center" }}>
                Thank you, {formData.name}. Your RSVP has been received.<br />
                We cannot wait to celebrate with you.
              </p>
              <div style={{ marginTop: "2rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontStyle: "italic", color: "#B8976A" }}>
                #TheIbezimakos
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginTop: "2rem" }}>
                <div className="ibz-form-group">
                  <label className="ibz-label">Your Full Name</label>
                  <input className="ibz-input" type="text" placeholder="First & Last name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="ibz-form-group">
                  <label className="ibz-label">Will you attend?</label>
                  <select className="ibz-select" value={formData.attending} onChange={e => setFormData({ ...formData, attending: e.target.value })}>
                    <option value="yes">Joyfully accepts</option>
                    <option value="no">Regretfully declines</option>
                  </select>
                </div>

                <div className="ibz-form-group">
                  <label className="ibz-label">A note for us (optional)</label>
                  <textarea className="ibz-textarea" placeholder="A well-wish, a memory, a song request..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>

                <button className="ibz-btn" onClick={handleRsvp}>
                  Send my RSVP
                </button>
                <p className="ibz-rsvp-deadline">Kindly respond by February 15th, 2027</p>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="ibz-rule" />

      {/* TRAVEL */}
      <section className="ibz-section" id="travel">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p className="ibz-section-label">Travel & Stay</p>
            <h2 className="ibz-section-title">Getting<br /><em>here</em></h2>
            <p className="ibz-body" style={{ marginTop: "1.5rem" }}>
              Whether you're driving in from across the DMV or flying in from abroad, 
              we want your journey here to be as smooth as the celebration itself. 
              Hotel recommendations and travel details will be shared once our venue is confirmed.
            </p>
            <div style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #E5DDD0", background: "#FFFFFF" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8976A", marginBottom: "0.75rem" }}>Nearest Airports</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#7A7468", lineHeight: 2 }}>
                Ronald Reagan Washington National (DCA)<br />
                Baltimore/Washington International (BWI)<br />
                Washington Dulles International (IAD)
              </p>
            </div>
          </div>

          <div style={{ paddingTop: "2.5rem" }}>
            <div style={{ padding: "2rem 1.75rem", borderTop: "2px solid #B8976A", background: "#FFFFFF", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#1E1E1E", marginBottom: "0.5rem" }}>Hotel Recommendations</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 300, color: "#7A7468", lineHeight: 1.75 }}>
                Our curated hotel list will be available once the venue is confirmed. 
                Check back soon — we'll make sure our guests are well taken care of!
              </p>
            </div>
            <div style={{ padding: "2rem 1.75rem", borderTop: "2px solid #B8976A", background: "#FFFFFF" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#1E1E1E", marginBottom: "0.5rem" }}>Questions?</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 300, color: "#7A7468", lineHeight: 1.75 }}>
                Reach out to us directly and we'll be happy to help with anything you need to make your trip seamless.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="ibz-rule" />

      {/* GIFTS */}
      <section className="ibz-section" id="gifts">
        <div className="ibz-registry-intro">
          <p className="ibz-section-label">New Beginnings</p>
          <h2 className="ibz-section-title" style={{ textAlign: "center" }}><em>Gifts & Registry</em></h2>
          <Divider />
          <p className="ibz-body" style={{ textAlign: "center", margin: "0 auto" }}>
            Honestly? Your presence at our wedding is the only gift we could ever ask for. 
            Having the people we love most in the same room as we say "I do" is everything. 
            But if your heart is feeling generous and you would like to celebrate this new chapter with us, 
            we have put together a few ways to be a part of the beautiful life we are building together. 💛
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

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontStyle: "italic", color: "#7A7468", textAlign: "center", marginTop: "2.5rem" }}>
          No box required. Just bring your dancing shoes and your love.
        </p>
      </section>

      {/* SOCIAL / MEMORIES */}
      <section className="ibz-social-wrap" id="social">
        <div className="ibz-social-inner">
          <p className="ibz-social-eyebrow">A decade of memories</p>
          <h2 className="ibz-social-title">Us, Through the Years</h2>
          <p className="ibz-social-hashtag">#TheIbezimakos</p>

          {/* Photo grid */}
          <div className="ibz-photo-grid">
            {photosGrid.map((i) => (
              <div key={i} className="ibz-photo-cell">
                {/* Replace each div below with: <img src="/images/memory-0X.jpg" alt="Kasi and Tochukwu" /> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="ibz-photo-placeholder-text">Memory {i} · add your photo</span>
              </div>
            ))}
          </div>

          {/* Venue photo */}
          <div style={{ marginTop: "3rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4BFA0", marginBottom: "1.25rem" }}>Our venue</p>
            <PhotoPlaceholder
              label="Venue photo · coming soon"
              caption="Replace with /images/venue.jpg"
              style={{ width: "100%", aspectRatio: "21/9" }}
            />
          </div>

          <p className="ibz-social-note">
            Tag your photos and videos with <code>#TheIbezimakos</code> and we want to see all the love!
            Follow us on Instagram at <code>@Lovekasio</code> and TikTok at <code>@lovekasioo</code>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ibz-footer">
        <p className="ibz-footer-names">Kasi & Tochukwu Ibezimako</p>
        <p className="ibz-footer-date">15 · May · 2027 · Maryland, USA</p>
        <p className="ibz-footer-tag">#TheIbezimakos</p>
      </footer>
    </>
  );
}
