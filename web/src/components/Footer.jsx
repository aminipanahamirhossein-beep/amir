import { studio, navigation } from '../data/site.js';
import Logo from './Logo.jsx';
import SectionLink from './SectionLink.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="footer-brand">
            <Logo />
            <p className="footer-copyright">{studio.copyright}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {navigation.map((item) => (
              <SectionLink key={item.section} section={item.section}>
                {item.label}
              </SectionLink>
            ))}
          </nav>

          <SocialLinks className="footer-socials" />
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__tagline">{studio.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
