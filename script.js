// Each question is one object in this array.
// Teammates can copy one object, change its text, and add it to the array.
const questions = [
  {
    question: "Which country is sushi originally from?",
    choices: ["China", "Japan", "Korea"],
    correctAnswer: 1 // 0 = A, 1 = B, 2 = C
  }
];

// Save the page elements that the quiz needs to change.
const welcomeScreen = document.querySelector("#welcome-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-button");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const questionNumber = document.querySelector("#question-number");
const scoreDisplay = document.querySelector("#score-display");
const progressBar = document.querySelector("#progress-bar");
const questionText = document.querySelector("#question-text");
const answerButtons = document.querySelector("#answer-buttons");
const feedback = document.querySelector("#feedback");
const resultTitle = document.querySelector("#result-title");
const finalScore = document.querySelector("#final-score");
const resultMessage = document.querySelector("#result-message");

let currentQuestionIndex = 0;
let score = 0;

// Event listener 1: start the quiz.
startButton.addEventListener("click", startQuiz);

// Event listener 2: move to the next question.
nextButton.addEventListener("click", goToNextQuestion);

// Event listener 3: restart the quiz from the result screen.
restartButton.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  welcomeScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  questionText.textContent = currentQuestion.question;

  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, choiceIndex) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(65 + choiceIndex);

    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `<span class="answer-letter">${letter}</span><span>${choice}</span>`;

    // Each answer button listens for a click.
    button.addEventListener("click", function () {
      checkAnswer(choiceIndex, button);
    });

    answerButtons.appendChild(button);
  });
}

function checkAnswer(selectedAnswer, selectedButton) {
  const currentQuestion = questions[currentQuestionIndex];
  const allAnswerButtons = answerButtons.querySelectorAll(".answer-button");

  // Stop every answer button after the player has made a choice.
  allAnswerButtons.forEach(function (button, buttonIndex) {
    button.disabled = true;

    if (buttonIndex === currentQuestion.correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === currentQuestion.correctAnswer) {
    score = score + 1;
    scoreDisplay.textContent = `Score: ${score}`;
    feedback.textContent = "Correct! That answer is deliciously right. 🎉";
    feedback.classList.add("correct-feedback");
  } else {
    selectedButton.classList.add("wrong");
    const correctChoice = currentQuestion.choices[currentQuestion.correctAnswer];
    feedback.textContent = `Not quite! The correct answer is ${correctChoice}.`;
    feedback.classList.add("wrong-feedback");
  }

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerHTML = "See My Score <span aria-hidden=\"true\">→</span>";
  } else {
    nextButton.innerHTML = "Next Question <span aria-hidden=\"true\">→</span>";
  }

  nextButton.classList.remove("hidden");
}

function goToNextQuestion() {
  currentQuestionIndex = currentQuestionIndex + 1;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScore.textContent = `You scored ${score} out of ${questions.length}.`;

  if (score === questions.length) {
    resultTitle.textContent = "Five-star foodie!";
    resultMessage.textContent = "A perfect score — compliments to the chef!";
  } else if (score >= Math.ceil(questions.length / 2)) {
    resultTitle.textContent = "Tasty work!";
    resultMessage.textContent = "You know your snacks. Try again for a perfect score!";
  } else {
    resultTitle.textContent = "Good first bite!";
    resultMessage.textContent = "Every great foodie starts somewhere. Give it another try!";
  }
}

