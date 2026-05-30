/* groovy.jsx
   Main app. Composes hero + sections + interactions. */

const { useState, useEffect, useRef } = React;

// =====================================================================
// CURSOR + BLINK HOOKS
// =====================================================================
function useCursor() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

function useBlink(everyMs = 4200) {
  const [b, setB] = useState(false);
  useEffect(() => {
    let t;
    const loop = () => {
      setB(true);
      setTimeout(() => setB(false), 140);
      t = setTimeout(loop, everyMs + Math.random() * 2000);
    };
    t = setTimeout(loop, everyMs);
    return () => clearTimeout(t);
  }, [everyMs]);
  return b;
}

// =====================================================================
// REVEAL ON SCROLL
// =====================================================================
function Reveal({ children, delay = 0, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="reveal" {...rest}>
      {children}
    </div>
  );
}

// =====================================================================
// MARQUEE
// =====================================================================
function Marquee({ items, variant = "ink", reverse = false }) {
  const cls = `tape ${variant === "ink" ? "" : variant} ${reverse ? "reverse" : ""}`;
  const renderTrack = (k) => (
    <div className="tape-track" key={k}>
      {items.map((it, i) => (
        <span className="tape-item" key={i}>
          <span>{it.txt}</span>
          <span className="dot">{it.icon}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cls}>
      {renderTrack(0)}
      {renderTrack(1)}
      {renderTrack(2)}
    </div>
  );
}

// =====================================================================
// NAV
// =====================================================================
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <span className="badge">R</span>
          <span>reeti.</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#education">Edu</a>
        </div>
        <a href="#contact" className="nav-cta">
          Say hi <ArrowChunk size={16} color={GroovyColors.cream3} />
        </a>
      </div>
    </nav>
  );
}

