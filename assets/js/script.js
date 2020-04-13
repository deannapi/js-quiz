const startButton = document.getElementById('start');

// questions
var questions = [
  {
      "question": "Which is a JavaScript Data Type?",
      "option1": "number",
      "option2": "string",
      "option3": "boolean",
      "option4": "all of the above",
      "answer": "4"
  },
  {
      "question": "What company developed JavaScript?",
      "option1": "Java Inc.",
      "option2": "Netscape",
      "option3": "JQuery",
      "option4": "CERN",
      "answer": "2"
  },
  {
      "question": "Which is correct to comment out lines in JS?",
      "option1": "/*",
      "option2": "#",
      "option3": "//",
      "option4": "<!---->",
      "answer": "3"
  },
  {
      "question": "Which of the following returns 'pink' for var colors = ['red', 'orange', 'pink']?",
      "option1": "colors[2]",
      "option2": "colors[0]",
      "option3": "colors[1]",
      "option4": "colors[3]",
      "answer": "1"
  },
  {
      "question": "What statement exits from a loop?",
      "option1": "pass;",
      "option2": "break;",
      "option3": "return;",
      "option4": "exit;",
      "answer": "2"
  },
  {
      "question": "Inside which HTML element does the JavaScript link belong?",
      "option1": "<link>",
      "option2": "<meta>",
      "option3": "<script>",
      "option4": "<footer>",
      "answer": "3"
  },
  {
      "question": "Which is the correct method to hyperlink?",
      "option1": "<h2>Hyperlink</h2>",
      "option2": "<div href=\"url\">Hyperlink</div>",
      "option3": "<link>Hyperlink</link>",
      "option4": "<a href=\"url\">Hyperlink</a>",
      "answer": "4"
  },
]

//timer countdown
var timerRef = null;

// startTimer that gets called upon start button being clicked
// startTimer function only contains the setTimeout function
// within the setTimeout function we create a new function that does the work that is currently inside our startTimer()

function startTimer() {
  var p_time = document.getElementById('time').innerHTML;
  var timeArray = p_time.split(/[:]+/);
  var min = timeArray[0];
  var sec = checkSecond((timeArray[1] - 1));
  if (sec === "59") {
    min = min - 1
  }

  document.getElementById('time').innerHTML = min + ":" + sec;

  if (min <= 0 && sec == 0) {
    clearTimeout(timerRef)
    alert("Time is up!")
    return;
  }

  if(min === 1 && sec === 0) {
    min = 0;
  }
  setTimeout(startTimer, 1000);
}

function checkSecond(seconds) {
  if (seconds < 10 && seconds >= 0) {
    seconds = "0" + seconds
  };
  if (seconds < 0) {
    seconds = "59"
  };
  return seconds;
}

function wrongTimer () {
  var x_time = document.getElementById('time').innerHTML;
  var wrongArray = x_time.split(/[:]+/);
  var x_min = wrongArray[0];
  var x_sec = checkSecond((wrongArray[1]-1));
  if(x_sec === 59) {
    x_min = x_min - 1
  }
  x_sec -= 10;
  document.getElementById('time').innerHTML = x_min + ":" + x_sec;
}

var currentQuestion =0;
var score = 0;
var container = document.getElementById("quizContainer");
var quesEl = document.getElementById("question");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var opt4 = document.getElementById("opt4");
var totalQues = questions.length;
var nextButton = document.getElementById("nextButton");
var resultCont = document.getElementById("result");
var redo = document.getElementById("replay");

function loadQues (questionIndex) {
  var q = questions[questionIndex];
  quesEl.textContent = (questionIndex +1) + '. ' + q.question;
  opt1.textContent = q.option1;
  opt2.textContent = q.option2;
  opt3.textContent = q.option3;
  opt4.textContent = q.option4;
};

function LoadNextQuestion () {
  var selectedOpt = document.querySelector("input[type=radio]:checked");
  var right = document.getElementById('response');
  if(!selectedOpt) {
    alert("Select an answer.");
    return;
  }
  var answer = selectedOpt.value;
  if(questions[currentQuestion].answer === answer) {
    // alert correct
    score += 10;
    right.innerHTML="Correct!";
  } else {
    // subtract 10 seconds for wrong answer
    wrongTimer();
    right.innerHTML="Incorrect! -10 seconds!";
  }
  
  selectedOpt.checked = false;
  currentQuestion++;
  if(currentQuestion== totalQues-1) {
    nextButton.textContent="Submit";
  }
  if(currentQuestion == totalQues) {
    container.style.display = "none";
    resultCont.style.display='';
    startButton.style.display = 'none';
    var initials = window.prompt("Enter your initials.");
    localStorage.setItem("highscore", initials + " " + score);
    resultCont.textContent="Score: " + initials + " " + score;
    redo.textContent="Replay";
    clearInterval(timerRef);
    return;
  }
  loadQues(currentQuestion);
};

function replay () {
  location.reload();
};



startButton.addEventListener('click', startTimer);
startButton.addEventListener('click',loadQues(currentQuestion));
redo.addEventListener('click', replay);


// pagination - remove next button
// view highscores link

// get real questions!

// fix media pages