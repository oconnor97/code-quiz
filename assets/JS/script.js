const timeLeft = document.getElementById('timer');
const start = document.getElementById('start-button');
const answerChoice = document.getElementById('questions-list');
const container = document.getElementById('container');


let secondsLeft = 75;
const timeStart = 0;
const score = 0;


const questions = [
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

start.addEventListener('click', function() {
    if (timeStart === 0) {
        timeStart = setInterval(function() {
            secondsLeft--;
            timeLeft.textContent = 'Seconds Remaining: ' + secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(timeStart);
                gameFinished();
                timeLeft.textContent = "Time's up!";
            }
        }, 1000);
    }
    
});