// Initialize variables to track completion of levels
let levelsCompleted = 0;

// Function to start the game and reveal all sections
function startGame() {
    // Hide the Start Game Button
    document.getElementById("startButton").style.display = "none";
    
    // Show the Escape Room section
    document.getElementById("escape-room").style.display = "block";
    
    // Show the Snake Game section
    document.getElementById("snake-game-container").style.display = "block";
    
    // Show the Games section
    document.getElementById("games").style.display = "block";
}

// Function for the Find the Missing Wedding Shoe challenge
function findShoe() {
    document.getElementById("result").innerHTML = "You found the missing shoe! Now solve the next challenge!";
}

// Function for solving the Wedding Menu Riddle
function solveMenuRiddle() {
    const answer = prompt("What was the most popular dish at Dibbu's wedding?");
    if (answer.toLowerCase() === "biryani") {
        document.getElementById("result").innerHTML = "Correct! Now let's move to the next challenge!";
    } else {
        document.getElementById("result").innerHTML = "Oops! Try again!";
    }
}

// Function for dodging family members' marriage questions
function dodgeFamily() {
    document.getElementById("result").innerHTML = "You skillfully dodged the questions! On to the next challenge!";
}

// Function for saving money from the klepto friend
function saveMoney() {
    document.getElementById("result").innerHTML = "Phew! You saved the money! Now, you're one step closer to escaping!";
}

// Function to start the Snake Game
function startSnakeGame() {
    // Hide the Snake Game Start Button
    document.querySelector("#snake-game-container button").style.display = "none";
    
    // Initialize the canvas for Snake Game
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const canvasSize = 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Game variables
    let snake = [{ x: 10, y: 10 }];
    let direction = "RIGHT";
    let food = { x: 15, y: 15 };
    let score = 0;

    // Update the Snake Game every 100ms
    setInterval(() => {
        moveSnake();
        checkCollision();
        draw();
    }, 100);

    // Move the snake based on direction
    function moveSnake() {
        const head = { ...snake[0] };
        if (direction === "RIGHT") head.x++;
        else if (direction === "LEFT") head.x--;
        else if (direction === "UP") head.y--;
        else if (direction === "DOWN") head.y++;

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            food = generateFood();
        } else {
            snake.pop();
        }
    }

    // Check if the snake has hit a wall or itself
    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
            alert("Game Over! You hit a wall.");
            resetGame();
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                alert("Game Over! You ran into yourself.");
                resetGame();
            }
        }
    }

    // Generate random food position
    function generateFood() {
        return { x: Math.floor(Math.random() * canvasSize / 10), y: Math.floor(Math.random() * canvasSize / 10) };
    }

    // Draw the game on the canvas
    function draw() {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.fillStyle = "green";
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
        }

        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
    }

    // Reset the game after collision
    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = "RIGHT";
        score = 0;
        food = generateFood();
        draw();
    }

    // Listen for arrow key events to change direction
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });
}

// Function to track level completion
function levelCompleted(level) {
    levelsCompleted++;
    
    // Check if all levels are completed and show the final question
    if (levelsCompleted === 4) {
        document.getElementById("final-question").style.display = "block";
    }
}
