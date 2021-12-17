var myTimer = document.querySelector("#timer");
var timer = 60;
var questionNumber = 1;
var sectionEl = document.createElement("section");
var mainSection = document.querySelector("#main-section");
var writeQuestion = document.createElement("h1");






var startToQuestions = function(event) {
    //when you click the start button, clear the main contents and pull up the first question
    var targetEl =event.target;

    if (targetEl.matches(".start-button")) {
        clearMain();
        mainSection.className = "main-for-questions"
        sectionEl.className = "q-and-a"

        startTimer();

    }




    mainSection.appendChild(sectionEl)
}


<!-- for question and answer -->
        <section class="q-and-a">

            <h1 class="question-text">How many licks does it take to get to the center of a tootsie pop?</h1>

            <ol>

                <li class="answer selectable">

                    answer one

                </li>

                <li class="answer selectable">

                    answer two
    
                </li>

                <li class="answer selectable">

                    answer three
    
                </li>

                <li class="answer selectable">

                    answer four
    
                </li>

            </ol>

        </section>

        <div class="correctness">

            <h2>Wrong!</h2>

        </div>


//create question objects
var questionOne = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerOne: "Javascript",
    asnwerTwo: "terminal/bash",
    answerThree: "for loops",
    answerFour: "console.log",
    correct: 4,
    questionID: 1
};
var questionTwo = {
    question: "Arrays in Javascript can be used to store _______.",
    answerOne: "numbers and strings",
    asnwerTwo: "other arrays",
    answerThree: "booleans",
    answerFour: "all of the above",
    correct: 4,
    questionID: 2
};
var questionThree = {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answerOne: "commas",
    asnwerTwo: "curly brackets",
    answerThree: "quotes",
    answerFour: "parenthesis",
    correct: 3,
    questionID: 3
};
var questionFour = {
    question: "Commonly used data types DO NOT include:",
    answerOne: "strings",
    asnwerTwo: "booleans",
    answerThree: "alerts",
    answerFour: "numbers",
    correct: 3,
    questionID: 4
};
var questionFive = {
    question: "The condition in an if / else statement is enclosed with ________.",
    answerOne: "quotes",
    asnwerTwo: "curly brackets",
    answerThree: "parenthesis",
    answerFour: "square brackets",
    correct: 3,
    questionID: 5
};

var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

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

    else {
        changeQuestion();
    }
}

var changeQuestion = function() {
    //display correctness of previous question


}

var clearMain = function() {
    //i want to remove the contents of the main section so that in the transition I can just change the class name for styles
    //and append the already styled elements.
    main.remove();
    //maybe do if statements and keep track of the state because not just the main element changes. I think there are three
    //total different layouts. or maybe have different functions for the different transitions that run the clearMain function.
}


    

//when I click a button to move on from the question slides
//section classname=q-and-a.remove() and div classname = correctness.remove()

mainSection.addEventListener("click", startToQuestions());
