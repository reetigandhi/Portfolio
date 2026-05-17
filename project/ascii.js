/* =========================================================
   Reeti — ASCII Portfolio: interactions
   ========================================================= */

(() => {

/* =========================================================
   Reveal on scroll
   ========================================================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* =========================================================
   Boot sequence
   ========================================================= */
const boot = document.getElementById("boot");
const skipBtn = document.getElementById("bootSkip");

const bootLines = [
  { t: '<span class="c-yellow">┌─[ reeti@portfolio ~ ]─────────────────────────────────┐</span>' },
  { t: '<span class="c-yellow">│</span> [<span class="c-pink">OK</span>] booting personality.exe ............... 100%' },
  { t: '<span class="c-yellow">│</span> [<span class="c-pink">OK</span>] loading caffeine.dll ...................... 99%' },
  { t: '<span class="c-yellow">│</span> [<span class="c-pink">OK</span>] mounting design_systems/ ................. ok' },
  { t: '<span class="c-yellow">│</span> [<span class="c-pink">OK</span>] connecting to figma .................... done' },
  { t: '<span class="c-yellow">│</span> [<span class="c-cyan">..</span>] scanning user research ......... 20 interviews' },
  { t: '<span class="c-yellow">│</span> [<span class="c-pink">OK</span>] portfolio rendered .................... ready' },
  { t: '<span class="c-yellow">│</span>' },
  { t: '<span class="c-yellow">│</span> <span class="c-cyan">$</span> launch ./reeti-gandhi --portfolio --version=3' },
  { t: '<span class="c-yellow">└────────────────────────────────────────────────────────┘</span>' },
];

const bootEl = document.getElementById("bootLines");
let bootDone = false;

const finishBoot = () => {
  if (bootDone) return;
  bootDone = true;
  boot.classList.add("gone");
  setTimeout(() => boot.style.display = "none", 600);
};

skipBtn && skipBtn.addEventListener("click", finishBoot);
document.addEventListener("keydown", (e) => { if (!bootDone) finishBoot(); }, { once: true });

const runBoot = async () => {
  for (let i = 0; i < bootLines.length; i++) {
    const line = document.createElement("div");
    line.className = "boot-line";
    line.innerHTML = bootLines[i].t;
    bootEl.appendChild(line);
    await new Promise(r => requestAnimationFrame(r));
    line.classList.add("show");
    await new Promise(r => setTimeout(r, 130 + Math.random() * 80));
    if (bootDone) return;
  }
  const last = document.createElement("div");
  last.className = "boot-line show";
  last.innerHTML = '<span class="c-cyan">$</span> <span class="blink"></span>';
  bootEl.appendChild(last);
  setTimeout(finishBoot, 700);
};

if (sessionStorage.getItem("reeti_booted") === "1") {
  finishBoot();
} else {
  sessionStorage.setItem("reeti_booted", "1");
  runBoot();
}

/* =========================================================
   Hero ASCII particles
   ========================================================= */
(() => {
  const wrap = document.getElementById("heroParticles");
  if (!wrap) return;
  const chars = "★ ✦ ✧ + · ◆ ◇ ○ ● ▲ △".split(" ");
  const colors = [
    "rgba(255, 77, 138, 0.35)",
    "rgba(255, 199, 46, 0.4)",
    "rgba(143, 224, 90, 0.4)",
    "rgba(69, 212, 212, 0.4)",
    "rgba(155, 127, 255, 0.4)",
    "rgba(255, 122, 60, 0.4)",
  ];
  const N = 40;
  const particles = [];
  for (let i = 0; i < N; i++) {
    const s = document.createElement("span");
    s.textContent = chars[Math.floor(Math.random() * chars.length)];
    s.style.color = colors[Math.floor(Math.random() * colors.length)];
    s.style.fontSize = (10 + Math.random() * 18) + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    wrap.appendChild(s);
    particles.push({
      el: s,
      x: parseFloat(s.style.left),
      y: parseFloat(s.style.top),
      vx: (Math.random() - 0.5) * 0.05,
      vy: -0.04 - Math.random() * 0.05,
      rot: 0,
      vrot: (Math.random() - 0.5) * 1.5,
    });
  }
  let raf;
  const tick = () => {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      if (p.y < -5) p.y = 105;
      if (p.x < -5) p.x = 105;
      if (p.x > 105) p.x = -5;
      p.el.style.transform = `translate(${p.x - parseFloat(p.el.style.left)}vw, ${p.y - parseFloat(p.el.style.top)}vh) rotate(${p.rot}deg)`;
    });
    raf = requestAnimationFrame(tick);
  };
  tick();
})();

