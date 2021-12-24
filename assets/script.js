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
//create an empty list to store scores for sorting, setting, getting and displaying on the high scores page
var scoreList = [];
var timer = 60;
var questionNumber = 0;
var scoreCounter = 0;
var myTimer = document.querySelector("#timer");
var mainSection = document.querySelector(".main");
var vhsAndTimer = document.querySelector(".header");

//when you click the start button, clear the main contents and transition to the first question slide
var startToQuestions = function (event) {

    var targetEl = event.target;

    if (targetEl.matches(".start-button")) {

        clearMain();

        questionAndAnswers(questionNumber);

        startTimer();
    }
}

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

//when one of the .answer class elements is clicked, display correct or wrong in .correctness div
var correctCheck = function(event) {

    var targetEl = event.target;

    //this prevents console errors because the submit initials and initials input elements are
    //also in the mainSection and will trigger that event listener, and iterate the questionNumber
    //variable higher than the number of objects in the questions array.
    if (targetEl.matches(".submit-initials") || targetEl.matches(".initials-input")) {
        return;
    }

    //check if the selected answer is correct
    else {
        var questionObj = questions[questionNumber];
        var answerID = targetEl.id;
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

        //if it was the last question in the quiz, we want to transition to all done page
        endGameCheck();
    } 
}

//create a div to go under the questions that sticks around after the question
//slide transitions.
var createCorrectnessDiv = function() {
    var correctnessDiv = document.createElement("div");
    correctnessDiv.className = "correctness";
    correctnessDiv.innerHTML = "";
    mainSection.appendChild(correctnessDiv);
}

//for the first 4 questions we want to clearmain, change the question and create a correctness
//div to display if your last response was correct or not. for the last question we keep
//the contents on the page
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

var clearMain = function() {
    mainSection.innerHTML="";
}

var clearHeader = function() {
    vhsAndTimer.innerHTML="";
}

var changeQuestion = function() {
    questionNumber++;
    questionAndAnswers(questionNumber);
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

    var display = '';
    var correctOrNot = document.querySelector(".correctness");

    if (correctOrNot.innerText =="Correct!") {
        display = 'c';
    }
    else {
        display = 'w';
    }

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
    
    //create a button to add to the form
    formElButton = document.createElement("button");
    formElButton.textContent = "Submit";
    formElButton.className = "submit-initials selectable";
    formEl.appendChild(formElButton);

    //create a div to display if the response to the final question was correct or not
    createCorrectnessDiv();

    if (display ==='c') {
        correctOrNot.innerText = "Correct!";
    }
    else {
        correctOrNot.innerText = "Wrong!";
    }

    allDoneMain.appendChild(correctOrNot);
}

var saveScores = function() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    localStorage.setItem("scoreCounter", JSON.stringify(scoreCounter));
}

var loadScores = function() {

    scoreCounter=localStorage.getItem("scoreCounter");

    if (!scoreCounter) {
        scoreCounter=0;
    }
    else {
        scoreCounter=JSON.parse(scoreCounter);
    }

    scoreList=localStorage.getItem("scoreList");

    if (!scoreList) {
        scoreList=[];
    }
    else {
        scoreList = JSON.parse(scoreList);
    }
 


    //we dont want the html to generate when we load scores upon loading the
    //landing page
    // if (questionNumber===0 || !scoreList) {
    //     return false;
    // }
    // else {
    //     scoreList=localStorage.getItem("scoreList");
    //     console.log(scoreList);
    // }    

        // if timer is less than all the other values in scoreList

        // var numberOfScoresOnPage = 0;
        // var allDoneMain = document.querySelector("#main-section");
        // var highScoreSection = document.createElement("section");

        // for (var i=0; i<10; i++) {

        //     var scoreDiv = document.createElement("div");
        //     //find a way to add rank. initials - score
        //     scoreDiv.innerHTML = ""
        //     highScoreSection.append(scoreDiv);
        // }

        // allDoneMain.appendChild(highScoreSection)
}

var updateScores = function () {
    //
}

//dynamically alter html for transition to highscores page
var highScores = function(event) {

    debugger;

    //so the page doesn't auto reload upon submit event
    event.preventDefault();

    //get list of high scores from local storage
    loadScores();

    //take the user input and use it to help create an object to add to scoreList array
    var initialsInput = document.querySelector("input[name='player-initials']").value;

    var scoreObject = {
        initials: initialsInput,
        score: timer+1,
        id: scoreCounter,
    };

    //iterate so each object has unique id
    scoreCounter+=1;

    //dynamically alter html to look like high scores page
    clearMain();
    clearHeader();
    var allDoneMain = document.querySelector("#main-section");

    //create h1 for highscores
    var h1El = document.createElement("h1");
    h1El.innerText = "High Scores";
    allDoneMain.appendChild(h1El);

    //add object to scoreList array
    scoreList.push(scoreObject);

    //
    //updateScores();

    //save scoreList to local storage
    saveScores();

    //create go back button an link it to the entering your initials page


    //create clear high scores button
}


//when I click a button to move on from the question slides
mainSection.addEventListener("click", startToQuestions);

//when I select an answer to a question
mainSection.addEventListener("click", correctCheck);

//when I click on the button with the class 'submit-initials, transtion to high scores page
mainSection.addEventListener("submit", highScores);

//have to set this right away so it doesn't return null as scoreObject id
//property, but need to keep loadScores function the way it is to keep
//iterating a unique id for scoreObjects that is stored locally
