const startButtonEl = document.querySelector('button[data-start]')
const stopButtonEl = document.querySelector('button[data-stop]')

let bgColorId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick () {
    bgColorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    
    startButtonEl.setAttribute('disabled', 'disabled')
    
}
function onStopBtnClick() {
    clearInterval(bgColorId);
    startButtonEl.removeAttribute('disabled')
}
stopButtonEl.addEventListener('click', onStopBtnClick)

startButtonEl.addEventListener('click', onStartBtnClick)