import { useState, useCallback } from "react";
import "./App.css";
import { generateQuestions } from "./utils/quizEngine";
import MenuScreen from "./components/MenuScreen";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import ReferenceScreen from "./components/ReferenceScreen";

const QUESTION_COUNT = 10;

function App() {
  const [screen, setScreen] = useState("menu");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedbackState, setFeedbackState] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const startQuiz = useCallback((category) => {
    const q = generateQuestions(category, QUESTION_COUNT);
    setQuestions(q);
    setCurrentIndex(0);
    setAnswers([]);
    setFeedbackState(null);
    setSelectedAnswer(null);
    setScreen("quiz");
  }, []);

  const handleAnswer = useCallback(
    (answer) => {
      if (feedbackState) return;
      const isCorrect = answer === questions[currentIndex].correctAnswer;
      setSelectedAnswer(answer);
      setFeedbackState(isCorrect ? "correct" : "wrong");
    },
    [feedbackState, questions, currentIndex]
  );

  const handleNext = useCallback(() => {
    setAnswers((prev) => [...prev, selectedAnswer]);
    setFeedbackState(null);
    setSelectedAnswer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setScreen("result");
    }
  }, [selectedAnswer, currentIndex, questions.length]);

  const goToMenu = useCallback(() => {
    setScreen("menu");
  }, []);

  if (screen === "menu") {
    return (
      <MenuScreen
        onSelectCategory={startQuiz}
        onShowReference={() => setScreen("reference")}
      />
    );
  }

  if (screen === "reference") {
    return <ReferenceScreen onBack={goToMenu} />;
  }

  if (screen === "result") {
    return (
      <ResultScreen
        questions={questions}
        answers={answers}
        onRestart={goToMenu}
      />
    );
  }

  return (
    <>
      <ProgressBar current={currentIndex} total={questions.length} />
      <QuestionCard
        question={questions[currentIndex]}
        selectedAnswer={selectedAnswer}
        feedbackState={feedbackState}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </>
  );
}

export default App;
