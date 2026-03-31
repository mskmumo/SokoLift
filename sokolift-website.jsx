import React, { useState, useEffect, useRef } from "react";

const MEDIA = {
  sukumaCrate: "/WhatsApp Image 2026-03-31 at 16.55.49.jpeg",
  mamaMbogaStall: "/WhatsApp Image 2026-03-31 at 16.55.59 (1).jpeg",
  sukumaCrate2: "/WhatsApp Image 2026-03-31 at 16.55.59.jpeg",
  mamaMbogaStall2: "/WhatsApp Image 2026-03-31 at 16.56.00.jpeg",
  fruitStall: "/WhatsApp Image 2026-03-31 at 16.56.10.jpeg",
  vendorPortrait1: "/WhatsApp Image 2026-03-31 at 16.56.11 (1).jpeg",
  vendorPortrait2: "/WhatsApp Image 2026-03-31 at 16.56.11.jpeg",
  sukumaCrate3: "/WhatsApp Image 2026-03-31 at 16.56.00 (1).jpeg",
  video1: "/WhatsApp Video 2026-03-31 at 16.55.07.mp4",
  video2: "/WhatsApp Video 2026-03-31 at 16.55.09.mp4",
  video3: "/WhatsApp Video 2026-03-31 at 16.55.15.mp4",
  video4: "/WhatsApp Video 2026-03-31 at 16.56.03.mp4",
};

const C = { forest: "#1B4332", leaf: "#2D6A4F", lime: "#95D5B2", gold: "#F4A261", sun: "#E9C46A", cream: "#FFF8F0", white: "#FFFFFF", dark: "#0B1D13", muted: "#6B7C72" };
const F = { display: "'Playfair Display', Georgia, serif", body: "'DM Sans', 'Segoe UI', sans-serif", mono: "'JetBrains Mono', monospace" };

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.unobserve(e.target); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>{children}</div>;
}

