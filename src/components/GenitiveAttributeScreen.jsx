import "./GenitiveAttributeScreen.css";
import { GENITIVE_ATTRIBUTE_INFO } from "../data/genitiveAttribute";

function HighlightedLatin({ text, highlight }) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <strong className="genattr__highlight">{highlight}</strong>
      {text.slice(idx + highlight.length)}
    </span>
  );
}

export default function GenitiveAttributeScreen({ onBack }) {
  const info = GENITIVE_ATTRIBUTE_INFO;

  return (
    <div className="ref">
      <button className="ref__back" onClick={onBack}>
        ← Zurück
      </button>

      <h2 className="ref__section-title">{info.title}</h2>
      <p className="genattr__intro">{info.intro}</p>

      <div className="ref__group">
        <h3 className="ref__group-title">Regeln</h3>
        <ul className="genattr__rules">
          {info.rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="ref__group">
        <h3 className="ref__group-title">Beispiele</h3>
        {info.examples.map((ex, i) => (
          <div key={i} className="genattr__example">
            <span className="genattr__latin">
              <HighlightedLatin text={ex.latin} highlight={ex.highlight} />
            </span>
            <span className="genattr__german">{ex.german}</span>
            <span className="genattr__explanation">{ex.explanation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
