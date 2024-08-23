const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggleEl = document.querySelector('.toggle');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function waitForTransitionEnd(element) {
  return new Promise((resolve) => {
    element.addEventListener('transitionend', resolve, { once: true });
  });
}

async function performTransition(element) {
  // Wait for the transition to finish
  const result = await waitForTransitionEnd(element);

  element.style.transition = 'none';

  element.style.transform = `translate(-50%, -100%) rotate(0deg )`;

  setTimeout(() => {
    element.style.transition = 'all 0.5s ease-in';
  }, 0);
}

toggleEl.addEventListener('click', (e) => {
  const html = document.querySelector('html');
  html.classList.toggle('dark');
  if (html.classList.contains('dark')) {
    e.target.innerHTML = 'Light Mode';
  } else {
    e.target.innerHTML = 'Dark Mode';
  }
});

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minute = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hourEl.style.transform = `translate(-50%, -100%) rotate(${
    hoursForClock === 0 ? 360 : scale(hoursForClock, 0, 11, 0, 359)
  }deg )`;

  minuteEl.style.transform = `translate(-50%, -100%) rotate(${
    minute === 0 ? 360 : scale(minute, 0, 59, 0, 359)
  }deg )`;

  secondEl.style.transform = `translate(-50%, -100%) rotate(${
    seconds === 0 ? 360 : seconds * 6
  }deg )`;

  if (seconds === 0) {
    performTransition(secondEl);
  }

  if (minute === 0) {
    performTransition(minuteEl);
  }

  if (hoursForClock === 0) {
    performTransition(hourEl);
  }

  timeEl.innerHTML = `${hoursForClock}:${
    minute < 10 ? '0' + minute : minute
  } ${ampm}`;

  dateEl.innerHTML = `${days[day]},${months[month]} <span class="circle">${date}</span>`;

  console.log(seconds);
  console.log(seconds * 6);
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();

setInterval(() => {
  setTime();
}, 1000);
