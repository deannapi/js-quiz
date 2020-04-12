const startButton = document.getElementById('start');

// questions
var questions = [
  {
      "question": "question 1 here",
      "option1": "1a here",
      "option2": "1b here",
      "option3": "1c here",
      "option4": "1d here",
      "answer": "2"
  },
  {
      "question": "question 2 here",
      "option1": "2a here",
      "option2": "2b here",
      "option3": "2c here",
      "option4": "2d here",
      "answer": "4"
  },
  {
      "question": "question 3 here",
      "option1": "3a here",
      "option2": "3b here",
      "option3": "3c here",
      "option4": "3d here",
      "answer": "2"
  },
  {
      "question": "question 4 here",
      "option1": "4a here",
      "option2": "4b here",
      "option3": "4c here",
      "option4": "4d here",
      "answer": "1"
  },
  {
      "question": "question 5 here",
      "option1": "5a here",
      "option2": "5b here",
      "option3": "5c here",
      "option4": "5d here",
      "answer": "4"
  },
  {
      "question": "question 6 here",
      "option1": "6a here",
      "option2": "6b here",
      "option3": "6c here",
      "option4": "6d here",
      "answer": "3"
  },
  {
      "question": "question 7 here",
      "option1": "7a here",
      "option2": "7b here",
      "option3": "7c here",
      "option4": "7d here",
      "answer": "1"
  },
]

//timer countdown
var timerRef = null;

function startTimer() {
  var p_time = document.getElementById('time').innerHTML;
  var timeArray = p_time.split(/[:]+/);
  var min = timeArray[00];
  var sec = checkSecond((timeArray[1] - 1));
  if (sec == 59) {
    min = min - 1
  }

  document.getElementById('time').innerHTML = min + ":" + sec;

  if (min <= 0 && sec == 0) {
    clearTimeout(timerRef)
    alert("Time is up!")
    return;
  }


  timerRef = setTimeout(startTimer, 1000);
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

var currentQuestion =0;
var score =0;
var container = document.getElementById("quizContainer");
var quesEl = document.getElementById("question");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var opt4 = document.getElementById("opt4");
var totalQues = questions.length;
var nextButton = document.getElementById("nextButton");
var resultCont = document.getElementById("result");

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
  if(!selectedOpt) {
    alert("Select an answer.");
    return;
  }
  var answer = selectedOpt.nodeValue;
  if(questions[currentQuestion].answer == answer) {
    score += 10;
  } else {
    // subtract 10 seconds for wrong answer
    startTimer.sec -= 10;
  }
  selectedOpt.checked = false;
  currentQuestion++;
  if(currentQuestion== totalQues-1) {
    nextButton.textContent="finish";
  }
  if(currentQuestion == totalQues) {
    container.style.display = "none";
    resultCont.style.display='';
    var initials = window.prompt("Enter your initials.");
    resultCont.textContent="Score: " + initials + " " + score;
    return;
  }
  loadQues(currentQuestion);
};

// play again button

startButton.addEventListener('click', startTimer);
startButton.addEventListener('click',loadQues(currentQuestion));