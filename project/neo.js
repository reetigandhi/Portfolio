/* =========================================================
   Reeti — Neo Portfolio Interactions
   ========================================================= */

/* ---------- Reveal on scroll ---------- */
(() => {
  const els = document.querySelectorAll(".reveal, .stat-bar");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- Stat bars: animate fill from data-val ---------- */
(() => {
  document.querySelectorAll(".stat-bar").forEach((bar) => {
    const val = bar.dataset.val || 80;
    const fill = bar.querySelector(".fill");
    fill.style.width = val + "%";
    fill.style.transform = "scaleX(0)";
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => {
            fill.style.transform = "scaleX(1)";
          });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(bar);
  });
})();

/* ---------- Sticker drag ---------- */
(() => {
  const canvas = document.getElementById("stickerCanvas");
  if (!canvas) return;
  const stickers = canvas.querySelectorAll(".sticker");

  // Initial positions (percent-based for responsive)
  const place = () => {
    const rect = canvas.getBoundingClientRect();
    stickers.forEach((s) => {
      const x = (parseFloat(s.dataset.x) / 100) * rect.width;
      const y = (parseFloat(s.dataset.y) / 100) * rect.height;
      const rot = s.dataset.rot || 0;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.transform = `rotate(${rot}deg)`;
    });
  };
  place();
  window.addEventListener("resize", place);

  // Drag
  let active = null;
  let offX = 0, offY = 0;
  let zCounter = 5;

  const start = (e, sticker) => {
    active = sticker;
    sticker.classList.add("grabbing");
    sticker.style.zIndex = ++zCounter;
    const rect = canvas.getBoundingClientRect();
    const stRect = sticker.getBoundingClientRect();
    const pt = e.touches ? e.touches[0] : e;
    offX = pt.clientX - stRect.left;
    offY = pt.clientY - stRect.top;
    if (e.cancelable) e.preventDefault();
  };
  const move = (e) => {
    if (!active) return;
    const rect = canvas.getBoundingClientRect();
    const pt = e.touches ? e.touches[0] : e;
    let x = pt.clientX - rect.left - offX;
    let y = pt.clientY - rect.top - offY;
    // Clamp
    const sw = active.offsetWidth;
    const sh = active.offsetHeight;
    x = Math.max(-sw * 0.3, Math.min(rect.width - sw * 0.7, x));
    y = Math.max(-sh * 0.3, Math.min(rect.height - sh * 0.7, y));
    active.style.left = x + "px";
    active.style.top = y + "px";
  };
  const end = () => {
    if (!active) return;
    // Subtle random rotation on release
    const rot = (Math.random() * 12 - 6).toFixed(1);
    active.style.transform = `rotate(${rot}deg)`;
    active.classList.remove("grabbing");
    active = null;
  };
  stickers.forEach((s) => {
    s.addEventListener("mousedown", (e) => start(e, s));
    s.addEventListener("touchstart", (e) => start(e, s), { passive: false });
  });
  window.addEventListener("mousemove", move);
  window.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("mouseup", end);
  window.addEventListener("touchend", end);
})();

/* ---------- Project flip ---------- */
(() => {
  document.querySelectorAll(".proj").forEach((proj) => {
    const flipBtn = proj.querySelector(".flip");
    const closeBtn = proj.querySelector(".close");
    flipBtn && flipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      proj.classList.add("flipped");
    });
    closeBtn && closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      proj.classList.remove("flipped");
    });
  });
})();

/* ---------- Collectible stars ---------- */
(() => {
  const stars = document.querySelectorAll(".collectible");
  const scoreNum = document.getElementById("scoreNum");
  let collected = 0;
  const total = stars.length;
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      if (star.classList.contains("collected")) return;
      star.classList.add("collected");
      collected++;
      scoreNum.textContent = collected;
      // Confetti burst at star
      const rect = star.getBoundingClientRect();
      confettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      // Achievement toast
      if (collected === 1) showToast("First star collected! ★");
      else if (collected === total) showToast("All stars collected! You found them all 🎉");
      else showToast(`${collected}/${total} stars collected`);
    });
  });
})();

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(text) {
  const toast = document.getElementById("toast");
  document.getElementById("toastText").textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------- Confetti ---------- */
const CONFETTI_COLORS = [
  getCSS("--pink"), getCSS("--yellow"), getCSS("--lime"),
  getCSS("--cyan"), getCSS("--violet"), getCSS("--orange"),
];
function getCSS(prop) {
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim() || "#FF5A8A";
}
function confettiBurst(x, y) {
  for (let i = 0; i < 14; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = x + "px";
    c.style.top = y + "px";
    c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.3) * -150;
    c.style.transform = `translate(${dx}px, ${dy}px)`;
    c.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    document.body.appendChild(c);
    requestAnimationFrame(() => {
      c.style.transform = `translate(${dx * 1.6}px, ${dy + 200}px) rotate(${Math.random() * 720}deg)`;
      c.style.opacity = "0";
    });
    setTimeout(() => c.remove(), 1300);
  }
}
/* Confetti trail on click anywhere */
document.addEventListener("click", (e) => {
  // Skip if clicked on draggable sticker, button, or interactive
  if (e.target.closest(".sticker, .bug, .collectible, button, a, .proj")) return;
  confettiBurst(e.clientX, e.clientY);
});

