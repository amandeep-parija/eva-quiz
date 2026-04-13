let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;


function getRandomQuestions(arr, count) {
  let shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function startQuiz(section) {
  currentQuestions = getRandomQuestions(
    quizData[section],
    Math.min(30, quizData[section].length)
  );

  currentIndex = 0;
  score = 0;

  document.getElementById("section-container").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  selectedAnswer = null;

  let q = currentQuestions[currentIndex];

  document.getElementById("question").innerText = 
    `Q${currentIndex + 1}. ${q.question}`;

  document.getElementById("question-image").src = q.image;

  let optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    let btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => {
      selectedAnswer = index;

      let allBtns = optionsContainer.querySelectorAll("button");
      allBtns.forEach(b => b.style.background = "#1e293b");

      btn.style.background = "#22c55e";
    };

    optionsContainer.appendChild(btn);
  });
}

document.getElementById("next-btn").onclick = () => {
  if (selectedAnswer === null) {
    alert("Please select an option!");
    return;
  }

  let correctAnswer = currentQuestions[currentIndex].answer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  currentIndex++;

  if (currentIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  let performance = "";

  let percent = (score / currentQuestions.length) * 100;

  if (percent >= 80) performance = "Excellent 🔥";
  else if (percent >= 50) performance = "Good 👍";
  else performance = "Needs Improvement ⚠️";

  document.getElementById("result-text").innerText =
    `Your Score: ${score} / ${currentQuestions.length} \n${performance}`;
}

function goHome() {
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("section-container").classList.remove("hidden");
}





