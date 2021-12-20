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
            
        //add the styled question and answers to the newly recreated section element.
        sectionEl.appendChild(answerList)
    }

    getQuestion(questionNumber);
    generateAnswers(questionNumber);
}

var startToQuestions = function (event) {
    //when you click the start button, clear the main contents and pull up the first question
    var targetEl = event.target;

    if (targetEl.matches(".start-button")) {

        clearMain();

        questionAndAnswers(questionNumber);

        startTimer();
    }
}

var startTimer = function() {
    var timerInterval = setInterval(function() {
        if (questionNumber < 6) {
            myTimer.innerHTML = "Time: " + timer;
            timer --;
        }
        else {
            clearInterval(timerInterval);
        }
    }, 1000)
}


var createCorrectnessDiv = function() {
    var correctnessDiv = document.createElement("div");
    correctnessDiv.className = "correctness";
    correctnessDiv.innerHTML = "";
    mainSection.appendChild(correctnessDiv);
}

var correctCheck = function(event) {
    //when one of the .answer class is clicked, display wrong or incorrect in .correctness div
    var targetEl = event.target;
    var questionObj = questions[questionNumber];
    var correctAnswerId= questionObj.correct;
    var answerID = targetEl.id;

    if (targetEl.matches(".answer") && answerID==correctAnswerId) {
        correctTransitionHelper();
        var correctnessDiv = document.querySelector(".correctness");
        correctnessDiv.innerHTML = "Correct!";    
    }

    else if (targetEl.matches(".answer") && answerID!=correctAnswerId) {
        correctTransitionHelper();
        var correctnessDiv = document.querySelector(".correctness");
        correctnessDiv.innerHTML = "Wrong!";
    }

    endGameCheck();
}

var correctTransitionHelper = function() {
    if (questionNumber==4) {
        createCorrectnessDiv();
        questionNumber++;   
    }
    else {
        clearMain();
        changeQuestion();
        createCorrectnessDiv();
    }
}

var changeQuestion = function() {
    questionNumber++;
    questionAndAnswers(questionNumber);
}

var clearMain = function() {
    mainSection.innerHTML="";
}

var endGameCheck = function() {
    if (questionNumber==5) {
        questionNumber++;
        allDone()//figure out how to delay this function until the user clicks next or so that the user has time to see
        //if the answer was correct or wrong. I don't remember how the mockup transitions.
    }
}

var allDone = function() {
    clearMain();
    var allDoneMain = document.querySelector("#main-section");

    //put all done in h1
    var h1El = document.createElement("h1");
    h1El.innerText = "All done!";
    allDoneMain.appendChild(h1El); 

    //put "Your final score is " + timer
    var h2El = document.createElement("h2");
    h2El.innerText = "Your final score is " + (timer+1) + ".";
    allDoneMain.appendChild(h2El);

    //create enter initials input and button in form to record response
    formElDiv = document.createElement("div");
    allDoneMain.appendChild(formElDiv);

    formEl = document.createElement("form");
    formElDiv.appendChild(formEl);

    formElH2 = document.createElement("h2");
    formElH2.innerText = "Enter Initials: ";
    formEl.appendChild(formElH2);

    formElInput = document.createElement("div");
    formElInput.innerHTML = "<input type='text' name='player-initials' placeholder='Enter initials'/>";
    formEl.appendChild(formElInput);
    
    // formElButton = document.createElement("button");

}

//when I click a button to move on from the question slides

mainSection.addEventListener("click", startToQuestions);

//when I select an answer to a question

mainSection.addEventListener("click", correctCheck);