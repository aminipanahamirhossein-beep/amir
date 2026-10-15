/** Minimal line icons for the services list — one consistent 32px grid. */
const icons = {
  frame: (
    <>
      <rect x="5" y="5" width="22" height="22" />
      <path d="M5 12h22M12 5v22" />
    </>
  ),
  leaf: (
    <>
      <path d="M26 6c0 11-7.5 20-20 20" />
      <path d="M6 26C6 15 13.5 6 26 6" />
      <path d="M10.5 21.5 21.5 10.5" />
    </>
  ),
  cube: (
    <>
      <path d="M16 4 27 10v12l-11 6-11-6V10l11-6Z" />
      <path d="M5 10l11 6 11-6" />
      <path d="M16 16v12" />
    </>
  ),
  drafting: (
    <>
      <path d="M6 26 26 6" />
      <path d="M6 26h20" />
      <path d="M14 26V15" />
      <path d="M6 26 14 15h12" />
    </>
  ),
};

export default function ServiceIcon({ name }) {
  return (
    <svg
      className="service-item__icon"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name] ?? icons.frame}
    </svg>
  );
}
