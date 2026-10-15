import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/scroll.js';

/**
 * Navigation item pointing at a home-page section. On the home route it scrolls
 * smoothly; anywhere else it returns to the home route first, then scrolls.
 */
export default function SectionLink({ section, className = '', active = false, onActivate, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    onActivate?.();

    if (pathname === '/') {
      scrollToSection(section);
      return;
    }

    navigate(`/#${section}`);
  };

  return (
    <Link
      to={`/#${section}`}
      className={className}
      onClick={handleClick}
      aria-current={active ? 'true' : undefined}
    >
      {children}
    </Link>
  );
}
