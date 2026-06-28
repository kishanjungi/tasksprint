"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Question = {
  id: string;
  question: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  correctAnswer: string;
};

export default function QuizPage() {
  const { categoryId } = useParams();

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [score, setScore] = useState(0);

  const [finished, setFinished] =
    useState(false);

  useEffect(() => {
    fetch(`/api/quiz/${categoryId}`)
      .then((res) => res.json())
      .then(setQuestions);
  }, [categoryId]);

  function handleAnswer(
    answer: string
  ) {
    const question =
      questions[currentQuestion];

    if (
      answer === question.correctAnswer
    ) {
      setScore((prev) => prev + 1);
    }

    const next =
      currentQuestion + 1;

    if (next >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQuestion(next);
    }
  }

  if (questions.length === 0) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">
          Quiz Finished
        </h1>

        <p className="text-2xl">
          Score: {score} /{" "}
          {questions.length}
        </p>
      </div>
    );
  }

  const q =
    questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-lg mb-2">
        Question {currentQuestion + 1}
        /{questions.length}
      </h2>

      <h1 className="text-2xl font-bold mb-6">
        {q.question}
      </h1>

      <div className="space-y-3">
        {[q.optionA, q.optionB, q.optionC, q.optionD].map(
          (option) => (
            <button
              key={option}
              className="block w-full border p-3 rounded text-left"
              onClick={() =>
                handleAnswer(option)
              }
            >
              {option}
            </button>
          )
        )}
      </div>
    </div>
  );
}