const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let currentTime = 60;
let timer = null;
let hitPosition;

function randomSquare() {

    squares.forEach(function(square) {
        square.classList.remove("mole");
    });

    let randomPosition = squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;
}

squares.forEach(function(square) {
    square.addEventListener("mousedown", function() {
        if (square.id === hitPosition) {
            result++
            score.textContent = result;
            hitPosition = null;
            square.classList.remove("mole");
        }
    });
});

function moveMole() {
    timer = setInterval(randomSquare, 500);
}

moveMole();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countDownTimer);
        clearInterval(timer);
        alert("Game Over! You score is " + result);
    }
}

let countDownTimer = setInterval(countDown, 1000);