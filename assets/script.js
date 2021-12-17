var myTimer = document.querySelector("#timer")
var timer = 60;
var questionNumber = 1
var questionOne = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerOne: "Javascript",
    asnwerTwo: "terminal/bash",
    answerThree: "for loops",
    answerFour: "console.log",
    correct: 4
}
var questions = [questionOne, ]

var startTimer = function() {
    var timerInterval = setInterval(function() {
        if (timer >= 0) {
            myTimer.innerHTML = "Time: " + timer;
            timer --;
        }
        else {
            clearInterval(timerInterval);
        }
    }, 1000)
}

var correctCheck = function() {
    //when one of the .answer class is clicked, display wrong or incorrect in .correctness dispatchEvent
    if (questionNumber > 6) {
        //we want to transition to the all done slide and clear the q-and-a, answers and correctness content
        clearMain();
    }
    changeQuestion();
}

var changeQuestion = function() {
    //display
}

var clearMain = function() {
    //maybe do if statements and keep track of the state because not just the main element changes. I think there are three
    //total different layouts. or maybe have different functions for the different transitions that run the clearMain function.
}


//when I click a button to move on from the question slides
//section classname=q-and-a.remove() and div classname = correctness.remove()