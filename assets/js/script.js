const startButton = document.getElementById('start');
var right = document.getElementById("response");
var redo = document.getElementById("replay");

// questions
var questions = [
  new Question(
      "1. Which is a JavaScript Data Type?",
      ["number",
      "string",
      "boolean",
      "all of the above"],
      "4"
  ),
  new Question(
      "2. What company developed JavaScript?",
      ["Java Inc.",
      "Netscape",
      "JQuery",
      "CERN"],
      "2"
  ),
  new Question(
      "3. Which is correct to comment out lines in JS?",
      ["/*",
      "#",
      "//",
      "<!-- -->"],
      "3"
  ),
  new Question(
      "4. Which of the following returns 'pink' for var colors = ['red', 'orange', 'pink']?",
      ["colors[2]",
      "colors[0]",
      "colors[1]",
      "colors[3]"],
      "1"
  ),
  new Question(
      "5. What statement exits from a loop?",
      ["pass;",
      "break;",
      "return;",
      "exit;"],
      "2"
  ),
  new Question(
      "6. Inside which HTML element does the JavaScript link belong?",
      ["<link>",
      "<meta>",
      "<script>",
      "<footer>"],
      "3"
  ),
  new Question(
      "7. Which is the correct method to hyperlink?",
      ["<h2>Hyperlink</h2>",
      "<div href=\"url\">Hyperlink</div>",
      "<link>Hyperlink</link>",
      "<a href=\"url\">Hyperlink</a>"],
      "4"
  ),
]

//timer countdown
function startTimer() {
  var p_time = document.getElementById('time').innerHTML;
  var timeArray = p_time.split(":");
  var min = timeArray[0];
  var sec = checkSecond((timeArray[1] - 1));
  if (sec == 59) {
    min = min - 1
  }

  if (min < 0) {
    clearTimeout(timerRef)
    alert("Time is up!")
    return;
  }

  document.getElementById('time').innerHTML = min + ":" + sec;

  var timerRef = setTimeout(startTimer, 1000);
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
  var wrongArray = x_time.split(":");
  var x_min = wrongArray[0];
  var x_sec = checkSecond((wrongArray[1]-1));
  if(x_sec === 59) {
    x_min = x_min - 1
  }
  x_sec -= 10;
  document.getElementById('time').innerHTML = x_min + ":" + x_sec;
}

function stopTimer () {
  clearInterval(timerRef);
}

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex =0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {   
    this.score += 10;
  } 
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}

function populate() {
  if(quiz.isEnded()) {
    showScores();
  }
  else {
    var quesEl = document.getElementById("question");
    quesEl.innerHTML = quiz.getQuestionIndex().text;

    var choices = quiz.getQuestionIndex().choices;
    for(var i =0; i < choices.length; i++) {
      var quesEl = document.getElementById("choice"+i);
      quesEl.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
      quiz.guess(guess);
      populate();
  }
};

function showScores() {
  var initials = window.prompt("Enter your initials.")
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + initials + " " + quiz.score + "</h2>";
  localStorage.setItem("highscores", initials + " " + quiz.score);
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

//create quiz
var quiz = new Quiz(questions);

function answerSel () {
  var userAnswer =  ;
  if(questions[currentQuestion].answer === userAnswer) {
    // alert correct
    score += 10;
    right.innerHTML="Correct!";
  } else {
    // subtract 10 seconds for wrong answer
    wrongTimer();
    right.innerHTML="Incorrect! -10 seconds!";
  }
};

function replay () {
  location.reload();
};

startButton.addEventListener('click', startTimer);
startButton.addEventListener('click',populate);
redo.addEventListener('click', replay);