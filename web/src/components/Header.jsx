import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navigation } from '../data/site.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import Logo from './Logo.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import SectionLink from './SectionLink.jsx';

const sectionIds = navigation.map((item) => item.section);

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeSection = useActiveSection(sectionIds, isHome);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />

          <nav className="site-nav" aria-label="Primary">
            {navigation.map((item) => (
              <SectionLink
                key={item.section}
                section={item.section}
                className="site-nav__link"
                active={isHome && activeSection === item.section}
              >
                {item.label}
              </SectionLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              ref={toggleRef}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="menu-toggle__line" />
              <span className="menu-toggle__line" />
              <span className="menu-toggle__line" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        open={open}
        activeSection={isHome ? activeSection : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
