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
    1: "numbers and strings",
    2: "other arrays",
    3: "booleans",
    4: "all of the above",
    correct: 4,
    questionID: 2
};
var questionThree = {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    1: "commas",
    2: "curly brackets",
    3: "quotes",
    4: "parenthesis",
    correct: 3,
    questionID: 3
};
var questionFour = {
    question: "Commonly used data types DO NOT include:",
    1: "strings",
    2: "booleans",
    3: "alerts",
    4: "numbers",
    correct: 3,
    questionID: 4
};
var questionFive = {
    question: "The condition in an if / else statement is enclosed with ________.",
    1: "quotes",
    2: "curly brackets",
    3: "parenthesis",
    4: "square brackets",
    correct: 3,
    questionID: 5
};

var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

var myTimer = document.querySelector("#timer");
var timer = 60;
var questionNumber = 0;
var mainSection = document.querySelector(".main");

var questionAndAnswers = function(questionNumber) {
    //replaces the contents of the .main with ""
    clearMain();

    //add the styled question and answers to the newly recreated section element.
    mainSection.className = "main-for-questions";
    var sectionEl = document.createElement("section");
    sectionEl.className = "q-and-a";
    mainSection.appendChild(sectionEl)

    var getQuestion = function(questionNumber) {
        var h1El = document.createElement("h1");
        var questionObj = questions[questionNumber];
        h1El.className = "question-text";
        h1El.innerHTML = questionObj.question;
        sectionEl.appendChild(h1El);
        questionNumber++;
    }

    var generateAnswers = function(questionNumber) {

        var answerList = document.createElement("ol");
        
        var whichQuestion = questions[questionNumber] 
    
        for (var i =1; i<5; i++) {
            var answer = document.createElement("li");
            answer.className = "answer selectable";
            answer.innerHTML = whichQuestion[i];
            answer.id = i;
            answerList.appendChild(answer)
        }
    
        sectionEl.appendChild(answerList)
    }

    getQuestion(questionNumber);
    generateAnswers(questionNumber);

    var correctnessDiv = document.createElement("div");
    correctnessDiv.className = "correctness";
    correctnessDiv.innerHTML = "";
    sectionEl.appendChild(correctnessDiv);
}

var startToQuestions = function (event) {
    //when you click the start button, clear the main contents and pull up the first question
    var targetEl = event.target;

    if (targetEl.matches(".start-button")) {

        questionAndAnswers(questionNumber);

        startTimer();
    }
}

//then determine correctness using an event listener listening for a click on an answer that then creates another transition to the next question slide.


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

var correctCheck = function(event) {
    
    var targetEl = event.target;
    var questionObj = questions[questionNumber];
    var correctAnswerId= questionObj.correct;
    var answerID = targetEl.id;
    console.log(answerID);
    console.log(correctAnswerId);
    console.log(targetEl);

    //when one of the .answer class is clicked, display wrong or incorrect in .correctness dispatchEvent
    
    
    // if (questionNumber > 4) {
    //     //clear the contents of the main section to prep for transition
    //     clearMain();
    //     //create function to transition to all done
    // }


    if (targetEl.matches(".answer") && answerID==correctAnswerId) {
        console.log('yes');
        
        // changeQuestion();
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

mainSection.addEventListener("click", correctCheck);