/** Geometric lab thumbnails — no photos, no emoji. */
export function LabThumb({ slug }: { slug: string }) {
  switch (slug) {
    case "seasons":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <circle cx="56" cy="100" r="18" fill="#E8B86D" />
          <circle cx="56" cy="100" r="28" fill="none" stroke="#E8B86D" strokeOpacity="0.25" />
          <ellipse cx="200" cy="100" rx="88" ry="34" fill="none" stroke="#8B9A97" strokeDasharray="3 5" />
          <g transform="translate(248 86) rotate(-23.44)">
            <circle r="22" fill="#1a4a6e" />
            <circle r="22" fill="none" stroke="#3EE0C6" strokeWidth="1.5" />
            <line x1="0" y1="-30" x2="0" y2="30" stroke="#F4EFE6" strokeWidth="1.2" />
            <path d="M-22 0 A22 22 0 0 1 22 0" fill="#0E1412" opacity="0.55" />
          </g>
        </svg>
      );
    case "rotation":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <circle cx="160" cy="100" r="62" fill="#14344a" />
          <path d="M160 38 A62 62 0 0 0 160 162" fill="#07090C" />
          <path d="M160 38 A62 62 0 0 1 160 162" fill="#3EE0C6" fillOpacity="0.15" />
          <line x1="160" y1="28" x2="160" y2="172" stroke="#F4EFE6" strokeWidth="1" />
          <path d="M210 70 A58 40 0 0 1 230 100" fill="none" stroke="#7FD4FF" strokeWidth="2" />
        </svg>
      );
    case "moon-phases":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <circle cx="48" cy="100" r="14" fill="#E8B86D" />
          <circle cx="160" cy="100" r="22" fill="#3EE0C6" fillOpacity="0.8" />
          <circle cx="250" cy="72" r="16" fill="#F4EFE6" />
          <circle cx="258" cy="72" r="16" fill="#07090C" />
          <circle cx="250" cy="140" r="16" fill="#F4EFE6" />
        </svg>
      );
    case "earth-interior":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <circle cx="160" cy="100" r="70" fill="#7C9A6A" />
          <circle cx="160" cy="100" r="52" fill="#FF6A3D" />
          <circle cx="160" cy="100" r="28" fill="#E8B86D" />
          <circle cx="160" cy="100" r="12" fill="#F4EFE6" />
          <path d="M160 30 L160 100 L230 100" fill="none" stroke="#07090C" strokeWidth="2" />
        </svg>
      );
    case "plate-boundaries":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <path d="M40 140 C90 40 140 50 180 90 C220 130 280 60 300 80" fill="none" stroke="#3EE0C6" strokeWidth="3" />
          <path d="M30 80 C80 120 150 150 220 120 C260 100 290 150 310 160" fill="none" stroke="#FF6A3D" strokeWidth="3" />
          <path d="M70 30 L90 170" fill="none" stroke="#E8B86D" strokeWidth="3" strokeDasharray="8 6" />
        </svg>
      );
    case "contours":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <ellipse cx="160" cy="110" rx="110" ry="62" fill="none" stroke="#8B9A97" />
          <ellipse cx="168" cy="104" rx="78" ry="42" fill="none" stroke="#8B9A97" />
          <ellipse cx="176" cy="98" rx="48" ry="24" fill="none" stroke="#3EE0C6" />
          <ellipse cx="182" cy="94" rx="22" ry="10" fill="none" stroke="#F4EFE6" />
          <path d="M160 110 L160 168" stroke="#E8B86D" strokeDasharray="2 3" />
        </svg>
      );
    case "rivers":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <path d="M20 40 C80 50 70 110 120 100 S180 40 210 90 S260 160 310 150" fill="none" stroke="#7FD4FF" strokeWidth="4" />
          <path d="M210 90 C230 70 250 110 270 120" fill="none" stroke="#3EE0C6" strokeWidth="2" />
          <rect x="250" y="148" width="70" height="22" rx="2" fill="#1a3a4a" />
        </svg>
      );
    case "water-cycle":
      return (
        <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
          <rect width="320" height="200" fill="#07090C" />
          <rect x="0" y="150" width="320" height="50" fill="#14344a" />
          <path d="M40 150 L120 70 L200 150" fill="#1C2628" />
          <ellipse cx="160" cy="48" rx="50" ry="16" fill="#F4EFE6" fillOpacity="0.2" />
          <path d="M160 64 C150 100 150 130 160 150" fill="none" stroke="#7FD4FF" strokeWidth="2" />
          <path d="M90 150 C90 120 70 100 70 80" fill="none" stroke="#3EE0C6" strokeWidth="1.5" strokeDasharray="3 4" />
        </svg>
      );
    default:
      return <GenericThumb slug={slug} />;
  }
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function GenericThumb({ slug }: { slug: string }) {
  const h = hash(slug);
  const palette = ["#3EE0C6", "#FF6A3D", "#E8B86D", "#7FD4FF", "#7C9A6A", "#E24B4B"];
  const a = palette[h % palette.length];
  const b = palette[(h >> 3) % palette.length];
  const cx = 110 + (h % 80);
  const cy = 70 + ((h >> 5) % 50);
  return (
    <svg viewBox="0 0 320 200" className="size-full" aria-hidden>
      <rect width="320" height="200" fill="#07090C" />
      <circle cx={cx} cy={cy} r={36 + (h % 24)} fill={a} fillOpacity="0.85" />
      <circle cx={cx + 70} cy={cy + 20} r={18} fill={b} />
      <path
        d={`M20 170 C ${80 + (h % 40)} 40, ${180} ${60 + (h % 40)}, 300 150`}
        fill="none"
        stroke="#8B9A97"
        strokeWidth="2"
      />
      <line x1="40" y1="30" x2="40" y2="170" stroke="#F4EFE6" strokeOpacity="0.35" />
    </svg>
  );
}
