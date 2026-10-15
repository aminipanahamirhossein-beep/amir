import ArrowLink from '../components/ArrowLink.jsx';

export default function NotFound() {
  return (
    <div className="page">
      <div className="container not-found">
        <p className="eyebrow">404</p>
        <h1 className="page-title">This page could not be found</h1>
        <p className="page-lede">
          The page you were looking for has moved or never existed. Try the portfolio, or head back
          to the start.
        </p>
        <ArrowLink to="/">Back to home</ArrowLink>
      </div>
    </div>
  );
}
