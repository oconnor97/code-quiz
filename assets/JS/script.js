//global variables

var timeLeft = document.getElementById('timer');
var start = document.getElementById('start-button');
var answers = document.getElementById('answers-list');
var container = document.getElementById('container');
var questionTitle = document.querySelector('p');
var codeH1 = document.querySelector('h1');
var mainDiv = document.getElementById('mainDiv');
var secondsLeft = 61;
var penalty = 10;
var timeStart = 0;
var score = 0;
var questionIndex = 0;
var highScorePage = document.getElementById('high-scores');
var showScores = document.getElementById('show-scores');
var questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses'
    },
    {
        title: 'Arrays in Javascript can be used to store ____.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
    {
        title: 'String values must be enclosed within ____ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 'quotes'
    },
    {
        title: 'A very useful tool for used during development and debugging for printing content to the debugger is:',
        choices: ['Javascript', 'terminal / bash', 'for loops', 'console log'],
        answer: 'console log'
    },

];
showScores.style.display = 'none';

//sets the timer and begins when the begin button is clicked

start.addEventListener('click', function() {
    if (timeStart === 0) {
        timeStart = setInterval(function() {
            secondsLeft--;
            timeLeft.textContent = 'Seconds Remaining: ' + secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(timeStart);
                timeLeft.textContent = "Time's up!";
                stopGame();
            }
        }, 1000);
    }
    render();
    
    
});
var newList = document.createElement('ul');

// Clear HTML data from container and set new elements to = questions/choices

function render() {

    codeH1.textContent = "";
    questionTitle.textContent = "";
    start.style.display = "none";
    answers.innerHTML = "";
    

        var questionList = questions[questionIndex].title;
        var answerChoice = questions[questionIndex].choices;
        codeH1.innerHTML = questionList;

    answerChoice.forEach(function (newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        questionTitle.appendChild(answers);
        answers.appendChild(listItem);
        listItem.addEventListener('click', (choiceCompare));
        
    })
    
}
var createP = document.createElement('p');
function choiceCompare(event) {

    var pickAnswer = event.target;
    if(pickAnswer.textContent === questions[questionIndex].answer) {
        // alert("Correct! The answer is:  " + questions[questionIndex].answer);
        answers.appendChild(createP);
        createP.textContent = "Correct! The answer is:  " + questions[questionIndex].answer
    } else {
        // alert("Incorrect! The answer is:  " + questions[questionIndex].answer);
        answers.appendChild(createP);
        createP.textContent = "Incorrect! The answer is:  " + questions[questionIndex].answer
        secondsLeft = secondsLeft - penalty;
    }
    setTimeout(function() {
        
        if(secondsLeft === 0 || questionIndex === questions.length - 1) {
            stopGame();
        } else {questionIndex++;
            render(questionIndex);
        }
    }, 900)


    
}

//ends the game when time runs out or the test is finished 

var scoreList = document.createElement('ul');
function stopGame() {
    var finalScore = secondsLeft;
    codeH1.textContent = "";
    questionTitle.textContent = "";
    start.style.display = "none";
    answers.innerHTML = "";

    
    codeH1.textContent = "Your final score is " + finalScore;
    clearInterval(timeStart);
    var newLabel = document.createElement('label');
    newLabel.textContent = "Please enter your intials";
    newLabel.setAttribute('id', 'newLabel');
    mainDiv.appendChild(newLabel);
    
    var initalInput = document.createElement('input');
    initalInput.setAttribute('type', 'text');
    initalInput.setAttribute('id', 'initalInput');
    initalInput.textContent = "";
    mainDiv.appendChild(initalInput);
    

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "Submit");
    submitBtn.textContent = "Submit";
    mainDiv.appendChild(submitBtn);
    
submitBtn.addEventListener('click', function() {
    var initials = initalInput.value;

    if (initials === '') {
        alert("Please enter your initials");
        
    } else {var userScore = {
        initials: initials,
        score: finalScore
    }
    }
    var highScores = localStorage.getItem('highScores');
    if (highScores === null) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }
    highScores.push(userScore);
    var newScore = JSON.stringify(highScores);
    localStorage.setItem("highScores", newScore);
    
    
    
    
    renderHighScores();
    
});
}

//renders the score in a list with the initials and score

function renderHighScores() {
    
    var scoreEl = localStorage.getItem("highScores");
    newScore = JSON.parse(scoreEl);
    var showScores = document.getElementById('show-scores')
    showScores.style.display = 'block';
    newScore.forEach(newScore => {
        var listScores = document.createElement('li');
        listScores.textContent = `Intials: ${newScore.initials}, Score: ${newScore.score}`;
        showScores.appendChild(listScores);
        
    });
    codeH1.textContent = "High Scores";
    document.querySelector('#Submit').style.display = 'none';
    initalInput.style.display = 'none';
    newLabel.style.display = 'none';
    
    var showBtn = document.getElementById('hide-btn');
    showBtn.style.display = 'block';
   
    var reset = document.getElementById('clear');
    reset.addEventListener('click', function() {
        localStorage.clear;
    });
    var clear = document.getElementById('clear');
    clear.addEventListener('click', function() {

    while (showScores.firstChild) {
        showScores.removeChild(showScores.firstChild);
        
    };
    localStorage.clear();

    });


};

    
//Allows the user to view their scores saved in local storage

var highScores=document.getElementById('high-scores');
highScores.addEventListener('click', function() {
    codeH1.textContent = "";
    questionTitle.textContent = "";
    start.style.display = "none";
    answers.innerHTML = "";
    var showBtn = document.getElementById('hide-btn');
    showBtn.style.display = 'block';
    clearInterval(timeStart);
    renderHighScores();

    
});