function SecTitle({ label, title, sub, light }) {
  return (
    <div style={{ marginBottom: 48, textAlign: "center" }}>
      {label && <span style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: light ? C.lime : C.leaf, display: "block", marginBottom: 12 }}>{label}</span>}
      <h2 style={{ fontFamily: F.display, fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 700, color: light ? C.white : C.forest, lineHeight: 1.15, margin: "0 0 14px" }}>{title}</h2>
      {sub && <p style={{ fontFamily: F.body, fontSize: 16, color: light ? "rgba(255,255,255,0.65)" : C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, href, style: s = {} }) {
  const vars = { primary: { background: C.gold, color: C.dark, border: "none", fontWeight: 700 }, secondary: { background: "transparent", color: C.white, border: `2px solid ${C.lime}`, fontWeight: 600 }, whatsapp: { background: "#25D366", color: C.white, border: "none", fontWeight: 700 } };
  const base = { fontFamily: F.body, fontSize: 15, padding: "14px 32px", borderRadius: 50, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "transform 0.2s", ...vars[variant], ...s };
  return href ? <a href={href} style={base} target="_blank" rel="noopener noreferrer">{children}</a> : <button onClick={onClick} style={base}>{children}</button>;
}

function WaIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.563-1.372A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.654-.497-5.19-1.407l-.37-.222-3.844.803.84-3.743-.24-.382A9.71 9.71 0 012.25 12C2.25 6.623 6.623 2.25 12 2.25S21.75 6.623 21.75 12 17.377 21.75 12 21.75z"/></svg>; }

export default function SokoLiftWebsite() {
  const [form, setForm] = useState({ name: "", phone: "", county: "", crop: "" });
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const counties = ["Kiambu", "Machakos", "Murang'a", "Kajiado", "Nakuru", "Nyeri", "Other"];
  const crops = ["Tomatoes", "Potatoes", "Onions", "Sukuma Wiki (Kale)", "Cabbages", "Avocados", "Bananas", "Mixed / Other"];
  const videos = [
    { src: MEDIA.video1, label: "Farm Collection" },
    { src: MEDIA.video2, label: "Market Day" },
    { src: MEDIA.video3, label: "Fresh Deliveries" },
    { src: MEDIA.video4, label: "Mama Mboga" },
  ];

  return (
    <div style={{ fontFamily: F.body, color: C.dark, background: C.cream, overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "10px 24px" : "18px 24px", background: scrolled ? "rgba(27,67,50,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${C.lime}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontWeight: 900, fontSize: 17, color: C.forest }}>S</div>
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 20, color: C.white }}>SokoLift</span>
        </div>
        <Btn variant="whatsapp" href="https://chat.whatsapp.com/HIxGU1xhifLEUTyEfj0vmp" style={{ padding: "9px 18px", fontSize: 13 }}><WaIcon /> WhatsApp</Btn>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${MEDIA.mamaMbogaStall})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(165deg, ${C.dark}dd, ${C.forest}bb, ${C.leaf}99)` }} />
        <div style={{ maxWidth: 1000, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn><span style={{ display: "inline-block", fontFamily: F.mono, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.lime, background: `${C.lime}18`, padding: "8px 20px", borderRadius: 50, marginBottom: 24 }}>🌱 Empowering Kenyan Farmers</span></FadeIn>
          <FadeIn delay={150}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(34px, 7vw, 68px)", fontWeight: 900, color: C.white, lineHeight: 1.05, margin: "0 0 6px" }}>Uza Mazao Yako</h1>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(34px, 7vw, 68px)", fontWeight: 900, background: `linear-gradient(135deg, ${C.gold}, ${C.sun})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.05, margin: "0 0 24px" }}>Kwa Bei Nzuri</h1>
          </FadeIn>
          <FadeIn delay={300}><p style={{ fontFamily: F.body, fontSize: "clamp(15px, 2.5vw, 19px)", color: "rgba(255,255,255,0.75)", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.7 }}>Sell your harvest at better prices. We collect, cool, and deliver your produce to Nairobi retailers — no middlemen, no losses, instant M-Pesa payments.</p></FadeIn>
          <FadeIn delay={420}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={() => document.getElementById("join-us")?.scrollIntoView({ behavior: "smooth" })}>Join SokoLift Today →</Btn>
              <Btn variant="secondary" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>How It Works</Btn>
            </div>
          </FadeIn>
          <FadeIn delay={550}>
            <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: "clamp(20px, 5vw, 56px)", flexWrap: "wrap" }}>
              {[{ n: "30%", l: "More Income" }, { n: "50+", l: "Cooling Hubs" }, { n: "10K", l: "Farmers Target" }, { n: "0", l: "CAPEX Cost" }].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: F.display, fontSize: 30, fontWeight: 900, color: C.gold }}>{s.n}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <div style={{ display: "flex", gap: 3, height: 200, background: C.forest }}>
        {[MEDIA.sukumaCrate, MEDIA.fruitStall, MEDIA.mamaMbogaStall2, MEDIA.sukumaCrate2].map((src, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <img src={src} alt={`Produce ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      {/* THE PROBLEM */}
      <section style={{ padding: "90px 24px", background: C.white }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SecTitle label="The Challenge" title="35% of Your Harvest Never Reaches the Market" sub="Post-harvest losses cost Kenyan farmers billions. Without storage and market access, you're forced into distress sales." /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
            {[
              { img: MEDIA.sukumaCrate3, t: "Mazao Yanaharibika", en: "Produce Spoils", d: "Without cold storage, sukuma wiki, tomatoes, and fruits rot within hours of harvest." },
              { img: MEDIA.mamaMbogaStall, t: "Bei ya Chini", en: "Low Prices", d: "Middlemen exploit urgency — buying your Grade A potatoes at Grade C prices." },
              { img: MEDIA.fruitStall, t: "Usafiri Ghali", en: "Costly Transport", d: "Getting small quantities to Nairobi costs more than the produce is worth." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.lime}20`, background: C.cream }}>
                  <img src={c.img} alt={c.en} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h3 style={{ fontFamily: F.display, fontSize: 19, color: C.forest, margin: "0 0 3px" }}>{c.t}</h3>
                    <p style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, margin: "0 0 10px", letterSpacing: 1 }}>{c.en}</p>
                    <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, lineHeight: 1.6, margin: 0 }}>{c.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "90px 24px", background: `linear-gradient(180deg, ${C.forest}, ${C.dark})` }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SecTitle light label="Jinsi Inavyofanya Kazi" title="From Your Farm to Nairobi in 3 Steps" sub="We handle cold chain, transport, and sales — you focus on growing." /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {[
              { s: "01", t: "Harvest & Collect", sw: "Vuna na Kusanya", d: "Bring produce to the nearest SokoLift hub. We grade, weigh, and issue a digital receipt via SMS.", i: "🌾" },
              { s: "02", t: "Cool & Store", sw: "Hifadhi kwa Baridi", d: "Your produce enters solar-powered cold storage at 12°C. Zero cost to you.", i: "❄️" },
              { s: "03", t: "Sell & Get Paid", sw: "Uza na Ulipwe", d: "We deliver to Nairobi retailers at premium prices. M-Pesa payment hits instantly.", i: "📱" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 180}>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: 30, border: "1px solid rgba(149,213,178,0.1)", position: "relative", overflow: "hidden", height: "100%" }}>
                  <div style={{ position: "absolute", top: -10, right: -10, fontFamily: F.display, fontSize: 80, fontWeight: 900, color: "rgba(149,213,178,0.04)", lineHeight: 1 }}>{item.s}</div>
                  <div style={{ fontSize: 38, marginBottom: 14 }}>{item.i}</div>
                  <span style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, color: C.gold, textTransform: "uppercase" }}>Step {item.s}</span>
                  <h3 style={{ fontFamily: F.display, fontSize: 21, color: C.white, margin: "6px 0 3px" }}>{item.t}</h3>
                  <p style={{ fontFamily: F.body, fontSize: 12, color: C.lime, margin: "0 0 10px", fontStyle: "italic" }}>{item.sw}</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>{item.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO GALLERY */}
      <section style={{ padding: "90px 24px", background: C.cream }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <FadeIn><SecTitle label="Tazama Video" title="See SokoLift in Action" sub="Watch how fresh produce moves from the farm to mama mboga's shop." /></FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 18, overflow: "hidden", background: "#000", boxShadow: `0 20px 50px ${C.forest}22`, border: `3px solid ${C.lime}20` }}>
              <video key={videos[activeVideo].src} controls style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}>
                <source src={videos[activeVideo].src} type="video/mp4" />
              </video>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
              {videos.map((v, i) => (
                <button key={i} onClick={() => setActiveVideo(i)} style={{ padding: "9px 18px", borderRadius: 50, border: "none", cursor: "pointer", fontFamily: F.mono, fontSize: 11, background: activeVideo === i ? C.forest : `${C.forest}0d`, color: activeVideo === i ? C.white : C.forest, transition: "all 0.2s" }}>▶ {v.label}</button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" style={{ padding: "90px 24px", background: C.white }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SecTitle label="Faida za SokoLift" title="Why Farmers Choose SokoLift" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
            {[
              { i: "❄️", t: "Zero-Cost Cold Storage", sw: "Kuhifadhi Baridi Bure", d: "Solar-powered cooling hubs near your farm. No electricity bills, no capital investment." },
              { i: "💰", t: "Better Prices, Instant Pay", sw: "Bei Nzuri, Malipo Papo Hapo", d: "Earn up to 30% more than middleman prices. M-Pesa payment the moment we deliver." },
              { i: "📱", t: "SMS Price Alerts", sw: "Arifa za Bei kwa SMS", d: "Get real-time market prices via SMS before you harvest. Know your produce value." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 130}>
                <div style={{ padding: 30, borderRadius: 18, background: C.cream, border: `1px solid ${C.lime}18`, height: "100%" }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{c.i}</div>
                  <h3 style={{ fontFamily: F.display, fontSize: 20, color: C.forest, margin: "0 0 3px" }}>{c.t}</h3>
                  <p style={{ fontFamily: F.body, fontSize: 12, color: C.leaf, margin: "0 0 10px", fontStyle: "italic" }}>{c.sw}</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, lineHeight: 1.65, margin: 0 }}>{c.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE TABLE */}
      <section style={{ padding: "90px 24px", background: `linear-gradient(135deg, ${C.forest}, ${C.leaf})` }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <FadeIn><SecTitle light label="Linganisha Bei" title="SokoLift vs. Middleman Prices" /></FadeIn>
          <FadeIn delay={200}>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
                {["Produce", "Middleman", "SokoLift", "You Gain"].map(h => (
                  <div key={h} style={{ padding: "13px 14px", fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: C.lime, borderBottom: "1px solid rgba(255,255,255,0.07)", textAlign: h === "Produce" ? "left" : "center" }}>{h}</div>
                ))}
                {[
                  { p: "Potatoes (90kg)", m: "2,800", s: "3,500", g: "+25%" },
                  { p: "Tomatoes (crate)", m: "1,200", s: "1,600", g: "+33%" },
                  { p: "Onions (net bag)", m: "2,000", s: "2,600", g: "+30%" },
                  { p: "Sukuma Wiki", m: "15", s: "22", g: "+47%" },
                  { p: "Cabbages (each)", m: "35", s: "50", g: "+43%" },
                ].map((r, i) => (
                  <React.Fragment key={i}>
                    <div style={{ padding: "11px 14px", fontFamily: F.body, fontSize: 13, color: C.white, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.p}</div>
                    <div style={{ padding: "11px 14px", fontFamily: F.mono, fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center", textDecoration: "line-through", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.m}</div>
                    <div style={{ padding: "11px 14px", fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.gold, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.s}</div>
                    <div style={{ padding: "11px 14px", fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.lime, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.g}</div>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ padding: 10, fontFamily: F.mono, fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>* KES — 2025/2026 Nairobi wholesale averages</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section style={{ padding: "90px 24px", background: C.cream }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <FadeIn><SecTitle label="Picha za Soko" title="From the Field to Your Eyes" sub="Real photos from mama mboga stalls and fresh produce markets." /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: 210, gap: 10 }}>
            <FadeIn style={{ gridRow: "span 2", borderRadius: 14, overflow: "hidden" }}>
              <img src={MEDIA.vendorPortrait1} alt="Vendor" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
            </FadeIn>
            <FadeIn delay={100} style={{ borderRadius: 14, overflow: "hidden" }}>
              <img src={MEDIA.sukumaCrate} alt="Sukuma wiki" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
            </FadeIn>
            <FadeIn delay={200} style={{ borderRadius: 14, overflow: "hidden" }}>
              <img src={MEDIA.mamaMbogaStall2} alt="Stall" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
            </FadeIn>
            <FadeIn delay={300} style={{ borderRadius: 14, overflow: "hidden" }}>
              <img src={MEDIA.fruitStall} alt="Fruits" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
            </FadeIn>
            <FadeIn delay={400} style={{ borderRadius: 14, overflow: "hidden" }}>
              <img src={MEDIA.sukumaCrate2} alt="Crates" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICE CENTERS */}
      <section style={{ padding: "90px 24px", background: C.white }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SecTitle label="Vituo Vyetu" title="Farmer Service Centers Near You" sub="Walk in, drop produce, get paid. Solar cold storage and trained agents." /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            {[
              { n: "Kiambu Hub", l: "Kiambu Town, off Banana Rd", h: "Mon-Sat: 6AM-6PM", c: "Potatoes, Tomatoes, Onions", p: "+254 700 100 001" },
              { n: "Machakos Hub", l: "Machakos Junction, next to Equity", h: "Mon-Sat: 6AM-5PM", c: "Sukuma Wiki, Cabbages, Avocados", p: "+254 700 100 002" },
              { n: "Murang'a Hub", l: "Kenol Market, Gate B", h: "Mon-Fri: 6AM-4PM", c: "Bananas, Tomatoes, Mixed", p: "+254 700 100 003" },
            ].map((hub, i) => (
              <FadeIn key={i} delay={i * 130}>
                <div style={{ background: C.cream, borderRadius: 16, padding: 26, border: `1px solid ${C.lime}15`, height: "100%" }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>📍</div>
                  <h3 style={{ fontFamily: F.display, fontSize: 19, color: C.forest, margin: "0 0 12px" }}>{hub.n}</h3>
                  {[{ l: "Location", v: hub.l }, { l: "Hours", v: hub.h }, { l: "Crops", v: hub.c }, { l: "Call", v: hub.p }].map(d => (
                    <div key={d.l} style={{ marginBottom: 7 }}>
                      <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase" }}>{d.l}</span>
                      <p style={{ fontFamily: F.body, fontSize: 13, color: C.dark, margin: "1px 0 0", lineHeight: 1.4 }}>{d.v}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "90px 24px", background: C.cream }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SecTitle label="Maoni ya Wakulima" title="What Farmers Are Saying" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {[
              { n: "Mary Wanjiku", c: "Kiambu", q: "Before SokoLift, I lost half my tomatoes. Now every crate sells at a fair price and I get paid same day via M-Pesa." },
              { n: "John Mutiso", c: "Machakos", q: "SMS price alerts help me plan when to harvest. I no longer rush to sell at whatever the broker offers." },
              { n: "Grace Muthoni", c: "Murang'a", q: "The cold storage hub is 10 minutes from my farm. I store bananas for 3 days and sell when price is best." },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 130}>
                <div style={{ background: C.white, borderRadius: 16, padding: 26, borderLeft: `4px solid ${C.gold}`, height: "100%" }}>
                  <div style={{ fontSize: 26, color: C.gold, fontFamily: F.display, marginBottom: 8 }}>"</div>
                  <p style={{ fontFamily: F.body, fontSize: 14, color: C.dark, lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>{t.q}</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 700, color: C.forest, margin: 0 }}>{t.n}</p>
                  <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{t.c} County</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN FORM */}
      <section id="join-us" style={{ padding: "90px 24px", background: `linear-gradient(165deg, ${C.dark}, ${C.forest})` }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <FadeIn><SecTitle light label="Jiunge Nasi" title="Join SokoLift Today" sub="Fill your details — our agent visits within 48 hours." /></FadeIn>
          <FadeIn delay={200}>
            {sent ? (
              <div style={{ background: "rgba(149,213,178,0.1)", borderRadius: 18, padding: 40, textAlign: "center", border: "1px solid rgba(149,213,178,0.2)" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontFamily: F.display, fontSize: 24, color: C.white, margin: "0 0 10px" }}>Asante, {form.name}!</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Agent will contact <strong style={{ color: C.gold }}>{form.phone}</strong> within 48hrs.</p>
                <div style={{ marginTop: 18 }}>
                  <Btn variant="whatsapp" href="https://chat.whatsapp.com/HIxGU1xhifLEUTyEfj0vmp"><WaIcon /> Chat on WhatsApp</Btn>
                </div>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: "32px 26px", border: "1px solid rgba(255,255,255,0.07)" }}>
                {[{ k: "name", l: "Full Name / Jina Kamili", p: "e.g. Mary Wanjiku", t: "text" }, { k: "phone", l: "Phone / Nambari ya Simu", p: "e.g. 0712 345 678", t: "tel" }].map(f => (
                  <div key={f.k} style={{ marginBottom: 16 }}>
                    <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: C.lime, display: "block", marginBottom: 6 }}>{f.l}</label>
                    <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", fontFamily: F.body, fontSize: 14, color: C.white, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                {[{ k: "county", l: "County / Kaunti", o: counties }, { k: "crop", l: "Main Crop / Mazao Kuu", o: crops }].map(f => (
                  <div key={f.k} style={{ marginBottom: 16 }}>
                    <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: C.lime, display: "block", marginBottom: 6 }}>{f.l}</label>
                    <select value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(11,29,19,0.8)", fontFamily: F.body, fontSize: 14, color: C.white, outline: "none", boxSizing: "border-box" }}>
                      <option value="">Select...</option>
                      {f.o.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <Btn onClick={() => { if (form.name && form.phone) setSent(true); }} style={{ width: "100%", justifyContent: "center", fontSize: 15, marginTop: 6 }}>Join SokoLift — Jiunge Sasa →</Btn>
                <p style={{ marginTop: 14, textAlign: "center", fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Or dial <strong style={{ color: C.gold }}>*384*SOKO#</strong> on any phone</p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", background: C.dark, textAlign: "center" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.lime}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontWeight: 900, fontSize: 14, color: C.forest }}>S</div>
            <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 17, color: C.white }}>SokoLift</span>
          </div>
          <p style={{ fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginBottom: 16 }}>Bridging Kenyan farmers and urban markets. Farm to fork — no waste, fair prices, instant payments.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 16 }}>
            {[
              { label: "WhatsApp", url: "https://chat.whatsapp.com/HIxGU1xhifLEUTyEfj0vmp" },
              { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61576525706959" },
              { label: "Instagram", url: "https://www.instagram.com/soko_lift" },
            ].map(l => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 1, color: C.lime, textDecoration: "none" }}>{l.label}</a>)}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14, fontFamily: F.mono, fontSize: 10, color: "rgba(255,255,255,0.18)" }}>© 2026 SokoLift. Empowering Kenyan Agriculture.</div>
        </div>
      </footer>
    </div>
  );
}
