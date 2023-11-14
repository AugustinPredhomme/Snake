let snakePosition = { x: 10, y: 10 };

let direction = "up";

let score = 0;

function move() {
    switch (direction) {
        case "up":
            snakePosition.y--;
            break;
        case "down":
            snakePosition.y++;
            break;
        case "left":
            snakePosition.x--;
            break;
        case "right":
            snakePosition.x++;
            break;
    }

    redrawSnake();

    checkCollisions();
}

function redrawSnake() {
    const snake = document.getElementById("snake");
    const bodyParts = snake.getElementsByClassName("body");

    for (let i = bodyParts.length - 1; i > 0; i--) {
        const prevBodyPart = bodyParts[i - 1];
        const currentBodyPart = bodyParts[i];

        currentBodyPart.style.gridColumn = prevBodyPart.style.gridColumn;
        currentBodyPart.style.gridRow = prevBodyPart.style.gridRow;
    }

    const head = bodyParts[0];
    head.style.gridColumn = snakePosition.x + 1;
    head.style.gridRow = snakePosition.y + 1;
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;
}

function checkCollisions() {
    if (
        snakePosition.x < 0 ||
        snakePosition.x >= 20 ||
        snakePosition.y < 0 ||
        snakePosition.y >= 20
    ) {
        alert("Game over! Press SPACE to restart.");
        restartGame();
    }

    const bonuses = document.querySelectorAll(".bonus");
    bonuses.forEach(bonus => {
        const bonusPosition = {
            x: parseInt(bonus.style.gridColumn),
            y: parseInt(bonus.style.gridRow) - 1
        };

        if (
            bonusPosition.x === snakePosition.x &&
            bonusPosition.y === snakePosition.y
        ) {
            score++;

            updateScore();

            bonus.remove();

            spawnBonus();

            growSnake();
        }
    });
}

function spawnBonus() {
    const bonuses = document.getElementById("bonuses");

    const bonus = document.createElement("div");
    bonus.classList.add("bonus");

    let randomX, randomY;
    do {
        randomX = Math.floor(Math.random() * 20);
        randomY = Math.floor(Math.random() * 20);
    } while (
        bonuses.querySelector(`.bonus[x="${randomX}"][y="${randomY}"]`) !== null ||
        (randomX === snakePosition.x && randomY === snakePosition.y)
    );

    bonus.style.gridColumn = randomX;
    bonus.style.gridRow = randomY;

    bonuses.appendChild(bonus);
}


function growSnake() {
    const snake = document.getElementById("snake");
    const bodyPart = document.createElement("div");
    bodyPart.classList.add("body");
    snake.appendChild(bodyPart);
}

function restartGame() {
    snakePosition = { x: 10, y: 10 };

    const snake = document.getElementById("snake");
    while (snake.firstChild) {
        snake.firstChild.remove();
    }

    const bonuses = document.getElementById("bonuses");
    while (bonuses.firstChild) {
        bonuses.firstChild.remove();
    }

    direction = "up";
    score = 0;

    for (let i = 0; i < 3; i++) {
        growSnake();
    }

    for (let i = 0; i < 2; i++) {
        spawnBonus();
    }
}

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
        case " ":
            restartGame();
            break;
    }
});

spawnBonus();
spawnBonus();

updateScore();

setInterval(move, 500);