/* ---------- Mini-game: Bug Hunt ---------- */
(() => {
  const board = document.getElementById("gameBoard");
  const startBtn = document.getElementById("gameStart");
  const timeEl = document.getElementById("gameTime");
  const scoreEl = document.getElementById("gameScore");
  const highEl = document.getElementById("gameHigh");
  if (!board) return;

  let running = false;
  let score = 0;
  let timeLeft = 20;
  let timer = null;
  let spawnTimer = null;
  let best = parseInt(localStorage.getItem("reeti_bug_best") || "0", 10);
  highEl.textContent = `🏆 BEST: ${best}`;

  const BUG_COLORS = ["pink", "yellow", "lime", "cyan", "orange"];
  const BUG_EMOJI = ["🐛", "🐞", "🪲", "🐜"];

  const spawn = () => {
    if (!running) return;
    const bug = document.createElement("div");
    const isGold = Math.random() < 0.12;
    const color = BUG_COLORS[Math.floor(Math.random() * BUG_COLORS.length)];
    bug.className = "bug " + (isGold ? "gold" : color);
    bug.dataset.gold = isGold ? "1" : "0";
    bug.textContent = isGold ? "★" : BUG_EMOJI[Math.floor(Math.random() * BUG_EMOJI.length)];

    const rect = board.getBoundingClientRect();
    const size = 56;
    const x = Math.random() * (rect.width - size);
    const y = Math.random() * (rect.height - size);
    bug.style.left = x + "px";
    bug.style.top = y + "px";
    bug.style.transform = `rotate(${(Math.random()*30-15).toFixed(0)}deg)`;

    bug.addEventListener("click", () => {
      if (bug.classList.contains("popped")) return;
      bug.classList.add("popped");
      const pts = isGold ? 5 : 1;
      score += pts;
      scoreEl.textContent = score;
      const r = bug.getBoundingClientRect();
      confettiBurst(r.left + r.width/2, r.top + r.height/2);
      setTimeout(() => bug.remove(), 350);
    });
    board.appendChild(bug);
    // Auto-remove if missed
    setTimeout(() => {
      if (bug.parentNode && !bug.classList.contains("popped")) {
        bug.style.transition = "opacity .3s, transform .3s";
        bug.style.opacity = "0";
        bug.style.transform = "scale(0.6)";
        setTimeout(() => bug.remove(), 320);
      }
    }, 1300);
  };

  const reset = () => {
    board.innerHTML = "";
    score = 0; timeLeft = 20;
    scoreEl.textContent = 0;
    timeEl.textContent = 20;
  };

  const endGame = () => {
    running = false;
    clearInterval(timer);
    clearInterval(spawnTimer);
    if (score > best) {
      best = score;
      localStorage.setItem("reeti_bug_best", String(best));
      highEl.textContent = `🏆 BEST: ${best}`;
    }
    const end = document.createElement("div");
    end.className = "game-end";
    end.innerHTML = `
      <div class="big">TIME'S UP!</div>
      <div class="score">${score}</div>
      <div class="big" style="font-size:18px;">${score >= 30 ? "SHIP IT 🚀" : score >= 15 ? "GOOD QA!" : "BUGS GOT THROUGH 🐛"}</div>
      <button class="btn primary" id="playAgain" style="margin-top: 8px;">PLAY AGAIN</button>
    `;
    board.appendChild(end);
    document.getElementById("playAgain").addEventListener("click", () => {
      end.remove();
      startGame();
    });
    if (score >= 30) showToast("New achievement: BUG SLAYER 🚀");
  };

  const startGame = () => {
    reset();
    running = true;
    startBtn.textContent = "RUNNING";
    startBtn.disabled = true;
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame();
        startBtn.textContent = "PLAY AGAIN";
        startBtn.disabled = false;
      }
    }, 1000);
    spawnTimer = setInterval(spawn, 380);
  };

  startBtn.addEventListener("click", () => {
    if (running) return;
    startGame();
  });
})();

/* ---------- Drag-reorder timeline ---------- */
(() => {
  const list = document.getElementById("timeline");
  if (!list) return;
  let dragged = null;
  list.addEventListener("dragstart", (e) => {
    const card = e.target.closest(".tl-card");
    if (!card) return;
    dragged = card;
    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });
  list.addEventListener("dragend", () => {
    if (dragged) dragged.classList.remove("dragging");
    dragged = null;
    list.querySelectorAll(".tl-card").forEach(c => c.classList.remove("drag-over"));
  });
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const card = e.target.closest(".tl-card");
    if (!card || card === dragged) return;
    const rect = card.getBoundingClientRect();
    const after = (e.clientY - rect.top) > rect.height / 2;
    list.querySelectorAll(".tl-card").forEach(c => c.classList.remove("drag-over"));
    card.classList.add("drag-over");
    if (after) {
      card.parentNode.insertBefore(dragged, card.nextSibling);
    } else {
      card.parentNode.insertBefore(dragged, card);
    }
  });
})();

/* ---------- Konami code: invert palette ---------- */
(() => {
  const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  const codeAlt = code.slice(0, 8); // just arrows ok too
  let buf = [];
  let inverted = false;
  document.addEventListener("keydown", (e) => {
    buf.push(e.key);
    if (buf.length > code.length) buf.shift();
    const match = buf.join(",") === code.join(",");
    const matchAlt = buf.slice(-8).join(",") === codeAlt.join(",");
    if (match || matchAlt) {
      inverted = !inverted;
      document.documentElement.setAttribute("data-invert", inverted ? "1" : "0");
      showToast(inverted ? "DARK MODE UNLOCKED 🌙" : "BACK TO LIGHT ☀");
      // Confetti
      for (let i = 0; i < 5; i++) {
        setTimeout(() => confettiBurst(window.innerWidth * Math.random(), 100 + window.innerHeight * 0.2 * Math.random()), i * 80);
      }
      buf = [];
    }
  });
})();
