let quizData = [
  {
    question: "How old is Zehra?",
    a: "25",
    b: "29",
    c: "32",
    d: "38",
    correct: "b",
  },
  {
    question: "Who is the President of UK?",
    a: "I don't know",
    b: "Elizabeth",
    c: "Mabel Matiz",
    d: "Boris Johnson",
    correct: "d",
  },
  {
    question: "Where is Brad Pitt from?",
    a: "Venezuela",
    b: "Colombia",
    c: "US",
    d: "UK",
    correct: "c",
  },
];

let quiz = document.getElementById("container");
let answerEls = document.querySelectorAll(".answer");
let questionText = document.getElementById("question-text");
let a_text = document.getElementById("a_text");
let b_text = document.getElementById("b_text");
let c_text = document.getElementById("c_text");
let d_text = document.getElementById("d_text");
let button = document.getElementById("submit");

let arrayIndex = 0;
let score = 0;

loadQuestions();
function loadQuestions() {
  deselectedAnswers();
  let elm = quizData[arrayIndex];
  questionText.innerText = elm.question;
  a_text.innerText = elm.a;
  b_text.innerText = elm.b;
  c_text.innerText = elm.c;
  d_text.innerText = elm.d;
}

function deselectedAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

button.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer == quizData[arrayIndex].correct) {
      score++;
    }
    arrayIndex++;
    if (arrayIndex < quizData.length) {
      loadQuestions();
    } else {
      quiz.innerHTML = `<h2>You finished.Thank you! Your score is ${score}/${quizData.length}! </h2>
      <button onclick="location.reload()">Reload</button>`;
    }
  }
});

function getSelected() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

for (let i = 0; i < answerEls.length; i++) {
  let check = answerEls[i];
  check.addEventListener("click", (event) => {
    clearOthers();
    event.target.checked = true;
  });
}
let clearOthers = function () {
  for (let i = 0; i < answerEls.length; i++) {
    answerEls[i].checked = false;
  }
};
