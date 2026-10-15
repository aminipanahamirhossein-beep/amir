import { useEffect, useRef } from 'react';
import { contact, navigation } from '../data/site.js';
import SectionLink from './SectionLink.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function MobileNavigation({ open, activeSection, onClose }) {
  const listRef = useRef(null);

  // Move focus into the panel when it opens so keyboard users land inside it.
  useEffect(() => {
    if (open) listRef.current?.querySelector('a')?.focus();
  }, [open]);

  return (
    <div
      id="site-menu"
      className="mobile-nav"
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
    >
      <nav ref={listRef} aria-label="Sections">
        <ul className="mobile-nav__list">
          {navigation.map((item) => (
            <li key={item.section}>
              <SectionLink
                section={item.section}
                className="mobile-nav__link"
                active={activeSection === item.section}
                onActivate={onClose}
              >
                {item.label}
              </SectionLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-nav__foot">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <SocialLinks className="mobile-nav__socials" />
      </div>
    </div>
  );
}
