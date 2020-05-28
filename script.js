// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const comment = document.getElementById("comment");
const counter = document.getElementById("counter");
// const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const registeredUser = document.getElementById("registeredUser");
// const yourInitial = document.getElementById("yourInitial");
// const yourMark = document.getElementById("yourMark ")

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
        choiceD : "program",
        correct : "C"
    }
];



// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
const endTime = 0; // 60s
// const gaugeWidth = 150; // 150px
// const gaugeUnit = gaugeWidth / endTime;
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
        // timeGauge.style.width = count * gaugeUnit + "px";
        count--
    }else{
        // count = 60;
        // change progress color to red
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
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent


    scoreDiv.innerHTML += "<p>Your score is "+ scorePerCent +"%</p>";
}



function renderStorage() {
    scoreDiv.style.display = "none";
    registeredUser.style.display = "block"; 

}