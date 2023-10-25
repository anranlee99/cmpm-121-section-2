import "./style.css";

const dino: HTMLElement = document.getElementById("dino")!;
const cactus: HTMLElement = document.getElementById("cactus")!;
const bird: HTMLElement = document.getElementById("bird")!;

const scoreText: HTMLElement = document.getElementById("scoreText")!;
let score = 0;
scoreText.textContent = "click to start!";
let isJumping = false;
let gameOver = true;

document.addEventListener("mousedown", () => jump());

function main(): void {
  if (!gameOver) {
    score++;
    scoreText.textContent = "Score: " + score;

    checkGameOver();
  }
  window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);

function jump(): void {
  if (!gameOver) {
    if (!isJumping) {
      isJumping = true;
      dino.classList.add("jump");
      setTimeout(renameJump, 500);
    }
  } else {
    startGame();
  }
}

function renameJump() {
  dino.classList.remove("jump");
  isJumping = false;
}

function removeObstacles() {
  cactus.classList.remove("cactusMove");
  bird.classList.remove("birdMove");
}

function checkGameOver() {
  if (!gameOver) {
    checkCollision();
  }
}
function checkCollision() {
  //get is dinosaur jumping
  const dinoTop = parseInt(
    window.getComputedStyle(dino).getPropertyValue("top"),
  );

  //get cactus position
  const cactusleft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left"),
  );

  //get bird position
  const birdleft = parseInt(
    window.getComputedStyle(bird).getPropertyValue("bottom"),
  );
  if (
    (dinoTop >= 150 && Math.abs(cactusleft) < 7) ||
    (dinoTop <= 55 && Math.abs(birdleft) < 11)
  ) {
    //end game
    console.log("player died!");
    scoreText.textContent = "Final Score: " + score + "! Click To Play Again!";
    gameOver = true;

    //reset player
    renameJump();

    //reset cactus
    removeObstacles();
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus.classList.add("cactusMove");
  bird.classList.add("birdMove");
}
