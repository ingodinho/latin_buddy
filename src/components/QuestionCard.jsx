import "./QuestionCard.css";

export default function QuestionCard({
  question,
  selectedAnswer,
  feedbackState,
  onAnswer,
  onNext,
}) {
  const getOptionClass = (option) => {
    if (!feedbackState) return "question-card__option";

    if (option === question.correctAnswer) {
      return "question-card__option question-card__option--correct";
    }
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return "question-card__option question-card__option--wrong";
    }
    return "question-card__option";
  };

  return (
    <div className="question-card">
      <p className="question-card__prompt">{question.prompt}</p>
      <p className="question-card__translation">
        ({question.word.translation})
      </p>
      {question.grammarInfo?.label && (
        <span className="question-card__badge">
          {question.grammarInfo.label}
        </span>
      )}
      <div className="question-card__options">
        {question.options.map((option) => (
          <button
            key={option}
            className={getOptionClass(option)}
            onClick={() => onAnswer(option)}
            disabled={!!feedbackState}
          >
            {option}
          </button>
        ))}
      </div>
      {feedbackState && (
        <button className="question-card__next" onClick={onNext}>
          Weiter
        </button>
      )}
    </div>
  );
}
