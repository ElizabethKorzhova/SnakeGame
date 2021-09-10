import Field from "../img/field.png";
import Carrot from "../img/carrot.png";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const field = new Image();
field.src = Field;

const carrot = new Image();
carrot.src = Carrot;

const box = 32;
let score = 0;

let carrotCoordinates = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let direction;

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

  snake.forEach((s, index) => {
    if (index === 0) {
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = "green";
    }
    ctx.fillRect(s.x, s.y, box, box);
  });

  ctx.fillStyle = "white";
  ctx.font = "36px sans-serif";
  ctx.fillText(score, box * 2.2, box * 1.5);

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
    snakeY > box * 14 ||
    snakeY < 3 * box ||
    snakeY > 15 * box
  )
    clearInterval(game);

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
