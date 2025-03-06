import React, { useState, useEffect } from "react";
import "./Survey.css";

// const API_URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple"; // Example API
const API_URL = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=boolean"

function Survey({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q, index) => ({
          id: index,
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Shuffle answers
          correct: q.correct_answer,
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Handle answer selection
  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  // Navigate questions
  const nextQuestion = () => {
    console.log('isAnswered',answers[currentQuestion])
    if (answers[currentQuestion] === undefined) {
      alert("Please select an answer before proceeding.");
      return; // Prevents moving to the next question if no answer is selected
    }
    if (currentQuestion < questions.length - 1) {
      setLoading(true);
      setCurrentQuestion((prev) => prev + 1);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    } else {
      setShowResults(true); // Show results when last question is submitted
    }
  };

  const prevQuestion = () => {
    setLoading(true)
    setCurrentQuestion((prev) => prev - 1)
    setTimeout(() => {
      setLoading(false)
    }, 250);
  };

  // Ensure all answers are required
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="survey">
      <div className="card-container">
        {loading ? (
          <div className="loader"></div>
        ) : showResults ? (
          <div className="card">
            <h2>Survey Results</h2>
            <table className="results-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Your Answer</th>
                  {/* <th>Correct Answer</th>
                  <th>Result</th> */}
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => {
                  const isCorrect = answers[index] === q.correct;
                  return (
                    <tr key={index} className={isCorrect ? "correct" : "incorrect"}>
                      <td>{index + 1}</td>
                      <td dangerouslySetInnerHTML={{ __html: q.question }}></td>
                      <td dangerouslySetInnerHTML={{ __html: answers[index] || "Not answered" }}></td>
                      {/* <td dangerouslySetInnerHTML={{ __html: q.correct }}></td>
                      <td>{isCorrect ? "✅ Correct" : "❌ Incorrect"}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={onBack} className="back-btn">
              Back to Home
            </button>
          </div>
        ) : (
          <div className="card">
            <div className="options">
              <h2>{questions[currentQuestion].question}</h2>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={answers[currentQuestion] === option ? "selected" : ""}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="navigation">
              <button onClick={prevQuestion} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
            <button onClick={onBack} className="back-btn">
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Survey;
