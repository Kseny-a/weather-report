const state = {
  tempValue: 70
}
const increaseTemp = () => {
  const tempUp = document.querySelector('#increaseTempControl')
    state.tempValue +=1
    const tempContainer = document.querySelector('#tempValue')
    tempContainer.textContent = state.tempValue;
};


const registerEventHandlers = () => {
  const tempUp = document.querySelector('#increaseTempControl')
  tempUp.addEventListener("click", increaseTemp());
}

const tempDown = document.querySelector('#decreaseTempControl')
tempDown.addEventListener('click', (tempValue) => {
  return tempValue-=1
});

document.addEventListener("DOMContentLoaded", registerEventHandlers);

// let tempValue = 72;

const temp = document.getElementById('tempValue')
temp.innerText = tempValue
temp.style.color = tempColorByNum(tempValue)
const tempColorByNum = (value) => {
  let tempColor = '';
if (value > 80){
  tempColor = 'red'
} else if (value >= 70) {
  tempColor = 'orange'
} else if (value >= 60) {
  tempColor = 'yellow'
} else if (value >= 50) {
  tempColor = 'green'
} else {
  tempColor = 'teal'
}; 
  return tempColor
}