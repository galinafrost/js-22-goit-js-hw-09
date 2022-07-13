import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker')
const buttonEl = document.querySelector('button')
const nowDate = Date.now()
console.log(nowDate);

let selectedDate = null
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
      if (selectedDates[0] < Number(nowDate)) {
          Notiflix.Notify.warning(`Please choose a date in the future`);
      buttonEl.setAttribute('disabled', 'disabled');
      } else {
          buttonEl.removeAttribute('disabled');
      }

      selectedDate = selectedDates[0]
      console.log(selectedDate);
  },
};

flatpickr(inputEl, options)

const onStartBtnElClick = () => {
    intervalId = setInterval(() => {
    const now = Date.now();
    const diff = selectedDate - Number(now);
  
    if (diff <= 0) {
      stop();
      return;
    }

    const { days, hours, minutes, seconds } = getTimeComponents(diff);

    document.querySelector('span[data-days]').textContent = pad(days);
    document.querySelector('span[data-hours]').textContent = pad(hours);
    document.querySelector('span[data-minutes]').textContent = pad(minutes);
    document.querySelector('span[data-seconds]').textContent = pad(seconds);

function getTimeComponents(diff) {
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, 0);
}

}, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

buttonEl.addEventListener('click', onStartBtnElClick)