document.addEventListener("DOMContentLoaded", function () {
    let snakePosition = { x: 10, y: 10 };

    function moveLeft() {
        snakePosition.x -= 1;
        updateSnakePosition();
    }

    function moveRight() {
        snakePosition.x += 1;
        updateSnakePosition();
    }

    function moveUp() {
        snakePosition.y -= 1;
        updateSnakePosition();
    }

    function moveDown() {
        snakePosition.y += 1;
        updateSnakePosition();
    }

    function updateSnakePosition() {
        const snakeElement = document.getElementById("snake");
        snakeElement.style.gridColumn = snakePosition.x;
        snakeElement.style.gridRow = snakePosition.y;
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
        }
    });
});
