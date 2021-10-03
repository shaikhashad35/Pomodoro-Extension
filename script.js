const startButton = document.querySelector(".startButton");
const playButton = document.querySelector(".playButton");
const stopButton = document.querySelector(".stopButton");
const timerCounter = document.querySelector(".timeCount");
const breakCounter = document.querySelector(".breakCount");
var first = true;
var intervalBreak = null;
var intervalWork = null;

function show(element) {
  element.classList.remove("hide");
  element.classList.add("show");
}

function hide(element) {
  element.classList.remove("show");
  element.classList.add("hide");
}
function checkTimeValid(time) {
  return /^(([0-9])|([0-5][0-9])):(([0-9])|([0-5][0-9]))?$/.test(time);
}
// start session
startButton.addEventListener("click", (e) => {
  console.log("Statr btn called");
  if (!first) {
    startWork();
    hide(startButton);
    show(playButton);
    document.querySelector(".timeCount").disabled = true;
    breakCounter.disabled = true;
    return;
  }
  console.log(checkTimeValid(timerCounter.value));
  if (
    !(timerCounter.value == "" && breakCounter.value == "") &&
    (!checkTimeValid(timerCounter.value) || !checkTimeValid(breakCounter.value))
  ) {
    timerCounter.animate(
      {
        borderWidth: "1px",
        borderColor: "rgb(173, 26, 26)",
      },
      2000,
      function () {
        $(this).css("border", "none");
      }
    );
    breakCounter.animate(
      {
        borderWidth: "1px",
        borderColor: "rgb(173, 26, 26)",
      },
      2000,
      function () {
        $(this).css("border", "none");
      }
    );
    console.log("Invalid");
    e.preventDefault();
    return;
  } else {
    startWork();
    breakCounter.disabled = true;
    document.querySelector(".timeCount").disabled = true;
    first = false;
  }
  hide(startButton);
  show(playButton);
});
function startWork() {
  console.log("valid");
  let timer2 = "";
  console.log(first);
  if (!first) {
    timer2 = document.querySelector(".timerScreenCounter").innerHTML;
  } else {
    timer2 = timerCounter.value == "" ? "25:00" : timerCounter.value;
  }
  console.log(timer2);
  intervalWork = setInterval(function () {
    console.log(timer2);
    let timer = timer2.split(":");
    //by parsing integer, I avoid all extra string processing
    let minutes = parseInt(timer[0], 10);
    let seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    if (minutes < 0) clearInterval(intervalWork);
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (minutes == "00" && seconds == "00") {
      clearInterval(intervalWork);
      startBreak();
    }
    document.querySelector(".timerScreenCounter").innerHTML =
      minutes + ":" + seconds;
    timer2 = minutes + ":" + seconds;
  }, 1000);
}
function startBreak() {
  console.log("Break");
  document.querySelector(".timerScreenLabel").innerHTML = "Until Work/Study";
  let timer2 = breakCounter.value == "" ? "5:00" : breakCounter.value;
  intervalBreak = setInterval(function () {
    console.log(timer2);
    let timer = timer2.split(":");
    //by parsing integer, I avoid all extra string processing
    let minutes = parseInt(timer[0], 10);
    let seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    if (minutes < 0) clearInterval(intervalBreak);
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (minutes == "00" && seconds == "00") {
      clearInterval(intervalBreak);
      startWork();
    }
    document.querySelector(".timerScreenCounter").innerHTML =
      minutes + ":" + seconds;
    timer2 = minutes + ":" + seconds;
  }, 1000);
}

stopButton.addEventListener("click", (e) => {
  hide(playButton);
  show(startButton);
  document.querySelector(".timeCount").disabled = false;
  breakCounter.disabled = false;
  clearInterval(intervalWork);
  clearInterval(intervalBreak);
  document.querySelector(".timerScreenCounter").innerHTML = "00:00";
  document.querySelector(".timerScreenLabel").innerHTML = "Until Break";
  first = true;
  startButton.classList.remove("show");
});

playButton.addEventListener("click", (e) => {
  clearInterval(intervalWork);
  clearInterval(intervalBreak);
  hide(playButton);
  show(startButton);
  startButton.classList.remove("show");
});
