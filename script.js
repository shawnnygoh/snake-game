let pixelSize = 20;
let rows = 20;
let cols = 20;
let board;
let ctx;
let score = 0;

let snakeX = pixelSize * 5;
let snakeY = pixelSize * 5;

let snake = [];

let speedX = 0;
let speedY = 0;
 
let foodX;
let foodY;
 
let gameOver = false;

function newGame() {
    scoreBoard = document.getElementById("scoreBoard");
    gameBoard = document.getElementById("gameBoard");
    newGameModal = document.getElementById("newGameModal")
    newGameModal.classList.add("hidden");
    gameBoard.height = rows * pixelSize;
    gameBoard.width = cols * pixelSize;
    ctx = gameBoard.getContext("2d");
    generateFood();
    document.addEventListener("keyup", move);
    setInterval(gameUpdate, 1500 / 10);
}

function gameUpdate() {
    if (gameOver) {
        return;
    }
 
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
 
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, pixelSize, pixelSize);
 
    if (snakeX == foodX && snakeY == foodY) {
        snake.push([foodX, foodY]);
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        generateFood();
    }
 
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }
    if (snake.length) {
        snake[0] = [snakeX, snakeY];
    }
 
    ctx.fillStyle = "green";
    snakeX += speedX * pixelSize;
    snakeY += speedY * pixelSize;
    ctx.fillRect(snakeX, snakeY, pixelSize, pixelSize);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i][0], snake[i][1], pixelSize, pixelSize);
    }
 
    if (snakeX < 0 
        || snakeX > cols * pixelSize 
        || snakeY < 0 
        || snakeY > rows * pixelSize) { 
        gameOver = true;
        newGameModal.classList.remove("hidden");
    }
 
    for (let i = 0; i < snake.length; i++) {
        if (snakeX == snake[i][0] && snakeY == snake[i][1]) { 
            gameOver = true;
            newGameModal.classList.remove("hidden");
        }
    }
}

function generateFood() {
    foodX = Math.floor(Math.random() * cols) * pixelSize; 
    foodY = Math.floor(Math.random() * rows) * pixelSize; 
}

function move(m) {
    if (m.code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    } else if (m.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (m.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (m.code == "ArrowRight" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}