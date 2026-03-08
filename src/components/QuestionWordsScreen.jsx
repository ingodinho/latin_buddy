import "./QuestionWordsScreen.css";
import { QUESTION_WORDS_INFO } from "../data/questionWords";

export default function QuestionWordsScreen({ onBack }) {
  const info = QUESTION_WORDS_INFO;

  return (
    <div className="ref">
      <button className="ref__back" onClick={onBack}>
        ← Zurück
      </button>

      <h2 className="ref__section-title">{info.title}</h2>
      <p className="qwords__intro">{info.intro}</p>

      {info.particles.map((p) => (
        <div key={p.particle} className="ref__group">
          <h3 className="ref__group-title">{p.particle}</h3>
          <p className="qwords__description">{p.description}</p>
          <p className="qwords__expected">
            Erwartete Antwort: <strong>{p.expectedAnswer}</strong>
          </p>
          <div className="qwords__examples">
            {p.examples.map((ex, i) => (
              <div key={i} className="qwords__example">
                <span className="qwords__latin">{ex.latin}</span>
                <span className="qwords__german">{ex.german}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
