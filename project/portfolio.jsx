/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ============== Custom Cursor ============== */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf;

    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setState("hover");
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-state={state}>
        <span className="cursor-label">{label}</span>
      </div>
    </>
  );
}

/* ============== Nav ============== */
function Nav() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-brand" data-cursor="">
        <div className="glyph">R</div>
        <span>REETI GANDHI</span>
      </div>
      <div className="nav-links">
        <a href="#work" data-cursor="">Work</a>
        <a href="#about" data-cursor="">About</a>
        <a href="#experience" data-cursor="">Experience</a>
        <a href="#contact" data-cursor="">Contact</a>
      </div>
      <div className="nav-meta">
        <span className="dot" />
        <span>Available · Gurugram {time} IST</span>
      </div>
    </nav>
  );
}

/* ============== Hero ============== */
function Hero() {
  return (
    <section className="hero shell">
      <div className="blob a" />
      <div className="blob b" />

      <div className="hero-top">
        <div className="hero-tag">
          <div className="label">[ Portfolio · 2025 ]</div>
          <div className="signature">A research-driven product designer turning ambiguous problems into measurable outcomes.</div>
        </div>
        <div className="hero-meta">
          <div className="label">[ Currently ]</div>
          <div style={{fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.2, maxWidth: 280}}>
            Product Designer at <em>Curelink</em>, designing <em>Disha AI</em>.
          </div>
        </div>
      </div>

      <h1 className="hero-name">
        <span className="word"><span>Reeti</span></span>{" "}
        <span className="word italic"><span>Gandhi.</span></span>
      </h1>

      <div className="hero-bottom">
        <div className="availability">
          <div className="label">[ Roles ]</div>
          <div style={{fontFamily: "var(--display)", fontSize: 28, lineHeight: 1.1}}>
            Product Designer<br/>
            <em style={{color: "var(--accent)"}}>UI / UX</em> · Systems · Research
          </div>
        </div>
        <div className="star">✺</div>
        <div className="scroll">
          <div className="label">[ Scroll for selected work ]</div>
          <div className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
}

/* ============== Marquee ============== */
function Marquee() {
  const items = [
    "Product Design",
    "Interaction",
    "Design Systems",
    "User Research",
    "Prototyping",
    "Accessibility",
    "AI Experiences",
    "Strategy"
  ];
  const Row = () => (
    <div className="marquee-track">
      {items.map((t, i) => (
        <div className={`marquee-item ${i % 3 === 1 ? "italic" : ""}`} key={i}>
          {t}
          <span className="dotsep" />
        </div>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <Row /><Row />
    </div>
  );
}

/* ============== Numbers ============== */
function Numbers() {
  const stats = [
    { v: "4×", k: "First-time user conversion lift on Disha AI onboarding" },
    { v: "5×", k: "Daily active users after chat & calling launch" },
    { v: "100k+", k: "Annual visitors served by museum installations" },
    { v: "50+", k: "Reusable components shipped in the design system" }
  ];
  return (
    <section className="shell" style={{padding: "60px 0"}}>
      <div className="numbers">
        {stats.map((s, i) => (
          <div className="num-card reveal" key={i}>
            <div className="big"><span className="italic">{s.v}</span></div>
            <div className="desc">{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============== Selected Work ============== */
function Work() {
  const projects = [
    {
      num: "01",
      ribbon: "Live · 2025",
      title: ["Disha", "AI"],
      titleItalic: 1,
      org: "Curelink",
      tag: "Product Design · Design System",
      desc: "End-to-end onboarding, chat & calling, subscription paywall, and a complete design system for an AI health companion serving Tier 2 & Tier 3 cities.",
      metrics: [
        { v: "20→80%", k: "First-time conversion" },
        { v: "5×", k: "DAU after launch" },
        { v: "2×", k: "Daily subscriptions" }
      ],
      tags: ["Onboarding", "Conversational UI", "Design System", "Paywall"],
      media: "device"
    },
    {
      num: "02",
      ribbon: "Government · 100k+ visitors / yr",
      title: ["PM's", "Museum"],
      titleItalic: 0,
      org: "Tagglabs",
      tag: "Interactive · Gamified Experiences",
      desc: "Designed interactive, gamified exhibits simplifying complex transport-network concepts for visitors across diverse age groups and literacy levels.",
      metrics: [
        { v: "5+", k: "Installations shipped" },
        { v: "All ages", k: "Accessibility-first" }
      ],
      tags: ["Exhibition Design", "Gamification", "Wayfinding"],
      media: "museum",
      museumLabel: "PM Museum · 2024"
    },
    {
      num: "03",
      ribbon: "Civic · Storytelling",
      title: ["Supreme Court", "Museum"],
      titleItalic: 1,
      org: "Tagglabs",
      tag: "Exhibition · Digital Concepts",
      desc: "Concepts narrating India's constitutional journey — balancing historical accuracy with accessible, engaging storytelling for the public.",
      metrics: [
        { v: "Hi-fi", k: "Prototypes & interaction specs" },
        { v: "Tight", k: "Government timelines" }
      ],
      tags: ["Narrative", "Digital", "Exhibition"],
      media: "museum",
      museumLabel: "SC Museum · 2024",
      bigNum: "अनु."
    },
    {
      num: "04",
      ribbon: "Research · IIT Roorkee",
      title: ["Accessibility", "Framework"],
      titleItalic: 1,
      org: "Lab for Inclusive Design",
      tag: "UX Research · Framework",
      desc: "A structured, research-backed framework for inclusive digital interfaces — grounded in WCAG standards and 20+ primary user interviews.",
      metrics: [
        { v: "20+", k: "User interviews" },
        { v: "WCAG", k: "Standards aligned" }
      ],
      tags: ["Research", "Accessibility", "Framework", "Synthesis"],
      media: "research"
    }
  ];

  return (
    <section id="work" className="shell">
      <div className="section-head">
        <div className="num">[ 01 ] Selected Work</div>
        <h2>Work that <span className="italic">moves</span> metrics — and people.</h2>
      </div>
      <div className="work-list">
        {projects.map((p, i) => (
          <article className="project reveal" key={i}>
            <div className={`project-media media-${p.media === "museum" ? "museum" : p.media === "research" ? "research" : ""}`} data-cursor="View case →">
              {p.media === "device" && (
                <>
                  <div className="stripes" />
                  <div className="frame">
                    <div className="placeholder">Product Marquee · Disha AI</div>
                  </div>
                  <span className="ribbon">{p.ribbon}</span>
                  <div className="device">
                    <span className="notch" />
                    <div className="screen">
                      <div className="bar s" />
                      <div className="bar" />
                      <div className="bar accent" />
                      <div className="bar" />
                      <div className="bar s" />
                      <div className="bar chip" />
                      <div className="bar" />
                    </div>
                  </div>
                </>
              )}
              {p.media === "museum" && (
                <>
                  <div className="grid-pattern" />
                  <span className="museum-tag">{p.museumLabel}</span>
                  <div className="museum-num"><em>{p.bigNum || "01"}</em></div>
                </>
              )}
              {p.media === "research" && (
                <>
                  <div className="grid-cards">
                    <div className="cell">N=1</div>
                    <div className="cell fill">N=2</div>
                    <div className="cell">N=3</div>
                    <div className="cell accent">FOCUS</div>
                    <div className="cell">CODE</div>
                    <div className="cell">THEME</div>
                    <div className="cell fill">FRAME</div>
                    <div className="cell">WCAG</div>
                    <div className="cell accent">SHIP</div>
                  </div>
                  <span className="ribbon">{p.ribbon}</span>
                </>
              )}
            </div>

            <div className="project-info">
              <div className="tag">
                <span>{p.num}</span>
                <span style={{opacity: 0.4}}>/</span>
                <span>{p.tag}</span>
              </div>
              <h3>
                {p.title[0]}{" "}
                {p.titleItalic ? <span className="italic">{p.title[1]}</span> : p.title[1]}
              </h3>
              <div className="label label--ink">{p.org}</div>
              <p>{p.desc}</p>
              <div className="metrics">
                {p.metrics.map((m, k) => (
                  <div className="metric" key={k}>
                    <div className="v"><span className="italic">{m.v}</span></div>
                    <div className="k">{m.k}</div>
                  </div>
                ))}
              </div>
              <div className="tags">
                {p.tags.map((t, k) => <span className="chip" key={k}>{t}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============== About ============== */
function About() {
  return (
    <section id="about" className="shell">
      <div className="section-head">
        <div className="num">[ 02 ] About</div>
        <h2>An <span className="italic">architect</span> who fell for pixels.</h2>
      </div>
      <div className="about">
        <div className="about-text reveal">
          I'm a <span className="italic">product designer</span> with 3+ years of experience designing AI-powered health products, gamified museum experiences, and enterprise interfaces.
          <br/><br/>
          <span className="quiet">A background in </span>architecture<span className="quiet"> informs a systems-thinking approach to UX strategy, design systems, and interaction design — turning </span>user research<span className="quiet"> and funnel data into outcomes you can measure.</span>
        </div>
        <div className="about-side">
          <div className="portrait" data-cursor="Hello!">
            <div className="stripes" />
            <div className="label-placeholder">Drop portrait here · 4:5</div>
          </div>
          <div className="bio-blocks">
            <div className="bio-block">
              <div className="k">Based in</div>
              <div className="v">Gurugram, <span className="italic">IN</span></div>
            </div>
            <div className="bio-block">
              <div className="k">Experience</div>
              <div className="v"><span className="italic">3+</span> years</div>
            </div>
            <div className="bio-block">
              <div className="k">Toolkit</div>
              <div className="v">Figma · Framer</div>
            </div>
            <div className="bio-block">
              <div className="k">Currently</div>
              <div className="v"><span className="italic">Curelink</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Experience timeline ============== */
function Experience() {
  const rows = [
    { year: "2025 — Now", role: ["Product", "Designer"], italic: 1, place: "Curelink · Gurugram", desc: "Onboarding, chat & calling, subscription flow, design system for Disha AI." },
    { year: "2024 — 2025", role: ["UX", "Designer"], italic: 1, place: "Tagglabs · Gurugram", desc: "PM's Museum & Supreme Court Museum interactive exhibits." },
    { year: "2024", role: ["UX Research", "Intern"], italic: 1, place: "LID, IIT Roorkee", desc: "Accessibility framework. 20+ user interviews." },
    { year: "2021 — 2022", role: ["UI/UX", "Designer"], italic: 1, place: "Root Info Solutions", desc: "Web & mobile interfaces for 8+ client projects." },
    { year: "2020 — 2021", role: ["Architectural", "Designer"], italic: 1, place: "AGDC Group", desc: "Residential, retail, and commercial design." }
  ];
  return (
    <section id="experience" className="shell">
      <div className="section-head">
        <div className="num">[ 03 ] Experience</div>
        <h2>A path through <span className="italic">space</span> & screen.</h2>
      </div>
      <div className="timeline">
        {rows.map((r, i) => (
          <div className="tl-row reveal" key={i} data-cursor="">
            <div className="year">{r.year}</div>
            <div className="role">
              {r.role[0]} {r.italic ? <span className="italic">{r.role[1]}</span> : r.role[1]}
            </div>
            <div className="place">
              <div style={{fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", color: "var(--ink-mute)", textTransform: "uppercase", marginBottom: 4}}>
                {r.place}
              </div>
              {r.desc}
            </div>
            <div className="arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============== Education ============== */
function Education() {
  return (
    <section className="shell">
      <div className="section-head">
        <div className="num">[ 04 ] Education</div>
        <h2>Trained to <span className="italic">think</span> in systems.</h2>
      </div>
      <div className="edu">
        <div className="edu-card reveal" data-cursor="">
          <div className="yrs">2022 — 2024</div>
          <div className="deg">M.Des · Product & <span className="italic">Communication Design</span></div>
          <div className="school">National Institute of Fashion Technology (NIFT), Gandhinagar</div>
          <div className="seal">M</div>
        </div>
        <div className="edu-card reveal" data-cursor="">
          <div className="yrs">2015 — 2020</div>
          <div className="deg">B.Arch · <span className="italic">Architecture</span></div>
          <div className="school">Jai Narain Vyas University, Jodhpur</div>
          <div className="seal">B</div>
        </div>
      </div>
    </section>
  );
}

/* ============== Skills ============== */
function Skills() {
  return (
    <section className="shell">
      <div className="section-head">
        <div className="num">[ 05 ] Toolkit</div>
        <h2>What's in the <span className="italic">studio</span>.</h2>
      </div>
      <div className="skills">
        <div className="skill-col">
          <h4>Design & Research</h4>
          <ul>
            <li>User Research</li>
            <li>Wireframing</li>
            <li>Prototyping</li>
            <li>Usability Testing</li>
            <li>Information Architecture</li>
            <li>Interaction Design</li>
            <li>UX Writing</li>
            <li>Visual Design</li>
            <li>Design Systems</li>
          </ul>
        </div>
        <div className="skill-col">
          <h4>Tools</h4>
          <ul>
            <li>Figma</li>
            <li>Framer</li>
            <li>Adobe Photoshop</li>
            <li>Adobe Illustrator</li>
            <li>Notion</li>
            <li>Principle</li>
          </ul>
        </div>
        <div className="skill-col">
          <h4>Soft skills</h4>
          <ul>
            <li>Stakeholder Collaboration</li>
            <li>Cross-functional Communication</li>
            <li>Product Thinking</li>
            <li>Data-informed Decisions</li>
            <li>Workshop Facilitation</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============== Contact ============== */
function Contact() {
  return (
    <section id="contact" className="shell contact">
      <div className="greet reveal">— Say hi, or just say hi.</div>
      <h2 className="reveal">
        Let's make something <span className="italic">meaningful</span>.
      </h2>
      <a href="mailto:reetigandhi1997@gmail.com" className="cta-mail" data-cursor="Send →">
        reetigandhi1997@gmail.com
        <span className="arr">↗</span>
      </a>
      <div className="socials">
        <a href="https://www.behance.net/reetigandhi" target="_blank" rel="noopener" data-cursor="">Behance ↗</a>
        <a href="#" data-cursor="">LinkedIn ↗</a>
        <a href="https://reetigandhiportfolio.framer.website/" target="_blank" rel="noopener" data-cursor="">Framer Site ↗</a>
        <a href="tel:+917976404737" data-cursor="">+91 79764 04737</a>
      </div>
      <footer>
        <div>© 2025 Reeti Gandhi</div>
        <div className="center">Designed with care · Built in code</div>
        <div className="right">v 1.0 · Made in India</div>
      </footer>
    </section>
  );
}

/* ============== Reveal-on-scroll ============== */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============== App ============== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cream",
  "accent": "clay",
  "displayFont": "Instrument Serif"
}/*EDITMODE-END*/;

function App() {
  useReveal();
  const tw = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [t, setTweak] = tw;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme || "cream");
    document.documentElement.setAttribute("data-accent", t.accent || "clay");
    document.documentElement.style.setProperty("--display", `"${t.displayFont}", "Times New Roman", serif`);
  }, [t.theme, t.accent, t.displayFont]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakRadio = window.TweakRadio;
  const TweakSelect = window.TweakSelect;
  const TweakColor = window.TweakColor;

  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Numbers />
      <Work />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Palette">
            <TweakRadio
              label="Theme"
              value={t.theme}
              onChange={(v) => setTweak("theme", v)}
              options={[
                { value: "cream", label: "Cream" },
                { value: "ivory", label: "Ivory" },
                { value: "sand", label: "Sand" },
                { value: "midnight", label: "Midnight" }
              ]}
            />
            <TweakRadio
              label="Accent"
              value={t.accent}
              onChange={(v) => setTweak("accent", v)}
              options={[
                { value: "clay", label: "Clay" },
                { value: "plum", label: "Plum" },
                { value: "sage", label: "Sage" },
                { value: "cobalt", label: "Cobalt" },
                { value: "marigold", label: "Marigold" }
              ]}
            />
          </TweakSection>
          <TweakSection label="Typography">
            <TweakSelect
              label="Display font"
              value={t.displayFont}
              onChange={(v) => setTweak("displayFont", v)}
              options={[
                { value: "Instrument Serif", label: "Instrument Serif" },
                { value: "DM Serif Display", label: "DM Serif Display" },
                { value: "Playfair Display", label: "Playfair Display" },
                { value: "Cormorant Garamond", label: "Cormorant Garamond" }
              ]}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