/* =========================================================
   Glitch on hover for hero ASCII title
   ========================================================= */
(() => {
  const hero = document.getElementById("heroAscii");
  if (!hero) return;
  const orig = hero.dataset.orig || hero.textContent;
  hero.dataset.orig = orig;
  const glitchChars = "▓░▒█▀▄■□◆◇★";
  let glitching = false;
  hero.addEventListener("mouseenter", () => {
    if (glitching) return;
    glitching = true;
    let frames = 8;
    const interval = setInterval(() => {
      const arr = orig.split("");
      for (let i = 0; i < arr.length; i++) {
        if (Math.random() < 0.06 && arr[i] !== " " && arr[i] !== "\n") {
          arr[i] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      hero.textContent = arr.join("");
      frames--;
      if (frames <= 0) {
        clearInterval(interval);
        hero.textContent = orig;
        glitching = false;
      }
    }, 50);
  });
})();

/* =========================================================
   Project cover hover — char shimmer
   ========================================================= */
(() => {
  document.querySelectorAll(".proj-cover .art").forEach((art) => {
    const orig = art.textContent;
    art.dataset.orig = orig;
    const proj = art.closest(".proj");
    let shimmering = false;
    const shimChars = "·◦∙*+";
    proj && proj.addEventListener("mouseenter", () => {
      if (shimmering) return;
      shimmering = true;
      let frames = 6;
      const interval = setInterval(() => {
        const arr = orig.split("");
        for (let i = 0; i < arr.length; i++) {
          if (Math.random() < 0.03 && /[█▓▒░◆◇]/.test(arr[i])) {
            arr[i] = shimChars[Math.floor(Math.random() * shimChars.length)];
          }
        }
        art.textContent = arr.join("");
        frames--;
        if (frames <= 0) {
          clearInterval(interval);
          art.textContent = orig;
          shimmering = false;
        }
      }, 80);
    });
  });
})();

/* =========================================================
   ASCII confetti on click
   ========================================================= */
const CONFETTI_CHARS = "★✦✧+·◆◇*✺❋";
const CONFETTI_COLORS = ["#FF4D8A", "#FFC72E", "#8FE05A", "#45D4D4", "#9B7FFF", "#FF7A3C"];
function asciiBurst(x, y) {
  for (let i = 0; i < 14; i++) {
    const c = document.createElement("span");
    c.textContent = CONFETTI_CHARS[Math.floor(Math.random() * CONFETTI_CHARS.length)];
    c.style.cssText = `
      position: fixed;
      left: ${x}px; top: ${y}px;
      color: ${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};
      font-family: monospace;
      font-weight: 700;
      font-size: ${14 + Math.random() * 10}px;
      pointer-events: none;
      z-index: 500;
      transition: transform 1.1s cubic-bezier(.2,.8,.2,1), opacity 1.1s ease-out;
      will-change: transform, opacity;
    `;
    document.body.appendChild(c);
    const dx = (Math.random() - 0.5) * 240;
    const dy = (Math.random() - 0.4) * -180;
    requestAnimationFrame(() => {
      c.style.transform = `translate(${dx}px, ${dy + 240}px) rotate(${Math.random() * 720}deg)`;
      c.style.opacity = "0";
    });
    setTimeout(() => c.remove(), 1200);
  }
}
document.addEventListener("click", (e) => {
  if (e.target.closest("button, a, input, .term, .proj")) return;
  asciiBurst(e.clientX, e.clientY);
});

/* =========================================================
   Live terminal
   ========================================================= */
const term = document.getElementById("term");
const termBody = document.getElementById("termBody");
const termInput = document.getElementById("termInput");
const termOpen = document.getElementById("termOpen");
const termClose = document.getElementById("termClose");
const termBar = document.getElementById("termBar");

const print = (html, cls = "") => {
  const line = document.createElement("div");
  line.className = "term-line " + cls;
  line.innerHTML = html;
  termBody.appendChild(line);
  termBody.scrollTop = termBody.scrollHeight;
};

const COMMANDS = {
  help: () => {
    print('<span class="info">Available commands:</span>');
    print('  <span class="accent">help</span>        — show this list');
    print('  <span class="accent">whoami</span>      — about Reeti');
    print('  <span class="accent">projects</span>    — list selected work');
    print('  <span class="accent">skills</span>      — show skill levels');
    print('  <span class="accent">experience</span>  — career timeline');
    print('  <span class="accent">education</span>   — degrees & schools');
    print('  <span class="accent">contact</span>     — email & socials');
    print('  <span class="accent">resume</span>      — download .pdf');
    print('  <span class="accent">theme</span>       — toggle dark/light');
    print('  <span class="accent">clear</span>       — wipe terminal');
    print('  <span class="accent">sudo hire</span>   — try it');
  },
  whoami: () => {
    print('<span class="info">reeti gandhi</span>');
    print('product designer · gurugram, IN · 3+ yrs');
    print('currently: <span class="accent">Curelink</span> — designing Disha AI');
    print('previously: tagglabs · lid, iit roorkee · root info solutions');
  },
  projects: () => {
    print('<span class="info">selected work:</span>');
    print('  01. <span class="accent">DISHA AI</span>             — curelink, 2025');
    print('       onboarding · chat · paywall · design system');
    print('       <span class="ok">20%→80%</span> first-time conversion, <span class="ok">5×</span> DAU');
    print('  02. <span class="accent">PM\'s MUSEUM</span>          — tagglabs, 2024');
    print('       interactive gamified exhibits · 100k+ visitors/yr');
    print('  03. <span class="accent">SUPREME COURT MUSEUM</span> — tagglabs, 2024');
    print('       constitutional storytelling · civic design');
    print('  04. <span class="accent">A11Y FRAMEWORK</span>       — lid, iit roorkee, 2024');
    print('       wcag-grounded inclusive ux · 20+ interviews');
  },
  skills: () => {
    print('<span class="info">skill tree v3:</span>');
    print('  ui / visual design   <span class="ok">[████████████████░░] 96</span>');
    print('  interaction design   <span class="ok">[███████████████░░░] 92</span>');
    print('  design systems       <span class="ok">[████████████████░░] 94</span>');
    print('  user research        <span class="ok">[██████████████░░░░] 88</span>');
    print('  prototyping          <span class="ok">[██████████████░░░░] 90</span>');
    print('  ux writing           <span class="ok">[█████████████░░░░░] 82</span>');
  },
  experience: () => {
    print('<span class="info">experience:</span>');
    print('  <span class="accent">2025 — now</span>    product designer · curelink');
    print('  <span class="accent">2024 — 2025</span>   ux designer · tagglabs');
    print('  <span class="accent">2024</span>          ux research intern · LID, IIT roorkee');
    print('  <span class="accent">2021 — 2022</span>   ui/ux designer · root info solutions');
    print('  <span class="accent">2020 — 2021</span>   architectural designer · agdc group');
  },
  education: () => {
    print('<span class="info">education:</span>');
    print('  m.des, product & comm. design — <span class="accent">NIFT gandhinagar</span> (2022–24)');
    print('  b.arch — <span class="accent">jai narain vyas university</span>, jodhpur (2015–20)');
  },
  contact: () => {
    print('<span class="info">contact:</span>');
    print('  ✉  <span class="accent">reetigandhi1997@gmail.com</span>');
    print('  ☎  +91 79764 04737');
    print('  ⌥  behance.net/reetigandhi');
    print('  ⌥  reetigandhiportfolio.framer.website');
  },
  resume: () => {
    print('<span class="ok">resume.pdf</span> downloading… (just kidding — but ping <span class="accent">reetigandhi1997@gmail.com</span> for it)');
  },
  theme: () => {
    const isDark = document.documentElement.classList.toggle("dark");
    print(`theme set to: <span class="accent">${isDark ? "dark" : "light"}</span>`);
  },
  clear: () => { termBody.innerHTML = ""; },
  "sudo hire": () => {
    print('<span class="ok">[OK]</span> request received.');
    print('<span class="info">forwarding to:</span> <span class="accent">reetigandhi1997@gmail.com</span>');
    print('<span class="info">(seriously, send an email — that\'s the way in)</span>');
    setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => asciiBurst(window.innerWidth - 200, window.innerHeight - 200), i * 100);
      }
    }, 200);
  },
  "make coffee": () => {
    print('<span class="err">Error 418:</span> I\'m a teapot ☕');
  },
  ls: () => COMMANDS.projects(),
  "cd ~": () => print("you're already home."),
  exit: () => closeTerm(),
  quit: () => closeTerm(),
};

