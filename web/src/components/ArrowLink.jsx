import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon.jsx';

/**
 * Text link with a thin arrow that nudges on hover.
 * Renders a router link (`to`), a plain anchor (`href`) or inert text.
 */
export default function ArrowLink({ to, href, children, className = '', back = false, ...rest }) {
  const classes = `arrow-link${back ? ' arrow-link--back' : ''} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <ArrowIcon className="arrow-link__arrow" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
}
