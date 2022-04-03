let now = new Date();
let newYear = new Date(now.getFullYear() + 1, 0, 1);
console.log("New year : " + newYear.toDateString());

let leftDays = document.getElementById("day");
let leftHours = document.getElementById("hour");
let leftMins = document.getElementById("min");
let leftSeconds = document.getElementById("second");

function accountTime() {
  let currentTime = new Date();
  let leftTime = newYear - currentTime;
  let totalSeconds = leftTime / 1000;

  let days = Math.floor(totalSeconds / 3600 / 24)
    .toString()
    .padStart(2, "0");
  let hours = Math.floor((totalSeconds / 3600) % 24)
    .toString()
    .padStart(2, "0");
  let mins = Math.floor((totalSeconds / 60) % 60)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  leftDays.innerHTML = days;
  leftHours.innerHTML = hours;
  leftMins.innerHTML = mins;
  leftSeconds.innerHTML = seconds;
}

setInterval(accountTime, 1000);
