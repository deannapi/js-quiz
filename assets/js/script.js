const startButton = document.getElementById('start');

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
    return
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

startButton.addEventListener('click', startTimer);