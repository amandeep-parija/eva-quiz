let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;

let currentSection = "";
let currentLevel = "easy";

let nextAction = null;


/* 🔥 RANDOM FUNCTION */
function getRandomQuestions(arr, count) {
  let shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/* 🔥 FILTER BY LEVEL */
function getQuestionsByLevel(section, level) {
  return quizData[section].filter(q => q.level === level);
}

function startQuiz(section) {
  currentSection = section;
  currentLevel = "easy";

  loadLevel();
}

/* 🔥 LOAD LEVEL */
function loadLevel() {
  let levelQuestions = getQuestionsByLevel(currentSection, currentLevel);

  currentQuestions = getRandomQuestions(
    levelQuestions,
    Math.min(10, levelQuestions.length)
  );

  currentIndex = 0;
  score = 0;

  document.getElementById("section-container").classList.add("hidden");
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  selectedAnswer = null;

  let q = currentQuestions[currentIndex];

  document.getElementById("question").innerText =
    `${currentLevel.toUpperCase()} - Q${currentIndex + 1}. ${q.question}`;

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

/* 🔥 NEXT BUTTON */
document.getElementById("next-btn").onclick = () => {
  if (selectedAnswer === null) {
    alert("Please select an option!");
    return;
  }

  let currentQ = currentQuestions[currentIndex];

  if (!currentQ) {
    checkLevelProgress();
    return;
  }

  if (selectedAnswer === currentQ.answer) {
    score++;
  }

  if (currentIndex === currentQuestions.length - 1) {
    checkLevelProgress();
    return;
  }

  currentIndex++;
  loadQuestion();
};

/* 🔥 LEVEL PROGRESSION */
function checkLevelProgress() {
  const passMarks = { easy: 7, medium: 8, hard: 9 };

  const formattedLevel =
    currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);

  let pass = score >= passMarks[currentLevel];

  if (currentLevel === "easy" && pass) {
    currentLevel = "medium";

    showResultCard(`Great job! 🎉
You scored ${score} / ${currentQuestions.length}.
🎯 Level: Easy
You’ve completed the Easy level — next challenge unlocked! 🚀`, "nextLevel");
  }

  else if (currentLevel === "medium" && pass) {
    currentLevel = "hard";

    showResultCard(`Awesome work! 🔥
You scored ${score} / ${currentQuestions.length}.
🎯 Level: Medium
You’ve completed the Medium level — final challenge unlocked!
This is your last round… finish strong! 💪🚀`, "nextLevel");
  }

  else if (currentLevel === "hard" && pass) {
    showFinalResult();
    return;
  }

  if (pass) {
    loadLevel();
  } else {
    showResultCard(`Good effort! 👍
You scored ${score} / ${currentQuestions.length}.
🎯 Level: ${formattedLevel}
You’re on the right track — every attempt helps you improve.
You need at least ${passMarks[currentLevel]} correct answers to clear this level.
Practice a bit more and come back stronger. You’ve got this! 🚀`, "home");

    goHome();
  }
}

/* 🔥 FINAL RESULT */
function showFinalResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  document.getElementById("result-text").innerText =
    `🎉 You cleared all levels!\nFinal Level Score: ${score} / ${currentQuestions.length}`;
}


function showResultCard(message, action) {
  document.getElementById("result-message").innerHTML =
    message.replace(/\n/g, "<br>");

  document.getElementById("result-card").classList.remove("hidden");

  nextAction = action;
}

function closeResult() {
  document.getElementById("result-card").classList.add("hidden");

  if (nextAction === "nextLevel") {
    loadLevel();
  } 
  else if (nextAction === "home") {
    goHome();
  }
}



function goHome() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("section-container").classList.remove("hidden");
}