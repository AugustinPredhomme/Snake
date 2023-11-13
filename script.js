document.addEventListener("DOMContentLoaded", function () {
    let snakePosition = { x: 10, y: 10 };

    function moveLeft() {
        snakePosition.x -= 1;
        checkCollision();
        updateSnakePosition();
    }

    function moveRight() {
        snakePosition.x += 1;
        checkCollision();
        updateSnakePosition();
    }

    function moveUp() {
        snakePosition.y -= 1;
        checkCollision();
        updateSnakePosition();
    }

    function moveDown() {
        snakePosition.y += 1;
        checkCollision();
        updateSnakePosition();
    }

    function updateSnakePosition() {
        const snakeElement = document.getElementById("snake");
        snakeElement.style.gridColumn = snakePosition.x;
        snakeElement.style.gridRow = snakePosition.y;
    }

    function checkCollision() {
        if (
            snakePosition.x < 1 ||
            snakePosition.x > 20 ||
            snakePosition.y < 1 ||
            snakePosition.y > 20
        ) {
            alert("Game Over! Press SPACE to restart.");
            restartGame();
        }
    }

    function restartGame() {
        location.reload();
    }

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case " ":
                restartGame();
                break;
        }
    });

    spawnBonus();
    spawnBonus();
});