// =====================================================================
// HERO
// =====================================================================
function Hero({ cursor }) {
  return (
    <section className="hero" id="top">
      {/* Background scenery */}
      <div className="hero-bg">
        {/* Pipes — coming in from edges */}
        <div style={{ position: "absolute", bottom: "60px", left: "-20px" }}>
          <Pipe width={260} height={50} />
        </div>
        <div style={{ position: "absolute", top: "180px", right: "-30px", transform: "rotate(90deg)" }}>
          <Pipe width={180} height={50} />
        </div>

        {/* Floaty doodles */}
        <div className="float float-spin" style={{ top: "120px", left: "8%" }}>
          <Sun size={70} />
        </div>
        <div className="float float-bob hero-planet" style={{ top: "100px", right: "10%" }}>
          <Planet size={90} fill={GroovyColors.cyan} ring={GroovyColors.pink} />
        </div>
        <div className="float float-wobble hero-rocket" style={{ top: "280px", left: "4%" }}>
          <Rocket size={70} />
        </div>
        <div className="float float-bob" style={{ top: "320px", right: "5%" }}>
          <Mushroom size={70} />
        </div>
        <div className="float float-wobble" style={{ top: "520px", left: "14%" }}>
          <Flower size={70} petal={GroovyColors.pink2} center={GroovyColors.orange} />
        </div>
        <div className="float float-spin" style={{ top: "560px", right: "16%" }}>
          <Sparkle4 size={50} fill={GroovyColors.yellow} />
        </div>
        <div className="float" style={{ top: "70px", left: "32%" }}>
          <Sparkle4 size={28} fill={GroovyColors.pink} />
        </div>
        <div className="float" style={{ top: "200px", right: "30%" }}>
          <Sparkle4 size={22} fill={GroovyColors.cyan} />
        </div>
        <div className="float" style={{ bottom: "120px", left: "30%" }}>
          <Star5 size={28} fill={GroovyColors.violet} />
        </div>
        <div className="float float-bob" style={{ top: "180px", left: "20%" }}>
          <Cloud size={90} />
        </div>
        <div className="float float-bob" style={{ top: "440px", right: "22%" }}>
          <Cloud size={70} fill={GroovyColors.cream3} />
        </div>
      </div>

      <div className="shell">
        <div className="hero-content">
          {/* Tagline (the must-have) */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 8, marginTop: 16 }}>
            <span className="hero-tagline">
              Traded bricks for pixels
              <svg className="underline" viewBox="0 0 240 16" preserveAspectRatio="none">
                <path d="M2 12 Q 60 2, 120 10 T 238 8" stroke={GroovyColors.pink} strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          <h1 className="hero-title">REETI</h1>
          <h1 className="hero-title row-2">GANDHI</h1>

          <p className="hero-intro">
            Product designer turning <b>messy problems</b> into{" "}
            <span className="yellow-pill">measurable outcomes</span>.
          </p>

          <div className="hero-cta">
            <a href="#work" className="btn pink">
              See the work <ArrowChunk size={18} />
            </a>
            <a href="#contact" className="btn dark">
              Let's talk <ArrowChunk size={18} color={GroovyColors.cream3} />
            </a>
            <a href="https://drive.google.com/file/d/1LOC_dtPijztO3DDTRTFP6YHR-__kYwSz/view?usp=sharing" target="_blank" rel="noopener" className="btn yellow">
              Resume ↗
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// =====================================================================
// WORK / PROJECTS
// =====================================================================
function Projects({ cursor }) {
  const projects = [
    {
      num: "01",
      ribbon: "AI · HEALTH",
      cover: "pink",
      tag: "Curelink · Product Design",
      title: "Disha: AI Healthcoach",
      desc: "End-to-end onboarding, chat & calling, subscription paywall, plus a 50+ component design system for an AI health companion built for Tier 2 & 3 cities.",
      metrics: [
        { v: "20→80%", k: "conversion", c: "pink" },
        { v: "5×", k: "DAU lift", c: "cyan" },
        { v: "50+", k: "components", c: "violet" },
      ],
      chips: [
        { t: "Onboarding", c: "pink" },
        { t: "Paywall", c: "yellow" },
        { t: "Chat UI", c: "cyan" },
        { t: "Design System", c: "green" },
      ],
      art: <CoverDisha />,
      image: "uploads/disha-cover.png",
      imageBg: "#FAECD8",
      link: "https://www.behance.net/gallery/235793031/Disha-AI-Health-Coach",
    },
    {
      num: "02",
      ribbon: "100k+ VISITORS / YR",
      cover: "yellow",
      tag: "Tagglabs · Exhibition Design",
      title: "Interactive Installations",
      desc: "Gamified, hands-on exhibits for the PM's Museum and Supreme Court Museum — simplifying transport-network concepts and India's constitutional journey for audiences across age groups and literacy levels.",
      metrics: [
        { v: "100k+", k: "visitors/yr", c: "orange" },
        { v: "2", k: "museums", c: "pink" },
        { v: "5+", k: "installations", c: "violet" },
      ],
      chips: [
        { t: "Exhibition", c: "yellow" },
        { t: "Gamification", c: "pink" },
        { t: "Storytelling", c: "violet" },
        { t: "Wayfinding", c: "cyan" },
      ],
      art: <CoverMuseum />,
      image: "uploads/gatishakti-cover.png",
      imageBg: "#F4E1CA",
      link: "https://www.behance.net/gallery/235756769/Interactive-Installation-Designs",
    },
  ];

  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="section-tag">02 · Selected Work</span>
            <h2 className="section-title">
              The <span className="ribbon yellow">good</span> <br />
              <span className="stroke">stuff</span> ↓
            </h2>
          </div>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}><article className="proj">
                <div className={`proj-cover ${p.cover}${p.image ? " has-img" : ""}`} style={p.imageBg ? { "--img-bg": p.imageBg } : undefined}>
                  <span className="proj-num">{p.num}</span>
                  <span className="proj-ribbon">{p.ribbon}</span>
                  {p.image ? <img className="proj-img" src={p.image} alt={p.title} /> : p.art}
                </div>
                <div className="proj-body">
                  <div className="proj-tag">{p.tag}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="metric-row">
                    {p.metrics.map((m, j) => (
                      <div className={`metric ${m.c}`} key={j}>
                        <div className="v">{m.v}</div>
                        <div className="k">{m.k}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chips">
                    {p.chips.map((c, j) => (
                      <span className={`chip ${c.c}`} key={j}>{c.t}</span>
                    ))}
                  </div>
                </div>
              </article></a>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
          <Reveal>
            <a
              href="https://www.behance.net/reetigandhi"
              target="_blank"
              rel="noopener"
              className="btn pink"
              style={{ fontSize: 16, padding: "16px 30px" }}
            >
              View more <ArrowChunk size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---- Project covers (illustrated placeholders) ----
function CoverDisha() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" style={{ padding: 0 }}>
      {/* phone frame */}
      <rect x="100" y="40" width="120" height="200" rx="18" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="4" />
      <rect x="108" y="48" width="104" height="184" rx="10" fill={GroovyColors.pink2} stroke={GroovyColors.ink} strokeWidth="2.5" />
      {/* avatar */}
      <circle cx="160" cy="90" r="20" fill={GroovyColors.yellow} stroke={GroovyColors.ink} strokeWidth="3" />
      <circle cx="153" cy="86" r="2.5" fill={GroovyColors.ink} />
      <circle cx="167" cy="86" r="2.5" fill={GroovyColors.ink} />
      <path d="M150 95 Q 160 102, 170 95" stroke={GroovyColors.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* "chat" bars */}
      <rect x="118" y="125" width="56" height="14" rx="7" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="2" />
      <rect x="148" y="145" width="56" height="14" rx="7" fill={GroovyColors.violet} stroke={GroovyColors.ink} strokeWidth="2" />
      <rect x="118" y="165" width="40" height="14" rx="7" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="2" />
      {/* CTA */}
      <rect x="120" y="200" width="80" height="22" rx="11" fill={GroovyColors.ink} />
      <text x="160" y="216" fontFamily="Bagel Fat One" fontSize="11" fill={GroovyColors.cream3} textAnchor="middle">START ▸</text>
      {/* sparkles */}
      <g><Sparkle4 size={28} fill={GroovyColors.cyan} /></g>
      <g transform="translate(40 40)"><Sparkle4 size={26} fill={GroovyColors.yellow} /></g>
      <g transform="translate(240 50)"><Sparkle4 size={22} fill={GroovyColors.cream3} /></g>
      <g transform="translate(250 200)"><Star5 size={30} fill={GroovyColors.cream3} /></g>
      <g transform="translate(30 200)"><Heart size={30} fill={GroovyColors.cream3} /></g>
    </svg>
  );
}
function CoverMuseum() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet">
      {/* Roof */}
      <path d="M70 140 L 160 70 L 250 140 Z" fill={GroovyColors.pink} stroke={GroovyColors.ink} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="80" y="140" width="160" height="100" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="3.5" />
      {/* Columns */}
      {[100, 130, 160, 190, 220].map((x) => (
        <rect key={x} x={x - 6} y="150" width="12" height="80" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="2.5" />
      ))}
      <rect x="80" y="232" width="160" height="10" fill={GroovyColors.ink} />
      {/* sign */}
      <rect x="120" y="100" width="80" height="22" rx="6" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="2.5" />
      <text x="160" y="115" fontFamily="Bagel Fat One" fontSize="11" fill={GroovyColors.ink} textAnchor="middle">MUSEUM</text>
      <g transform="translate(40 60)"><Sun size={56} /></g>
      <g transform="translate(240 200)"><Smiley size={50} fill={GroovyColors.cream3} /></g>
      <g transform="translate(40 200)"><Star5 size={32} fill={GroovyColors.cream3} /></g>
    </svg>
  );
}
function CoverCourt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet">
      {/* scroll */}
      <rect x="80" y="60" width="160" height="180" rx="6" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="3.5" />
      <path d="M80 90 L 240 90 M 80 110 L 220 110 M 80 130 L 230 130 M 80 150 L 210 150 M 80 170 L 220 170" stroke={GroovyColors.ink} strokeWidth="2" />
      <circle cx="160" cy="200" r="22" fill={GroovyColors.yellow} stroke={GroovyColors.ink} strokeWidth="3" />
      <text x="160" y="207" fontFamily="Bagel Fat One" fontSize="16" fill={GroovyColors.ink} textAnchor="middle">★</text>
      <g transform="translate(40 60)"><Sparkle4 size={32} fill={GroovyColors.pink} /></g>
      <g transform="translate(240 60)"><Sparkle4 size={32} fill={GroovyColors.yellow} /></g>
      <g transform="translate(30 200)"><Diamond size={36} fill={GroovyColors.violet} /></g>
      <g transform="translate(250 220)"><Heart size={32} fill={GroovyColors.pink} /></g>
    </svg>
  );
}
function CoverA11y() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet">
      <circle cx="160" cy="140" r="80" fill={GroovyColors.cream3} stroke={GroovyColors.ink} strokeWidth="3.5" />
      <circle cx="160" cy="140" r="58" fill={GroovyColors.cyan} stroke={GroovyColors.ink} strokeWidth="3" />
      <circle cx="160" cy="140" r="36" fill={GroovyColors.yellow} stroke={GroovyColors.ink} strokeWidth="3" />
      <circle cx="160" cy="140" r="16" fill={GroovyColors.pink} stroke={GroovyColors.ink} strokeWidth="3" />
      <g transform="translate(40 40)"><FloatEye size={50} /></g>
      <g transform="translate(240 40)"><FloatEye size={50} /></g>
      <g transform="translate(40 220)"><Star5 size={36} fill={GroovyColors.cream3} /></g>
      <g transform="translate(240 220)"><Sparkle4 size={32} fill={GroovyColors.cream3} /></g>
    </svg>
  );
}

