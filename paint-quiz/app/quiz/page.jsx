"use client";
import React, { useCallback, useState } from "react";
import { quiz } from "../data.js";

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showActiveQuestion, setShowActiveQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
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

  const handleShowAnswers = useCallback(() => {
    setShowAnswers(!showAnswers);
  });

  return (
    <div className='container'>
      <div>
        {!showResult ? (
          <section
            className='quiz-container'
            aria-labelledby='questionSectionHeading'
          >
            <h1 className='header' id='questionSectionHeading'>
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
              <button onClick={nextQuestion}>next</button>
            ) : (
              <button disabled className='btn-disabled' onClick={nextQuestion}>
                next
              </button>
            )}
          </section>
        ) : (
          <section
            className='quiz-container'
            aria-labelledby='resultsSectionHeading'
          >
            <h3 id='resultsSectionHeading'>Your Results...</h3>
            <h3 className='results'>Overall: {(result.score / 10) * 100}%</h3>
            <h3>
              {result.score <= 2 ? <p>...You should feel shame.</p> : null}
            </h3>
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
            <button onClick={handleSubmit}>Restart</button>
            <button onClick={handleShowAnswers}>View Answers</button>
            {showAnswers ? (
              <section aria-labelledby='answersSectionHeading'>
                <div className='answer-container'>
                  <h4 id='answersSectionHeading'>Answers</h4>
                  {questions.map((question, index) => (
                    <div key={index} className='answer-section'>
                      <p className='answers-question'>
                        Question: {question.id}
                      </p>
                      <p className='correct-answer'>
                        Correct Answer: {question.correctAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </section>
        )}
      </div>
    </div>
  );
};

export default page;
