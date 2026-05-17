/* groovy-art.jsx
   Reusable illustrations: characters, rainbow swirls, pipes, doodles.
   All composed from primitives (circles, paths, rects) — no super-detailed art.
   Exports to window for use in groovy.jsx. */

const COLORS = {
  cream: "#F2E6CC",
  cream3: "#F8F0DD",
  ink: "#1A1612",
  pink: "#FF4FA3",
  pink2: "#FFB8D1",
  orange: "#FF7A2E",
  yellow: "#FFC93C",
  green: "#5FB85F",
  cyan: "#3FB6C4",
  violet: "#8C52FF",
  red: "#E63946",
};

const STROKE = COLORS.ink;
const SW = 3; // default stroke width

/* =========================================================
   STAR / SPARKLE / DOT — tiny doodles
========================================================= */
const Sparkle4 = ({ size = 28, fill = COLORS.pink, stroke = STROKE, sw = SW, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" {...rest}>
    <path
      d="M20 2 C20 14, 26 18, 38 20 C26 22, 20 26, 20 38 C20 26, 14 22, 2 20 C14 18, 20 14, 20 2 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  </svg>
);

const Star5 = ({ size = 32, fill = COLORS.yellow, stroke = STROKE, sw = SW, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" {...rest}>
    <path
      d="M20 3 L24.5 15.5 L38 16.5 L27.5 25 L31 38 L20 30.5 L9 38 L12.5 25 L2 16.5 L15.5 15.5 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  </svg>
);

const Dot = ({ size = 14, fill = COLORS.ink, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" {...rest}>
    <circle cx="10" cy="10" r="8" fill={fill} stroke={STROKE} strokeWidth="2" />
  </svg>
);

const Diamond = ({ size = 30, fill = COLORS.pink, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" {...rest}>
    <path d="M20 3 L37 20 L20 37 L3 20 Z" fill={fill} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
  </svg>
);

/* =========================================================
   SQUIGGLE
========================================================= */
const Squiggle = ({ width = 120, color = STROKE, sw = 4, ...rest }) => (
  <svg width={width} height={width * 0.25} viewBox="0 0 120 30" {...rest}>
    <path
      d="M2 15 Q12 2, 22 15 T42 15 T62 15 T82 15 T102 15 T118 15"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
    />
  </svg>
);

/* =========================================================
   FLOWER (daisy)
========================================================= */
const Flower = ({ size = 60, petal = COLORS.cream3, center = COLORS.yellow, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" {...rest}>
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <ellipse
        key={a}
        cx="40"
        cy="22"
        rx="10"
        ry="14"
        fill={petal}
        stroke={STROKE}
        strokeWidth={SW}
        transform={`rotate(${a} 40 40)`}
      />
    ))}
    <circle cx="40" cy="40" r="10" fill={center} stroke={STROKE} strokeWidth={SW} />
    <circle cx="36" cy="38" r="2" fill={STROKE} />
    <circle cx="44" cy="38" r="2" fill={STROKE} />
    <path d="M35 44 Q40 47, 45 44" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* =========================================================
   SMILEY
========================================================= */
const Smiley = ({ size = 60, fill = COLORS.yellow, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" {...rest}>
    <circle cx="40" cy="40" r="34" fill={fill} stroke={STROKE} strokeWidth={SW} />
    <circle cx="30" cy="34" r="3.5" fill={STROKE} />
    <circle cx="50" cy="34" r="3.5" fill={STROKE} />
    <path d="M26 48 Q40 60, 54 48" fill="none" stroke={STROKE} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* =========================================================
   HEART
========================================================= */
const Heart = ({ size = 40, fill = COLORS.pink, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" {...rest}>
    <path
      d="M20 35 C5 23, 2 12, 10 7 C15 4, 19 7, 20 11 C21 7, 25 4, 30 7 C38 12, 35 23, 20 35 Z"
      fill={fill}
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   SUN with rays
========================================================= */
const Sun = ({ size = 80, fill = COLORS.orange, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" {...rest}>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <line
        key={a}
        x1="50" y1="10" x2="50" y2="22"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
        transform={`rotate(${a} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="22" fill={fill} stroke={STROKE} strokeWidth={SW} />
    <circle cx="42" cy="47" r="2.5" fill={STROKE} />
    <circle cx="58" cy="47" r="2.5" fill={STROKE} />
    <path d="M40 56 Q50 64, 60 56" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* =========================================================
   PLANET with ring
========================================================= */
const Planet = ({ size = 90, fill = COLORS.violet, ring = COLORS.yellow, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" {...rest}>
    <ellipse cx="50" cy="50" rx="44" ry="14" fill={ring} stroke={STROKE} strokeWidth={SW} transform="rotate(-18 50 50)" />
    <circle cx="50" cy="50" r="22" fill={fill} stroke={STROKE} strokeWidth={SW} />
    {/* a little crater */}
    <circle cx="44" cy="46" r="3" fill="rgba(0,0,0,0.25)" />
    <circle cx="56" cy="54" r="2" fill="rgba(0,0,0,0.25)" />
    {/* re-draw front of ring */}
    <path
      d="M 12 53 Q 50 70, 88 53"
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      transform="rotate(-18 50 50)"
    />
  </svg>
);

/* =========================================================
   CLOUD
========================================================= */
const Cloud = ({ size = 100, fill = COLORS.cream3, ...rest }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" {...rest}>
    <path
      d="M20 50 Q5 50, 8 36 Q5 24, 22 24 Q26 12, 42 14 Q50 4, 62 12 Q80 8, 82 24 Q96 26, 92 40 Q98 52, 82 50 Z"
      fill={fill}
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   RAINBOW ARC — concentric bands
========================================================= */
const RainbowArc = ({ size = 200, bands = [COLORS.pink, COLORS.orange, COLORS.yellow, COLORS.green, COLORS.cyan, COLORS.violet], ...rest }) => {
  const cx = 100, cy = 100;
  const stroke = 14;
  return (
    <svg width={size} height={size / 2} viewBox="0 0 200 100" {...rest}>
      {bands.map((c, i) => {
        const r = 90 - i * stroke;
        return (
          <path
            key={i}
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke={c}
            strokeWidth={stroke}
          />
        );
      })}
      {/* outer + inner ink stroke */}
      <path
        d={`M ${cx - 97} ${cy} A 97 97 0 0 1 ${cx + 97} ${cy}`}
        fill="none"
        stroke={STROKE}
        strokeWidth="3"
      />
      <path
        d={`M ${cx - 7} ${cy} A 7 7 0 0 1 ${cx + 7} ${cy}`}
        fill="none"
        stroke={STROKE}
        strokeWidth="3"
      />
      {/* black under-line */}
      <line x1={cx - 97} y1={cy} x2={cx - 7} y2={cy} stroke={STROKE} strokeWidth="3" />
      <line x1={cx + 7} y1={cy} x2={cx + 97} y2={cy} stroke={STROKE} strokeWidth="3" />
    </svg>
  );
};

/* =========================================================
   RAINBOW RIBBON — flowing path, big background piece
   Uses long S-curve with multiple parallel bands
========================================================= */
const RainbowRibbon = ({ width = 800, height = 400, bands = [COLORS.pink, COLORS.orange, COLORS.yellow, COLORS.green, COLORS.cyan, COLORS.violet], pathD, ...rest }) => {
  const d = pathD || `M -20 ${height * 0.7} Q ${width * 0.2} ${height * 0.15}, ${width * 0.55} ${height * 0.5} T ${width + 20} ${height * 0.25}`;
  const stroke = 22;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...rest} style={{ overflow: "visible", ...rest.style }}>
      {/* outline beneath */}
      <path d={d} fill="none" stroke={STROKE} strokeWidth={stroke * bands.length + 6} strokeLinecap="round" />
      {bands.map((c, i) => {
        const offset = (i - (bands.length - 1) / 2) * stroke;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={c}
            strokeWidth={stroke}
            strokeLinecap="round"
            style={{ transform: `translateY(${offset}px)` }}
          />
        );
      })}
    </svg>
  );
};

/* =========================================================
   PIPE — segment with joints
========================================================= */
const Pipe = ({ width = 200, height = 60, color = COLORS.cream3, ...rest }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...rest}>
    {/* joint */}
    <rect x="0" y={height / 2 - 14} width="20" height="28" fill={color} stroke={STROKE} strokeWidth={SW} />
    <rect x={width - 20} y={height / 2 - 14} width="20" height="28" fill={color} stroke={STROKE} strokeWidth={SW} />
    {/* body */}
    <rect x="18" y={height / 2 - 10} width={width - 36} height="20" fill={color} stroke={STROKE} strokeWidth={SW} />
    {/* highlight */}
    <line x1="20" y1={height / 2 - 5} x2={width - 20} y2={height / 2 - 5} stroke={STROKE} strokeWidth="1.5" opacity="0.4" />
  </svg>
);

/* =========================================================
   CHARACTER — Reeti mascot (round face, glasses, hair, blush)
   Eyes track pointer if `eyeTarget` provided (in viewport-space)
========================================================= */
const Character = ({ size = 240, eyeTarget = null, blink = false, ...rest }) => {
  const ref = React.useRef(null);
  const [eyes, setEyes] = React.useState({ lx: 0, ly: 0, rx: 0, ry: 0 });

  React.useEffect(() => {
    if (!eyeTarget) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx1 = rect.left + rect.width * 0.42; // left eye center in viewport
    const cy1 = rect.top + rect.height * 0.46;
    const cx2 = rect.left + rect.width * 0.58;
    const cy2 = rect.top + rect.height * 0.46;
    const maxOff = 2.4;
    const computeOff = (cx, cy) => {
      const dx = eyeTarget.x - cx;
      const dy = eyeTarget.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const f = Math.min(1, dist / 200);
      return { x: (dx / dist) * maxOff * f, y: (dy / dist) * maxOff * f };
    };
    const a = computeOff(cx1, cy1);
    const b = computeOff(cx2, cy2);
    setEyes({ lx: a.x, ly: a.y, rx: b.x, ry: b.y });
  }, [eyeTarget]);

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 200 200" {...rest}>
      {/* Background sparkle */}
      <circle cx="100" cy="100" r="92" fill="none" />

      {/* Body */}
      <path
        d="M 50 200 Q 50 145, 100 145 Q 150 145, 150 200 Z"
        fill={COLORS.violet}
        stroke={STROKE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Collar accent */}
      <path
        d="M 78 155 L 100 168 L 122 155"
        fill="none"
        stroke={COLORS.cream3}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Neck */}
      <rect x="90" y="125" width="20" height="20" fill={COLORS.cream3} stroke={STROKE} strokeWidth="3" />

      {/* Hair back */}
      <path
        d="M 38 88 Q 36 38, 100 32 Q 168 36, 162 92 L 158 130 Q 152 116, 144 122 L 146 70 Q 100 50, 56 72 L 58 122 Q 50 116, 42 130 Z"
        fill={STROKE}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Face */}
      <ellipse
        cx="100" cy="90"
        rx="44" ry="50"
        fill="#F5D7B5"
        stroke={STROKE}
        strokeWidth="3.5"
      />

      {/* Bangs / fringe */}
      <path
        d="M 60 70 Q 78 50, 100 56 Q 122 50, 140 70 Q 138 82, 124 80 Q 110 70, 100 78 Q 90 70, 76 80 Q 62 82, 60 70 Z"
        fill={STROKE}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Ears */}
      <ellipse cx="56" cy="98" rx="6" ry="9" fill="#F5D7B5" stroke={STROKE} strokeWidth="2.5" />
      <ellipse cx="144" cy="98" rx="6" ry="9" fill="#F5D7B5" stroke={STROKE} strokeWidth="2.5" />

      {/* Glasses */}
      <circle cx="83" cy="92" r="12" fill={COLORS.cream3} fillOpacity="0.55" stroke={STROKE} strokeWidth="3" />
      <circle cx="117" cy="92" r="12" fill={COLORS.cream3} fillOpacity="0.55" stroke={STROKE} strokeWidth="3" />
      <line x1="94" y1="92" x2="106" y2="92" stroke={STROKE} strokeWidth="3" />

      {/* Eyes (inside glasses, with blink) */}
      {!blink ? (
        <g>
          <circle cx={83 + eyes.lx} cy={92 + eyes.ly} r="3.2" fill={STROKE} />
          <circle cx={117 + eyes.rx} cy={92 + eyes.ry} r="3.2" fill={STROKE} />
        </g>
      ) : (
        <g>
          <path d="M 78 92 L 88 92" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
          <path d="M 112 92 L 122 92" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {/* Blush */}
      <ellipse cx="72" cy="108" rx="6" ry="3.5" fill={COLORS.pink} opacity="0.7" />
      <ellipse cx="128" cy="108" rx="6" ry="3.5" fill={COLORS.pink} opacity="0.7" />

      {/* Mouth */}
      <path
        d="M 88 116 Q 100 126, 112 116"
        fill="none"
        stroke={STROKE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Earrings */}
      <circle cx="56" cy="110" r="2.5" fill={COLORS.yellow} stroke={STROKE} strokeWidth="1.5" />
      <circle cx="144" cy="110" r="2.5" fill={COLORS.yellow} stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
};

/* =========================================================
   ROCKET (the little space rocket from inspiration)
========================================================= */
const Rocket = ({ size = 70, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" {...rest}>
    <path d="M40 8 Q56 24, 56 50 L 24 50 Q 24 24, 40 8 Z" fill={COLORS.cream3} stroke={STROKE} strokeWidth={SW} />
    <circle cx="40" cy="32" r="6" fill={COLORS.cyan} stroke={STROKE} strokeWidth="2.5" />
    <path d="M24 50 L 16 64 L 28 56 Z" fill={COLORS.pink} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M56 50 L 64 64 L 52 56 Z" fill={COLORS.pink} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M32 50 L 36 64 L 40 50" fill={COLORS.orange} stroke={STROKE} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M40 50 L 44 64 L 48 50" fill={COLORS.yellow} stroke={STROKE} strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

/* =========================================================
   MUSHROOM
========================================================= */
const Mushroom = ({ size = 60, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" {...rest}>
    <path d="M10 40 Q 10 14, 40 14 Q 70 14, 70 40 L 60 44 Q 40 38, 20 44 Z" fill={COLORS.red} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
    <circle cx="28" cy="28" r="5" fill={COLORS.cream3} stroke={STROKE} strokeWidth="2.5" />
    <circle cx="50" cy="24" r="4" fill={COLORS.cream3} stroke={STROKE} strokeWidth="2.5" />
    <circle cx="56" cy="36" r="3" fill={COLORS.cream3} stroke={STROKE} strokeWidth="2.5" />
    <rect x="28" y="42" width="24" height="24" rx="4" fill={COLORS.cream3} stroke={STROKE} strokeWidth={SW} />
    <circle cx="36" cy="54" r="2" fill={STROKE} />
    <circle cx="44" cy="54" r="2" fill={STROKE} />
    <path d="M36 60 Q 40 63, 44 60" stroke={STROKE} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

/* =========================================================
   EYE (floating eyeball)
========================================================= */
const FloatEye = ({ size = 60, eyeTarget = null, ...rest }) => {
  const ref = React.useRef(null);
  const [off, setOff] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!eyeTarget || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = eyeTarget.x - cx, dy = eyeTarget.y - cy;
    const d = Math.hypot(dx, dy) || 1;
    const f = Math.min(1, d / 160);
    setOff({ x: (dx / d) * 6 * f, y: (dy / d) * 6 * f });
  }, [eyeTarget]);
  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 60 60" {...rest}>
      <circle cx="30" cy="30" r="26" fill={COLORS.cream3} stroke={STROKE} strokeWidth={SW} />
      <circle cx={30 + off.x} cy={30 + off.y} r="11" fill={COLORS.cyan} stroke={STROKE} strokeWidth="2.5" />
      <circle cx={30 + off.x} cy={30 + off.y} r="5" fill={STROKE} />
      <circle cx={32 + off.x} cy={28 + off.y} r="1.5" fill={COLORS.cream3} />
    </svg>
  );
};

/* =========================================================
   MAIL ENVELOPE
========================================================= */
const Envelope = ({ size = 60, fill = COLORS.cream3, ...rest }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 80 56" {...rest}>
    <rect x="4" y="6" width="72" height="46" rx="4" fill={fill} stroke={STROKE} strokeWidth={SW} />
    <path d="M4 10 L 40 32 L 76 10" fill="none" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
  </svg>
);

/* =========================================================
   ARROW (chunky)
========================================================= */
const ArrowChunk = ({ size = 30, color = STROKE, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" {...rest}>
    <path d="M6 15 L 22 15 M 16 9 L 22 15 L 16 21" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* =========================================================
   STARBURST (callout)
========================================================= */
const Starburst = ({ size = 110, fill = COLORS.pink, children, ...rest }) => (
  <div style={{ position: "relative", width: size, height: size, display: "inline-block" }} {...rest}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 4 L57 15 L70 8 L70 22 L84 22 L77 33 L92 38 L82 47 L96 52 L82 58 L92 67 L77 72 L84 83 L70 83 L70 96 L57 90 L50 100 L43 90 L30 96 L30 83 L16 83 L23 72 L8 67 L18 58 L4 52 L18 47 L8 38 L23 33 L16 22 L30 22 L30 8 L43 15 Z"
        fill={fill}
        stroke={STROKE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--display)", fontSize: 14, textAlign: "center",
      padding: 18, lineHeight: 1
    }}>
      {children}
    </div>
  </div>
);

/* =========================================================
   Export to window
========================================================= */
Object.assign(window, {
  GroovyColors: COLORS,
  Sparkle4, Star5, Dot, Diamond, Squiggle, Flower, Smiley, Heart, Sun, Planet, Cloud,
  RainbowArc, RainbowRibbon, Pipe, Character, Rocket, Mushroom, FloatEye, Envelope, ArrowChunk, Starburst,
});