// =====================================================================
// ABOUT
// =====================================================================
function About({ cursor }) {
  const blink = useBlink(5500);
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="section-tag">03 · About me</span>
            <h2 className="section-title">
              hi, I&apos;m <span className="ribbon cyan">Reeti</span> ✦
            </h2>
          </div>
        </div>

        <div className="about">
          <Reveal>
            <div className="about-portrait rajasthan-card">
              <img className="rajasthan-bg" src="uploads/rajasthan-bg.jpg" alt="Rajasthan inspired backdrop" />
              
              <div className="rajasthan-illustration-wrap">
                <img
                  className="rajasthan-illustration"
                  src="uploads/rajasthan-illustration.png"
                  alt="Illustration inspired by Rajasthan folk art"
                />
              </div>

              <div style={{ marginTop: 18, fontFamily: "var(--display)", fontSize: 22 }}>REETI ★</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, opacity: 0.78, marginTop: 4, letterSpacing: "0.08em" }}>
                PRODUCT DESIGNER · ROOTED IN RAJASTHAN
              </div>

              {/* decorative corner stars */}
              <div style={{ position: "absolute", top: 14, left: 14 }}><Sparkle4 size={26} fill={GroovyColors.yellow} /></div>
              <div style={{ position: "absolute", bottom: 14, right: 14 }}><Star5 size={28} fill={GroovyColors.pink} /></div>
              <div style={{ position: "absolute", bottom: 18, left: 18 }}><Heart size={28} fill={GroovyColors.cream3} /></div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="about-text">
              <h3>An architect who fell hard for pixels.</h3>
              <p>
                I shipped <span className="hl">buildings</span> before I shipped products — turns out
                rooms and onboarding flows have a lot in common. Both need <span className="hl pink">load-bearing structure</span>,
                a way in, and a reason to stay.
              </p>
              <p>
                I love turning <span className="hl cyan">messy research</span> into clean flows, and flows into <span className="hl green">measurable outcomes</span>.
              </p>

              <div className="about-meta">
                <div className="meta-cell"><div className="k">based</div><div className="v">Gurugram</div></div>
                <div className="meta-cell"><div className="k">exp.</div><div className="v">2+ yrs</div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SKILLS
