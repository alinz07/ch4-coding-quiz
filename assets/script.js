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
var scoreList = [];
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

    //after work, pick up here, we're going to do an if check to see if the event.target
    //is an answer class. this should allow the submit button to only activate
    //high scores event. this solves our bubbling issue and the console log
    //error from it trying to do a correct check and the questionObj of an array
    //that doesn't have anything in the 6 index.
    //when one of the .answer class is clicked, display wrong or incorrect in .correctness div

    var targetEl = event.target;

    if (targetEl.matches(".submit-initials") || targetEl.matches(".initials-input")) {
        return;
    }
    else {
        var answerID = targetEl.id;
        var questionObj = questions[questionNumber];
        var correctAnswerId= questionObj.correct;

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

var clearHeader = function() {
    //finish this
}

var saveSCores = function() {
    //finish this
}

var endGameCheck = function() {
    if (questionNumber==5) {
        questionNumber++;
        allDone()//figure out how to delay this function until the user clicks next or so that the user has time to see
        //if the answer was correct or wrong. I don't remember how the mockup transitions.
    }
}

//dynamically alter html for transition to all done page
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

    //create a form element for form css and methods
    formEl = document.createElement("form");
    formEl.className = "submit-initials";
    formElDiv.appendChild(formEl);

    //create h2 prompt to enter initials
    formElH2 = document.createElement("h2");
    formElH2.innerText = "Enter Initials: ";
    formEl.appendChild(formElH2);

    //create a div to put the input in because I don't
    formElInput = document.createElement("input");
    formElInput.className = "initials-input";
    formElInput.setAttribute('type', 'text');
    formElInput.setAttribute('name', 'player-initials');
    formElInput.setAttribute('placeholder', 'Enter initials');
    formEl.appendChild(formElInput);
    
    formElButton = document.createElement("button");
    formElButton.textContent = "Submit";
    formElButton.className = "submit-initials selectable";
    formEl.appendChild(formElButton);
}

//dynamically alter html for transition to highscores page
var highScores = function(event) {

    event.preventDefault();

    saveScores();

    var submitEl = event.target;
    var initialsInput = document.querySelector("input[name='player-initials']").value;
    var currentScore = document.querySelector("input[")

    //if you click on the submit button on the all done page, transition to high scores page
    if (submitEl.matches('.submit-initials')) {
        clearMain();
        clearHeader();
        var allDoneMain = document.querySelector("#main-section");

        //create h1 for highscores
        var h1El = document.createElement("h1");
        h1El.innerText = "High Scores!";
        allDoneMain.appendChild(h1El);

        //create div to display high score and initials
        var highScoreSection = document.createElement("section");

        // if timer is less than all the other values in scoreList


        for (var i=0; i<scoreList.length; i++) {
            var scoreDiv = document.createElement("div");
            //find a way to add rank. initials - score
            scoreDiv.innerHTML = ""
            highScoreSection.append(scoreDiv);
        }

        //create go back button an link it to the entering your initials page


        //create clear high scores button
    }  

}


//when I click a button to move on from the question slides
mainSection.addEventListener("click", startToQuestions);

//when I select an answer to a question
mainSection.addEventListener("click", correctCheck);

//when I click on the button with the class 'submit-initials, transtion to high scores page
mainSection.addEventListener("submit", highScores);

//don't forget to add event.preventdefault when you submit the form

