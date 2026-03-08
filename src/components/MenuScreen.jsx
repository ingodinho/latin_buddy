import "./MenuScreen.css";

export default function MenuScreen({
  onSelectCategory,
  onShowReference,
  onShowCases,
  onShowGenitiveAttribute,
  onShowAblativePrepRef,
  onShowQuestionWordsRef,
}) {
  return (
    <div className="menu-screen">
      <h1 className="menu-screen__title">Latin Buddy</h1>
      <p className="menu-screen__subtitle">
        Lerne lateinische Grammatik!
      </p>

      <div className="menu-screen__buttons">
        <span className="menu-screen__section-title">Grundübungen</span>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("declensions")}
        >
          Deklinationen
        </button>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("conjugations")}
        >
          Konjugationen
        </button>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("mixed")}
        >
          Beides zusammen
        </button>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("sentences")}
        >
          Satzanalyse
        </button>

        <span className="menu-screen__section-title">Kasus erkennen</span>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("genitive-sentences")}
        >
          Genetiv erkennen
        </button>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("ablative-sentences")}
        >
          Ablativ erkennen
        </button>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("ablative-preps")}
        >
          Ablativ-Präpositionen (Quiz)
        </button>

        <span className="menu-screen__section-title">Fragewörter</span>
        <button
          className="menu-screen__button menu-screen__button--primary"
          onClick={() => onSelectCategory("question-words")}
        >
          Fragewörter-Quiz
        </button>

        <span className="menu-screen__section-title">Wissensübersicht</span>
        <button
          className="menu-screen__button menu-screen__button--secondary"
          onClick={onShowCases}
        >
          Die fünf Fälle
        </button>
        <button
          className="menu-screen__button menu-screen__button--secondary"
          onClick={onShowReference}
        >
          Übersicht
        </button>
        <button
          className="menu-screen__button menu-screen__button--secondary"
          onClick={onShowGenitiveAttribute}
        >
          Genetiv als Attribut
        </button>
        <button
          className="menu-screen__button menu-screen__button--secondary"
          onClick={onShowAblativePrepRef}
        >
          Ablativ-Präpositionen
        </button>
        <button
          className="menu-screen__button menu-screen__button--secondary"
          onClick={onShowQuestionWordsRef}
        >
          Fragewörter (Übersicht)
        </button>
      </div>
    </div>
  );
}
