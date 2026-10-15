import { socials } from '../data/site.js';

/**
 * Social links stay inert labels until a URL is added in `src/data/site.js`,
 * so the site never ships placeholder links to accounts that do not exist.
 */
export default function SocialLinks({ className = '' }) {
  return (
    <div className={className}>
      {socials.map((social) =>
        social.url ? (
          <a key={social.label} href={social.url} target="_blank" rel="noreferrer noopener">
            {social.label}
          </a>
        ) : (
          <span key={social.label} className="social-placeholder">
            {social.label}
          </span>
        ),
      )}
    </div>
  );
}
