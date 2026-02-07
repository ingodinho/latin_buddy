import "./ResultScreen.css";

export default function ResultScreen({ questions, answers, onRestart }) {
  const correctCount = answers.filter(
    (a, i) => a === questions[i].correctAnswer
  ).length;

  const total = questions.length;
  const mistakes = questions
    .map((q, i) => ({ question: q, given: answers[i] }))
    .filter((entry) => entry.given !== entry.question.correctAnswer);

  const getMessage = () => {
    const ratio = correctCount / total;
    if (ratio === 1) return "Perfekt! Alle richtig!";
    if (ratio >= 0.8) return "Sehr gut gemacht!";
    if (ratio >= 0.5) return "Gut, aber da geht noch mehr!";
    return "Weiter üben, du schaffst das!";
  };

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">Ergebnis</h1>
      <p className="result-screen__score">
        {correctCount} / {total}
      </p>
      <p className="result-screen__message">{getMessage()}</p>

      {mistakes.length > 0 && (
        <div className="result-screen__mistakes">
          <h2 className="result-screen__mistakes-title">Fehler</h2>
          {mistakes.map((m) => (
            <div key={m.question.id} className="result-screen__mistake">
              <p className="result-screen__mistake-question">
                {m.question.prompt}
              </p>
              <div className="result-screen__mistake-answer">
                <span className="result-screen__mistake-wrong">{m.given}</span>
                <span className="result-screen__mistake-correct">
                  {m.question.correctAnswer}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="result-screen__button" onClick={onRestart}>
        Nochmal spielen
      </button>
    </div>
  );
}
