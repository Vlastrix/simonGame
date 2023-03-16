
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    min = Math.ceil(0);
    max = Math.floor(4);
    var randomNumber = Math.floor(Math.random() * (max - min) + min);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {nextSequence()}, 1000);
        }
    } else {
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 200);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(".btn").on("click", function() {
    if (started === true) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});


$(document).keypress(function() {
    if (started !== true){
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});






