"use client";
import React, { useState } from "react";
import { quiz } from "../data.js";
import { useCallback } from "react";

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showActiveQuestion, setShowActiveQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { answers, correctAnswer } = questions[activeQuestion];

  const handleSubmit = useCallback(() => {
    window.location.reload();
    setShowActiveQuestion(true);
  });

  const onAnswerSelected = (answer, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (answer.id === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='container'>
      <div>
        {!showResult ? (
          <div className='quiz-container'>
            <h1 className='header'>
              Question: {activeQuestion + 1}
              <span>/{questions.length}</span>
            </h1>

            <div className='question'>
              <h2>{questions[activeQuestion].question}</h2>
            </div>

            {answers.map((answer, index) => (
              <li
                key={index}
                className={
                  selectedAnswerIndex === index ? "li-selected" : "li-hover"
                }
                onClick={() => onAnswerSelected(answer, index)}
                style={{ backgroundColor: `${answer.code}` }}
              >
                <div className='answer-text'>
                  <p>{answer.name}</p>
                  <p>{answer.swatch}</p>
                </div>
              </li>
            ))}
            {checked ? (
              <button className='btn' onClick={nextQuestion}>
                next
              </button>
            ) : (
              <button disabled className='btn-disabled' onClick={nextQuestion}>
                next
              </button>
            )}
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Your Results...</h3>
            <h3 className='results'>Overall: {(result.score / 5) * 100}%</h3>
            <h3 className='comment'>
              {result.score <= 2 ? <p>...You should feel shame.</p> : null}
            </h3>
            <div className='results'>
              <p>
                Total Questions: <span>{questions.length}</span>
              </p>
              <p>
                Total Score: <span>{result.score}</span>
              </p>
              <p>
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers: <span>{result.wrongAnswers}</span>
              </p>
            </div>
            <button className='btn' onClick={handleSubmit}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