const ALIASES = {
  about: "whoami", work: "projects", who: "whoami",
};

const handleCmd = (raw) => {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  print(`<span class="prompt">reeti@portfolio ~ $</span> ${raw}`);
  if (cmd === "hire" || cmd === "sudo hire reeti" || cmd === "hire reeti") {
    return COMMANDS["sudo hire"]();
  }
  const alias = ALIASES[cmd];
  const fn = COMMANDS[alias || cmd];
  if (fn) return fn();
  print(`<span class="err">command not found:</span> ${raw}`);
  print('try <span class="accent">help</span>');
};

const openTerm = () => {
  term.classList.add("open");
  setTimeout(() => termInput.focus(), 300);
  if (termBody.children.length === 0) {
    print('<span class="info">reeti-os v3.0 · type</span> <span class="accent">help</span> <span class="info">to get started</span>');
    print('');
  }
};
const closeTerm = () => {
  term.classList.remove("open");
};

termOpen && termOpen.addEventListener("click", openTerm);
termClose && termClose.addEventListener("click", closeTerm);

const history = [];
let histIdx = -1;
termInput && termInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const v = termInput.value;
    if (v.trim()) { history.push(v); histIdx = history.length; }
    handleCmd(v);
    termInput.value = "";
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (histIdx > 0) { histIdx--; termInput.value = history[histIdx]; }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (histIdx < history.length - 1) { histIdx++; termInput.value = history[histIdx]; }
    else { histIdx = history.length; termInput.value = ""; }
  } else if (e.key === "Escape") {
    closeTerm();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "`" && !e.target.matches("input, textarea")) {
    if (term.classList.contains("open")) closeTerm(); else openTerm();
  }
});

/* Drag the terminal by title bar */
(() => {
  if (!termBar) return;
  let drag = false, ox = 0, oy = 0;
  termBar.addEventListener("mousedown", (e) => {
    if (e.target === termClose) return;
    drag = true;
    const rect = term.getBoundingClientRect();
    ox = e.clientX - rect.left;
    oy = e.clientY - rect.top;
    term.style.right = "auto";
    term.style.bottom = "auto";
    term.style.left = rect.left + "px";
    term.style.top = rect.top + "px";
    termBar.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", (e) => {
    if (!drag) return;
    term.style.left = (e.clientX - ox) + "px";
    term.style.top = (e.clientY - oy) + "px";
  });
  window.addEventListener("mouseup", () => {
    drag = false;
    termBar.style.cursor = "grab";
  });
})();

})();
