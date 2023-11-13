document.addEventListener("DOMContentLoaded", function () {
    let snakePosition = { x: 10, y: 10 };
    let score = 0;

    function moveLeft() {
        snakePosition.x -= 1;
        checkCollision();
        checkBonusCollision();
        updateSnakePosition();
    }

    function moveRight() {
        snakePosition.x += 1;
        checkCollision();
        checkBonusCollision();
        updateSnakePosition();
    }

    function moveUp() {
        snakePosition.y -= 1;
        checkCollision();
        checkBonusCollision();
        updateSnakePosition();
    }

    function moveDown() {
        snakePosition.y += 1;
        checkCollision();
        checkBonusCollision();
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

    function spawnBonus() {
        const bonusesElement = document.getElementById("bonuses");
    
        bonusesElement.innerHTML = "";
    
        const bonusPosition = {
            x: Math.floor(Math.random() * 20) + 1,
            y: Math.floor(Math.random() * 20) + 1
        };
    
        const bonusElement = document.createElement("div");
        bonusElement.className = "bonus";
        bonusElement.style.gridColumn = bonusPosition.x;
        bonusElement.style.gridRow = bonusPosition.y;
    
        bonusesElement.appendChild(bonusElement);
    }

    function checkBonusCollision() {
        const snakeElement = document.getElementById("snake");
        const bonuses = document.querySelectorAll(".bonus");

        bonuses.forEach((bonus) => {
            if (bonus && isColliding(snakeElement, bonus)) {
                score += 1;
                updateScore();
                bonus.remove();
                spawnBonus();
            }
        });
    }

    function isColliding(elem1, elem2) {
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    function updateScore() {
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = `Score: ${score}`;
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

    updateScore();
});
