function buildQuiz() {
  const output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
        <br>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="slide">
    <div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join("")} </div>
  </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join(" ");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");

  let numIndoril = 0;
  let numRedoran = 0;
  let numTelvanni = 0;
  let numHlaalu = 0;
  let numDres = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.indorilAnswer) {
      numIndoril++;
      answerContainers[questionNumber].style.color = "green";
    } else if (userAnswer === currentQuestion.redoranAnswer) {
      numRedoran++;
      answerContainers[questionNumber].style.color = "red";
    } else if (userAnswer === currentQuestion.telvanniAnswer) {
      numTelvanni++;
      answerContainers[questionNumber].style.color = "brown";
    } else if (userAnswer === currentQuestion.hlaaluAnswer) {
      numHlaalu++;
      answerContainers[questionNumber].style.color = "yellow";
    } else if (userAnswer === currentQuestion.dresAnswer) {
      numDres++;
      answerContainers[questionNumber].style.color = "blue";
    }

    if (numIndoril > 2) {
      resultsContainer.innerHTML = `${numIndoril} out of ${myQuestions.length} for Indoril. You should join House Indoril!`;
    } else if (numRedoran > 2) {
      resultsContainer.innerHTML = `${numRedoran} out of ${myQuestions.length} for Redoran. You should join House Redoran!`;
    } else if (numTelvanni > 2) {
      resultsContainer.innerHTML = `${numTelvanni} out of ${myQuestions.length} for Telvanni. You should join House Telvanni!`;
    } else if (numHlaalu > 2) {
      resultsContainer.innerHTML = `${numHlaalu} out of ${myQuestions.length} for Hlaalu. You should join House Hlaalu!`;
    } else if (numDres > 2) {
      resultsContainer.innerHTML = `${numDres} out of ${myQuestions.length} for Dres. You should join House Dres!`;
    } else if (
      numDres + numIndoril + numRedoran + numTelvanni + numHlaalu <
      5
    ) {
      resultsContainer.innerHTML = "You didn't answer to all the questions";
    } else {
      resultsContainer.innerHTML =
        "Though choice. Reconsider your priorities and take the test again.";
    }
  });
}

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

const myQuestions = [
  {
    question: "Which deity you like the most?",
    answers: {
      a: "Almalexia",
      b: "Vivec",
      c: "Sotha Sil",
      d: "Tiber Septim",
      e: "Boethiah",
    },
    indorilAnswer: "a",
    redoranAnswer: "b",
    telvanniAnswer: "c",
    hlaaluAnswer: "d",
    dresAnswer: "e",
  },
  {
    question: "Where would you feel yourself the most comfortable?",
    answers: {
      a: "Hearthlands",
      b: "Frontier",
      c: "Isolated island",
      d: "Metropoliten",
      e: "Wastelands",
    },
    indorilAnswer: "a",
    redoranAnswer: "b",
    telvanniAnswer: "c",
    hlaaluAnswer: "d",
    dresAnswer: "e",
  },
  {
    question: "What would be the ideal role for you in a society?",
    answers: {
      a: "Priest",
      b: "Warrior",
      c: "Wizard",
      d: "Trader",
      e: "Slaver",
    },
    indorilAnswer: "a",
    redoranAnswer: "b",
    telvanniAnswer: "c",
    hlaaluAnswer: "d",
    dresAnswer: "e",
  },
  {
    question: "What is the attribute that describes you the most?",
    answers: {
      a: "Pious",
      b: "Loyal",
      c: "Intelligent",
      d: "Crafty",
      e: "Traditional",
    },
    indorilAnswer: "a",
    redoranAnswer: "b",
    telvanniAnswer: "c",
    hlaaluAnswer: "d",
    dresAnswer: "e",
  },
  {
    question: "What is your favourite material?",
    answers: {
      a: "Silver",
      b: "Bonemold",
      c: "Daedric",
      d: "Gold",
      e: "Netch leather",
    },
    indorilAnswer: "a",
    redoranAnswer: "b",
    telvanniAnswer: "c",
    hlaaluAnswer: "d",
    dresAnswer: "e",
  },
];

buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
