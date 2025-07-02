let startTime, elapsed = 0, interval, running = false;
const display = document.getElementById("time");
const progress = document.getElementById("progress");
const circumference = 2 * Math.PI * 90;

function updateTime() {
  const now = Date.now();
  elapsed = now - startTime;
  let seconds = (elapsed / 1000).toFixed(2);
  display.textContent = seconds.padStart(5, '0');

  let percent = (seconds % 60) / 60;
  progress.style.strokeDashoffset = circumference * (1 - percent);
}

function toggleStart() {
  if (!running) {
    startTime = Date.now() - elapsed;
    interval = setInterval(updateTime, 50);
    running = true;
    document.getElementById("startBtn").textContent = "⏸";
  } else {
    clearInterval(interval);
    running = false;
    document.getElementById("startBtn").textContent = "▶";
  }
}

function stop() {
  clearInterval(interval);
  running = false;
  document.getElementById("startBtn").textContent = "▶";
}

function reset() {
  stop();
  elapsed = 0;
  display.textContent = "00.00";
  progress.style.strokeDashoffset = circumference;
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  const laps = document.getElementById("laps");
  const li = document.createElement("li");
  li.innerText = display.textContent;
  laps.appendChild(li);
}

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = circumference;
