/** Section index ("01") followed by the hairline that opens every section. */
export default function SectionIndex({ index }) {
  return (
    <div className="section-index">
      <span className="section-index__number">{index}</span>
      <span className="section-index__line" aria-hidden="true" />
    </div>
  );
}
