import "./CasesScreen.css";
import { CASES_INFO } from "../data/cases";

function HighlightedLatin({ text, highlight }) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <strong className="cases__highlight">{highlight}</strong>
      {text.slice(idx + highlight.length)}
    </span>
  );
}

export default function CasesScreen({ onBack }) {
  return (
    <div className="ref">
      <button className="ref__back" onClick={onBack}>
        ← Zurück
      </button>

      <h2 className="ref__section-title">Die fünf Fälle (Kasus)</h2>

      {CASES_INFO.map((c) => (
        <div key={c.name} className="ref__group">
          <h3 className="ref__group-title">
            {c.name} <span className="cases__question">— {c.question}</span>
          </h3>
          <p className="cases__description">{c.description}</p>
          <div className="cases__examples">
            {c.examples.map((ex, i) => (
              <div key={i} className="cases__example">
                <span className="cases__latin">
                  <HighlightedLatin text={ex.latin} highlight={ex.highlight} />
                </span>
                <span className="cases__german">{ex.german}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
