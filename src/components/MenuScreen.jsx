import "./MenuScreen.css";

export default function MenuScreen({ onSelectCategory, onShowReference, onShowCases }) {
  return (
    <div className="menu-screen">
      <h1 className="menu-screen__title">Latin Buddy</h1>
      <p className="menu-screen__subtitle">
        Lerne lateinische Grammatik!
      </p>

      <div className="menu-screen__buttons">
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
      </div>
    </div>
  );
}
