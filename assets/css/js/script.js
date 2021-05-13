// Grab from html variables

var header = document.querySelector("#header");

var main = document.querySelector("#main");

var content = document.querySelector("#content");

var startButton = document.querySelector("#startButton");

var timer = document.querySelector("#timer");

var score = document.querySelector("#score");

var result = document.querySelector("#result");

var enterInfo = document.querySelector("#hs-text").style.visibility = "hidden";

var highscores = document.querySelector("#hScores");

var scoreList = [];

var currentScore = 0;

var timeLeft = 60;

var currentQuestionIndex = 0;
// gameplay question selector logic
function getQuestion() {
    content.textContent = "";
    result.textContent = "";
    var currentQuestion = Questions[currentQuestionIndex];
    header.textContent = currentQuestion.title;
    score.textContent = currentScore;
    timer.textContent = timeLeft;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("value", currentQuestion.choices[i]);
        choiceButton.textContent = currentQuestion.choices[i];
        choiceButton.onclick = choiceSelect;
        content.appendChild(choiceButton);
    }
}

function choiceSelect() {
    if(this.value !== Questions[currentQuestionIndex].correctAnswer) {
        timeLeft -= 10;
        result.textContent = "Incorrect :(";
    }
    else {
        currentScore += 10;
        result.textContent = "Correct";
    }
    currentQuestionIndex ++;
    if(currentQuestionIndex === Questions.length) {
        gameOver();
    }
    else {
        getQuestion();
    }
};
// timer starter+decrementer
function startTimer() {
    var timeInterval = setInterval(function() {
        timer.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (currentQuestionIndex === Questions.length) {
            timer.content = "";
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};
// game over and high score storer i haven't figured out
function gameOver() {
    result.textContent = "";
    timer.textContent = "";
    header.textContent = "GAME OVER!";
    content.textContent = "Submit your score and initials! ";
    score.textContent = "Your score: " + currentScore;
    showform()
};

startButton.addEventListener("click", function() {
    content.textContent = "";
    getQuestion();
    startTimer();    
});