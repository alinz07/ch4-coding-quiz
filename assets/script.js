//create question objects
var questionOne = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    1: "Javascript",
    2: "terminal/bash",
    3: "for loops",
    4: "console.log",
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

var myTimer = document.querySelector("#timer");
var timer = 60;
var questionNumber = 0;
var mainSection = document.querySelector(".main");


var startToQuestions = function (event) {
    //when you click the start button, clear the main contents and pull up the first question
    var targetEl = event.target;
    //console.log(targetEl);

    var generateAnswers = function(questionNumber) {

        var answerList = document.createElement("ol");
        
        var whichQuestion = questions[questionNumber] 
    
        for (var i =1; i<5; i++) {
            var answer = document.createElement("li");
            answer.className = "answer selectable";
            answer.innerHTML = whichQuestion[i];
            answerList.appendChild(answer)
        }
    
        sectionEl.appendChild(answerList)
    }

    if (targetEl.matches(".start-button")) {

        clearMain();

        mainSection.className = "main-for-questions"

        var sectionEl = document.createElement("section");
        sectionEl.className = "q-and-a"

        //write another function to generate question and use questionNumber counter
        var h1El = document.createElement("h1");
        h1El.className = "question-text";
        h1El.innerHTML = "How many licks does it take to get to the center of a tootsie pop?"
        sectionEl.appendChild(h1El);

        generateAnswers(questionNumber);

        mainSection.appendChild(sectionEl)

        startTimer();
    }
}


// <!-- for question and answer -->
//         <section class="q-and-a">

//             <h1 class="question-text">How many licks does it take to get to the center of a tootsie pop?</h1>

//             <ol>

//                 <li class="answer selectable">

//                     answer one

//                 </li>

//                 <li class="answer selectable">

//                     answer two
    
//                 </li>

//                 <li class="answer selectable">

//                     answer three
    
//                 </li>

//                 <li class="answer selectable">

//                     answer four
    
//                 </li>

//             </ol>

//         </section>

//         <div class="correctness">

//             <h2>Wrong!</h2>

//         </div>



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
    mainSection.innerHTML="";
    //maybe do if statements and keep track of the state because not just the main element changes. I think there are three
    //total different layouts. or maybe have different functions for the different transitions that run the clearMain function.
}


    

//when I click a button to move on from the question slides

mainSection.addEventListener("click", startToQuestions);