// =====================================================================
function Skills() {
  const cards = [
    {
      color: "pink",
      icon: <Sparkle4 size={28} fill={GroovyColors.yellow} />,
      title: "Design craft",
      blurb: "The pixel-pushing part. Tight, accessible, system-friendly UI.",
      rows: [
        ["UI & visual", "★★★★★"],
        ["Interaction", "★★★★★"],
        ["Design systems", "★★★★★"],
        ["UX writing", "★★★★☆"],
      ],
    },
    {
      color: "yellow",
      icon: <FloatEye size={32} />,
      title: "Research & thinking",
      blurb: "Where flows actually start — listening, synthesising, picking fights with assumptions.",
      rows: [
        ["User interviews", "★★★★★"],
        ["Usability tests", "★★★★☆"],
        ["Synthesis", "★★★★★"],
        ["A11y / WCAG", "★★★★☆"],
      ],
    },
    {
      color: "cyan",
      icon: <Star5 size={30} fill={GroovyColors.cream3} />,
      title: "The toolkit",
      blurb: "What I actually open every day, sorted by how much they know my secrets.",
      rows: [
        ["Figma", "★★★★★"],
        ["Framer", "★★★★★"],
        ["Photoshop", "★★★★☆"],
        ["Illustrator", "★★★☆☆"],
      ],
    },
  ];

  return (
    <section className="section" id="skills">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="section-tag">04 · Skills</span>
            <h2 className="section-title">
              the <span className="ribbon">toolbox</span>
            </h2>
          </div>
        </div>

        <div className="skills-grid">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`skill-card ${c.color}`}>
                <div className="icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.blurb}</p>
                {c.rows.map((r, j) => (
                  <div className="skill-row" key={j}>
                    <span>{r[0]}</span>
                    <span className="lvl">{r[1]}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// EXPERIENCE
// =====================================================================
function Experience() {
  const items = [
    { color: "pink", year: "2025 — 2026", role: "Product Designer", at: "Curelink", body: "Led design for Disha AI — an AI health companion. Owned onboarding, paywall, chat & calling, and a 50+ component design system." },
    { color: "yellow", year: "2024 — 2025", role: "UX Designer", at: "Tagglabs", body: "Designed museum installations (PM's Museum, Supreme Court Museum) reaching 100k+ visitors a year. Gamified hard concepts for mixed audiences." },
    { color: "cyan", year: "2024", role: "UX Research Intern", at: "LID, IIT Roorkee", body: "Built a research-backed accessibility framework grounded in WCAG and 20+ primary user interviews." },
    { color: "violet", year: "2021 — 2022", role: "UI / UX Designer", at: "Root Info Solutions", body: "Shipped product UI across enterprise dashboards and mobile flows." },
    { color: "orange", year: "2020 — 2021", role: "Architectural Designer", at: "AGDC Group", body: "Designed physical spaces before pixels. Where the systems-thinking habit started." },
  ];
  return (
    <section className="section" id="experience">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="section-tag">05 · Experience</span>
            <h2 className="section-title">
              the <span className="ribbon violet">path</span> so far
            </h2>
          </div>
          <p className="section-sub">From load-bearing walls to load-bearing flows.</p>
        </div>

        <div className="timeline">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`tl-item ${it.color}`}>
                <span className="dot"></span>
                <div className="tl-head">
                  <div>
                    <span className="tl-role">{it.role}</span>{" "}
                    <span className="tl-at">@ {it.at}</span>
                  </div>
                  <span className="tl-year">{it.year}</span>
                </div>
                <div className="tl-body">{it.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// EDUCATION
// =====================================================================
function Education() {
  return (
    <section className="section" id="education">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="section-tag">06 · Education</span>
            <h2 className="section-title">
              the <span className="ribbon yellow">degrees</span>
            </h2>
          </div>
          <p className="section-sub"></p>
        </div>

        <div className="edu">
          <Reveal>
            <div className="diploma a">
              <span className="deg">M.Des</span>
              <div><span className="yrs">2022 — 2024</span></div>
              <div className="sch">
                <b>Experience Design</b><br />
                NIFT, Gandhinagar
              </div>
              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <Star5 size={26} fill={GroovyColors.pink} />
                <Heart size={24} fill={GroovyColors.violet} />
                <Sparkle4 size={26} fill={GroovyColors.yellow} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="diploma b">
              <span className="deg">B.Arch</span>
              <div><span className="yrs">2015 — 2020</span></div>
              <div className="sch">
                <b>Bachelor of Architecture</b><br />
                Jai Narain Vyas University, Jodhpur
              </div>
              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <Diamond size={26} fill={GroovyColors.yellow} />
                <Sparkle4 size={26} fill={GroovyColors.pink} />
                <Star5 size={26} fill={GroovyColors.cream3} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// CONTACT
// =====================================================================
function Contact() {
  const email = "reetigandhi1997@gmail.com";
  const [copied, setCopied] = useState(false);
  const copyEmail = (e) => {
    e.preventDefault();
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(ta);
      done();
    }
  };
  return (
    <section className="contact" id="contact">
      {/* Floating scenery */}
      <div className="float float-spin" style={{ top: 80, right: "12%" }}><Sun size={70} /></div>
      <div className="float float-bob" style={{ top: 200, left: "10%" }}><Planet size={70} fill={GroovyColors.pink} ring={GroovyColors.cyan} /></div>
      <div className="float float-wobble" style={{ bottom: 240, right: "8%" }}><Rocket size={70} /></div>
      <div className="float float-wobble" style={{ top: 60, left: "18%" }}><Mushroom size={50} /></div>
      <div className="float" style={{ top: 140, right: "30%" }}><Sparkle4 size={28} fill={GroovyColors.yellow} /></div>
      <div className="float" style={{ bottom: 200, left: "25%" }}><Sparkle4 size={32} fill={GroovyColors.pink} /></div>
      <div className="float" style={{ top: 240, left: "32%" }}><Star5 size={26} fill={GroovyColors.cream3} /></div>

      <div className="shell">
        <div className="contact-inner">
          <span className="section-tag" style={{ background: GroovyColors.cream3, color: GroovyColors.ink }}>07 · Say hi</span>
          <h2>
            let&apos;s make<br />
            something <span className="ribbon">COOL</span>
          </h2>
          <div>
            <a className="contact-mail" href={`mailto:${email}`} onClick={copyEmail}>
              {copied ? "Copied! ✓" : `${email} ⧉`}
            </a>
          </div>

          <div className="socials">
            <a href="https://www.behance.net/reetigandhi" target="_blank" rel="noopener" className="social violet">Behance ↗</a>
            <a href="https://www.linkedin.com/in/reeti-gandhi/" target="_blank" rel="noopener" className="social pink">LinkedIn ↗</a>
          </div>
        </div>

      </div>
    </section>
  );
}

// =====================================================================
// APP
// =====================================================================
function App() {
  const cursor = useCursor();

  return (
    <>
      <Nav />
      <Hero cursor={cursor} />
      <Marquee
        variant="pink"
        reverse
        items={[
          { txt: "FIGMA", icon: <Sparkle4 size={18} fill={GroovyColors.cream3} /> },
          { txt: "ILLUSTRATOR", icon: <Star5 size={18} fill={GroovyColors.yellow} /> },
          { txt: "FRAMER", icon: <Heart size={18} fill={GroovyColors.cream3} /> },
          { txt: "PHOTOSHOP", icon: <Diamond size={18} fill={GroovyColors.cyan} /> },
          { txt: "CLAUDE DESIGN", icon: <Smiley size={18} fill={GroovyColors.yellow} /> },
          { txt: "UX RESEARCH", icon: <Sparkle4 size={18} fill={GroovyColors.cream3} /> },
        ]}
      />
      <Projects cursor={cursor} />

      <Marquee
        variant="yellow"
        items={[
          { txt: "MORE ABOUT ME ↓", icon: <Sparkle4 size={18} fill={GroovyColors.pink} /> },
          { txt: "ARCHITECT TURNED DESIGNER", icon: <Star5 size={18} fill={GroovyColors.violet} /> },
          { txt: "SYSTEMS THINKER", icon: <Heart size={18} fill={GroovyColors.pink} /> },
          { txt: "CHAI + RESEARCH + PIXELS", icon: <Smiley size={18} fill={GroovyColors.cream3} /> },
        ]}
      />
      <About cursor={cursor} />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
