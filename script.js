// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var comment = document.getElementById("comment");
var counter = document.getElementById("counter");

var progress = document.getElementById("progress");
var scoreContainer = document.getElementById("scoreContainer");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("exampleInitial");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var displayScore = document.getElementById("displayScore");



// create our questions
let questions = [
    {
        question : "1. What is the HTML tag under which one can write the JavaScript code?",
        choiceA : "&lt javascript &gt",
        choiceB : "&lt scripted &gt",
        choiceC : "&lt script &gt",
        choiceD : "&lt js &gt",
        correct : "C"
    },{
        question : "2. Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
        choiceA : "lertbox(“GeeksforGeeks”);",
        choiceB : "msg(“GeeksforGeeks”);",
        choiceC : "msgbox(“GeeksforGeeks”);",
        choiceD : "alert(“GeeksforGeeks”)",
        correct : "D"
    },{
        question : "3. What is the correct syntax for referring to an external script called “geek.js”?",
        choiceA : "&lt script src=”geek.js” &gt",
        choiceB : "&lt script href=”geek.js” &gt",
        choiceC : "&lt script ref=”geek.js” &gt",
        choiceD : "&lt script name=”geek.js” &gt",
        correct : "A"
    },{
        question : "4. The external JavaScript file must contain <script> tag. True or False?",
        choiceA : "True",
        choiceB : "False",
        choiceC : "Both",
        choiceD : "I DON'T KNOW!!!!",
        correct : "B"
    },{
        question : "5. Which of the following is not a reserved word in JavaScript?",
        choiceA : "interface",
        choiceB : "throws",
        choiceC : "program",
        choiceD : "boolean",
        correct : "C"
    }
];


// create global variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
const endTime = 0; // 60s
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    startCounter();
    TIMER = setInterval(startCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render



function startCounter(){
    if(count > 0){
        counter.innerHTML = count;
        count--
    }else{
        // count = 60;
        // answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        correctAnswer();
        // change progress color to green
    }else{
        // answer is wrong
        count -= 5;
        wrongAnswer();
        // change progress color to red
    }
    // count = 60;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{

        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function correctAnswer() {
    comment.innerHTML = "Correct!";
}

//answer is wrong
function wrongAnswer() {
    comment.innerHTML = "Wrong!";
}


// score render
function scoreRender(){
    quiz.style.display = "none";
    scoreContainer.style.display = "block";

    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);

    displayScore.innerHTML = "";

    displayScore.innerHTML += "<p>Your score is "+ scorePerCent +"%</p>";
}

// shows the highscores page
function highScore() {
    scoreContainer.style.display = "none";
    highscoreContainer.style.display = "block"; 

    var Initial = document.querySelector('#exampleInitial').value;

    var scorePerCent = Math.round(100 * score/questions.length);
    
    localStorage.setItem("Initials", Initial);
    
    localStorage.setItem("Scores",scorePerCent);

    var storedInitials = localStorage.getItem("Initials");

    var storedScores = localStorage.getItem("Scores");

    document.querySelector('#displayHighscore').innerHTML += `<li>${storedInitials} - ${storedScores}%</li>`;    
}


//clearing the highscores
function clearHighscore() {
    document.querySelector('#displayHighscore').innerHTML = "";
}

//Restart the quiz
function restartQuiz() {
    runningQuestion = 0;
    const lastQuestion = questions.length - 1;
    count = 60;
    const endTime = 0;
    // let TIMER;
    score = 0; 
    highscoreContainer.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    startCounter();
    TIMER = setInterval(startCounter,1000);
}
