import "./AblativePrepScreen.css";
import { ABLATIVE_PREPOSITIONS_INFO } from "../data/ablativePrepositions";

export default function AblativePrepScreen({ onBack }) {
  const info = ABLATIVE_PREPOSITIONS_INFO;

  return (
    <div className="ref">
      <button className="ref__back" onClick={onBack}>
        ← Zurück
      </button>

      <h2 className="ref__section-title">{info.title}</h2>
      <p className="ablprep__intro">{info.intro}</p>

      {info.prepositions.map((prep) => (
        <div key={prep.preposition} className="ref__group">
          <h3 className="ref__group-title">
            {prep.preposition} <span className="ablprep__meaning">— {prep.meaning}</span>
          </h3>
          <div className="ablprep__examples">
            {prep.examples.map((ex, i) => (
              <div key={i} className="ablprep__example">
                <span className="ablprep__latin">{ex.latin}</span>
                <span className="ablprep__german">{ex.german}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
