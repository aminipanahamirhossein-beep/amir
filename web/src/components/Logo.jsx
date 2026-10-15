import { Link } from 'react-router-dom';

/** Geometric ATELIER mark: an outlined triangle carrying the counter of an A. */
export default function Logo({ withWordmark = true }) {
  return (
    <Link to="/" className="brand" aria-label="Atelier — home">
      <svg
        className="brand__mark"
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16 4 29 28H3L16 4Z" />
        <path d="M10.5 19.5h11" />
      </svg>
      {withWordmark && <span className="brand__word">Atelier</span>}
    </Link>
  );
}
