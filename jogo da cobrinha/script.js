const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
let dx = 0;
let dy = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
    if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && dx !== -1) {
        dx = 1;
        dy = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * box, food.y * box, box, box);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        // Food eaten
        food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    } else {
        // Remove tail segment
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        // Wall collision
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            // Self-collision
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over!');
        location.reload();
    }

    moveSnake();
    draw();
}

const gameInterval = setInterval(gameLoop, 100);
