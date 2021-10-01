import Field from "../img/field.png";
import Carrot from "../img/carrot.png";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const field = new Image();
field.src = Field;

const carrot = new Image();
carrot.src = Carrot;
ctx.drawImage(field, 0, 0);

const box = 32;

const startButton = document.getElementById("start-button");

const showStartButton = () => {
  startButton.classList.add("visible");
};
const hideStartButton = () => {
  startButton.classList.remove("visible");
};

const startGame = () => {
  hideStartButton();
  let score = 0;

  let carrotCoordinates = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  };

  let snake = [
    {
      x: 9 * box,
      y: 10 * box,
    },
  ];

  let direction = "right";

  const directionSnake = (event) => {
    event.preventDefault();
    if (event.key === "ArrowLeft" && direction !== "right") {
      direction = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
      direction = "right";
    } else if (event.key === "ArrowUp" && direction !== "down") {
      direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
      direction = "down";
    }
  };

  document.addEventListener("keydown", directionSnake);

  const drawElementGame = () => {
    ctx.drawImage(field, 0, 0);

    ctx.drawImage(carrot, carrotCoordinates.x, carrotCoordinates.y);

    ctx.font = "46px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(score, 70, 54);

    snake.forEach((s, index) => {
      if (index === 0) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "green";
      }
      ctx.fillRect(s.x, s.y, box, box);
    });

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === carrotCoordinates.x && snakeY === carrotCoordinates.y) {
      score++;
      carrotCoordinates = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
    } else {
      snake.pop();
    }

    if (
      snakeX < box ||
      snakeX > box * 17 ||
      snakeY < 3 * box ||
      snakeY > 17 * box
    ) {
      clearInterval(game);
      // alert("Game is over");
      showStartButton();
      document.removeEventListener("keydown", directionSnake);
      return;
    }

    if (direction === "right") snakeX += box;
    if (direction === "left") snakeX -= box;
    if (direction === "up") snakeY -= box;
    if (direction === "down") snakeY += box;

    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    snake.unshift(newHead);
  };

  const game = setInterval(drawElementGame, 200);
};

startButton.addEventListener("click", startGame);
