import { useState } from "react";
import './App.css'
import bannerImage from "./assets/logo.png";
import Survey from "./Survey";

function App() {
  const [surveyStarted, setSurveyStarted] = useState(false);

  return (
    <div className="container">
      {!surveyStarted ? (
        <div className="content">
          <header className="banner">
            <img src={bannerImage} alt="Survey Banner" />
          </header>
          <h1>Welcome to the Survey</h1>
          <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae, quaerat suscipit magni nisi optio aliquid doloremque quidem et reiciendis fuga cupiditate numquam, quibusdam nam expedita esse? Laboriosam, sunt eum.</h6>
          <button onClick={() => setSurveyStarted(true)}>Start Survey</button>
        </div>
      ) : (
        <Survey onBack={() => setSurveyStarted(false)} />
      )}
    </div>
  );
}

export default App
