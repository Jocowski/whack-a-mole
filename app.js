const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const timeLeftDisplay = document.querySelector("#time-left");
const restartButton = document.querySelector("#restart-btn");

let score = 0;
let currentTime = 60;
let hitPosition = null;
let moleTimer = null;
let countdownTimer = null;
let moleSpeed = 500;

// Generate dynamic grid
function createGrid(size = 3) {
    grid.innerHTML = ""; // Clear any existing squares
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 1; i <= size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", i);
        grid.appendChild(square);

        square.addEventListener("mousedown", () => {
            if (square.id === hitPosition) {
                score++;
                scoreDisplay.textContent = score;
                hitPosition = null;
                square.classList.remove("mole");
            }
        });
    }
}

// Randomly place the mole
function randomSquare() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.classList.remove("mole"));

    const randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add("mole");
    hitPosition = randomSquare.id;
}

// Move the mole
function moveMole() {
    moleTimer = setInterval(() => {
        randomSquare();

        // Adjust mole speed as time decreases
        if (currentTime <= 40 && currentTime > 20) {
            clearInterval(moleTimer);
            moleSpeed = 400;
            moveMole();
        } else if (currentTime <= 20) {
            clearInterval(moleTimer);
            moleSpeed = 300;
            moveMole();
        }
    }, moleSpeed);
}

// Countdown timer
function startCountdown() {
    countdownTimer = setInterval(() => {
        currentTime--;
        timeLeftDisplay.textContent = currentTime;

        if (currentTime <= 0) {
            clearInterval(countdownTimer);
            clearInterval(moleTimer);
            alert(`Game Over! Your score is ${score}`);
        }
    }, 1000);
}

// Start/restart the game
function startGame() {
    score = 0;
    currentTime = 60;
    moleSpeed = 500;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = currentTime;

    clearInterval(moleTimer);
    clearInterval(countdownTimer);

    createGrid();
    moveMole();
    startCountdown();
}

// Event listener for restart button
restartButton.addEventListener("click", startGame);

startGame();
