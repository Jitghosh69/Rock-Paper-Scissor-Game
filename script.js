let userScore = 0;
let compScore = 0;
let drawScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const drawScorePara = document.querySelector("#draw-score");
const resetBtn = document.querySelector("#reset-btn");

// Sound effects
const winSound = new Audio("victory.mp3");
const loseSound = new Audio("Loose.mp3");
const drawSound = new Audio("Draw.mp3");
const clickSound = new Audio("click.mp3"); // ✅ new click sound

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  drawScore++;
  drawScorePara.innerText = drawScore;
  msg.innerText = "It's a draw! Try again.";
  msg.style.backgroundColor = "#081b31";
  drawSound.play();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    winSound.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lose! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    loseSound.play();
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

// Add event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    clickSound.play(); // ✅ play click sound on every choice
    playGame(userChoice);
  });
});

// Reset button logic
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  drawScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  drawScorePara.innerText = drawScore;
  msg.innerText = "Scores reset! Make your move!";
  msg.style.backgroundColor = "#081b31";
});
