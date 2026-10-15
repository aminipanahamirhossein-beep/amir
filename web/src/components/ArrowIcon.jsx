/** Thin horizontal arrow used by links and project cards. */
export default function ArrowIcon({ className = '', width = 26 }) {
  return (
    <svg
      className={className}
      width={width}
      height="8"
      viewBox="0 0 26 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 4h23" />
      <path d="M19.5 1.5 23 4l-3.5 2.5" />
    </svg>
  );
}
