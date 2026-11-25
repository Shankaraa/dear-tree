// ─────────────────────────────────────────────────────────────
// Dear Tree — Icons (stroke style, 24x24 viewBox)
// ─────────────────────────────────────────────────────────────

function Icon({ children, size = 24, stroke = 'currentColor', fill = 'none', strokeWidth = 1.7, style = {} }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24"
      fill={fill} stroke={stroke} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" style={style}>
      {children}
    </svg>
  );
}

const ICON = {
  leaf:    (p) => <Icon {...p}><path d="M5 19c0-7 5-13 14-14-.5 9-6.5 14-14 14z"/><path d="M5 19c3-3 5-5 8-7"/></Icon>,
  sprout:  (p) => <Icon {...p}><path d="M12 22V11"/><path d="M12 11c0-3 2-5 6-5 0 4-2 6-6 6z"/><path d="M12 14c0-3-2-5-6-5 0 4 2 6 6 6z"/></Icon>,
  tree:    (p) => <Icon {...p}><path d="M12 3c-3 0-5 2-5 5 0 1 0 2 1 3-2 0-3 2-3 4 0 2 2 3 4 3h10c2 0 4-1 4-3 0-2-1-4-3-4 1-1 1-2 1-3 0-3-2-5-5-5-1 0-2 0-2 1-.5-1-1-1-2-1z"/><path d="M12 18v4"/></Icon>,
  map:     (p) => <Icon {...p}><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></Icon>,
  pin:     (p) => <Icon {...p}><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></Icon>,
  registry:(p) => <Icon {...p}><path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V5z"/><path d="M8 8h8M8 12h6"/></Icon>,
  user:    (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></Icon>,
  heart:   (p) => <Icon {...p}><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z"/></Icon>,
  bell:    (p) => <Icon {...p}><path d="M6 17V11a6 6 0 0112 0v6l2 2H4l2-2z"/><path d="M10 21h4"/></Icon>,
  camera:  (p) => <Icon {...p}><path d="M3 8h3l2-3h8l2 3h3v11H3V8z"/><circle cx="12" cy="13" r="3.5"/></Icon>,
  bird:    (p) => <Icon {...p}><path d="M3 12c4 0 7-2 9-5 1 2 3 3 5 3l4-1-3 5c-1 2-3 3-5 3l-4 4v-3l-6-1v-5z"/><circle cx="18" cy="7" r=".7" fill="currentColor"/></Icon>,
  squirrel:(p) => <Icon {...p}><path d="M9 21c-3 0-5-2-5-5 0-3 2-4 4-5-1-1-1-3 0-4 2-2 5-1 6 1 1-2 4-3 5-1 1 2 0 5-2 6 2 1 3 3 3 5"/><circle cx="8" cy="9" r=".7" fill="currentColor"/></Icon>,
  drop:    (p) => <Icon {...p}><path d="M12 3s-6 7-6 12a6 6 0 0012 0c0-5-6-12-6-12z"/></Icon>,
  ruler:   (p) => <Icon {...p}><path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/></Icon>,
  tag:     (p) => <Icon {...p}><path d="M20 12l-8 8-9-9V3h8l9 9z"/><circle cx="8" cy="8" r="1.5"/></Icon>,
  sparkle: (p) => <Icon {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></Icon>,
  search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></Icon>,
  plus:    (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  check:   (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>,
  back:    (p) => <Icon {...p}><path d="M15 5l-7 7 7 7"/></Icon>,
  close:   (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>,
  share:   (p) => <Icon {...p}><path d="M12 3v13M7 8l5-5 5 5"/><path d="M4 14v6h16v-6"/></Icon>,
  more:    (p) => <Icon {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></Icon>,
  chev:    (p) => <Icon {...p}><path d="M9 5l7 7-7 7"/></Icon>,
  chevDown:(p) => <Icon {...p}><path d="M5 9l7 7 7-7"/></Icon>,
  cal:     (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>,
  award:   (p) => <Icon {...p}><circle cx="12" cy="9" r="6"/><path d="M8 14l-2 7 6-3 6 3-2-7"/></Icon>,
  building:(p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></Icon>,
  bouquet: (p) => <Icon {...p}><path d="M12 8a3 3 0 11-3 3M12 8a3 3 0 103 3M12 8v12"/><path d="M9 11l-3 10M15 11l3 10"/></Icon>,
  ledger:  (p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h8M8 11h8M8 15h5"/></Icon>,
  download:(p) => <Icon {...p}><path d="M12 3v13M7 11l5 5 5-5M4 20h16"/></Icon>,
  qr:      (p) => <Icon {...p}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z"/></Icon>,
};

window.ICON = ICON;
window.Icon = Icon;
