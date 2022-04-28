const $ = document;
const timeInputs = $.querySelectorAll(".time_input");
const startBtn = $.querySelector(".start_btn");
const pauseBtn = $.querySelector(".pause_btn");
const cancelBtn = $.querySelector(".cancel_btn");
for (let i = 0; i < timeInputs.length; i++) {
  timeInputs[i].addEventListener("click", function (e) {
    e.target.removeAttribute("readonly");
    e.target.style.border = "2px solid grey";
  });
  timeInputs[i].addEventListener("blur", function (e) {
    e.target.setAttribute("readonly", "true");
    e.target.style.border = "none";
  });
}
function timerHandler() {
    let hourInput = timeInputs[0];
    let minInput = timeInputs[1];
    let secInput = timeInputs[2];
    let hour = hourInput.value;
    let second = secInput.value;
    let min = minInput.value;
    let timer = setInterval(function () {
        second--;
    
        if (second === -1 && minInput.value !== "00") {
          second = 59;
          min--;
        } else if (
          second === -1 &&
          minInput.value === "00" &&
          hourInput.value !== "00"
        ) {
          second = 59;
          min = 59;
          hour--;
        } else if (
          second === -1 &&
          minInput.value === "00" &&
          hourInput.value === "00"
        ) {
          clearInterval(timer);
          pauseBtn.setAttribute("disabled", "true");
          cancelBtn.setAttribute("disabled", "true");
          startBtn.removeAttribute("disabled");
          for (let i = 0; i < timeInputs.length; i++) {
            timeInputs[i].setAttribute("disabled", "true");
          }
          return alert("The timer ended.");
        }
    
        if (second < 10 && +secInput.value !== 0) {
          secInput.value = "0" + second;
        } else {
          secInput.value = second;
        }
        if (min < 10 && +minInput.value !== 0) {
          minInput.value = "0" + min;
        } else if (min === 0) {
          minInput.value = "00";
        } else {
          minInput.value = min;
        }
        if (hour < 10 && +hourInput.value !== 0) {
          hourInput.value = "0" + hour;
        } else if (hour === 0) {
          hourInput.value = "00";
        } else {
          hourInput.value = hour;
        }
      }, 1000);
      pauseBtn.addEventListener("click", function () {
        pauseBtn.setAttribute("disabled", "true");
        startBtn.removeAttribute("disabled");
        clearInterval(timer);
      });
      cancelBtn.addEventListener("click", function () {
        pauseBtn.setAttribute("disabled", "true");
        cancelBtn.setAttribute("disabled", "true");
        startBtn.removeAttribute("disabled");
        secInput.value = "00";
        minInput.value = "00";
        hourInput.value = "00";
        clearInterval(timer);
        for (let i = 0; i < timeInputs.length; i++) {
          timeInputs[i].removeAttribute("disabled");
        }
      });
} 
function startTimer() {
  for (let i = 0; i < timeInputs.length; i++) {
    timeInputs[i].setAttribute("disabled", "true");
  }
  startBtn.setAttribute("disabled", "true");
  pauseBtn.removeAttribute("disabled");
  cancelBtn.removeAttribute("disabled");

      timerHandler()
}

startBtn.addEventListener("click", startTimer);
