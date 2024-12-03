const state = {
  tempValue: 70
}

const tempColorByNum = (value) => {

  if (value >= 80){
    tempColor = 'red';
  } else if (value >= 70) {
    tempColor = 'orange';
  } else if (value >= 60) {
    tempColor = 'yellow';
  } else if (value >= 50) {
    tempColor = 'green';
  } else {
    tempColor = 'teal';
  }
  return tempColor
};


const updateTemperatureDisplay = () => {
  const tempContainer = document.querySelector('#tempValue');
  tempContainer.textContent = `${state.tempValue}F`;
  tempContainer.style.color = tempColorByNum(state.tempValue);
}

const increaseTemp = () => {
  state.tempValue += 1;
  updateTemperatureDisplay();
}

const decreaseTemp = () => {
  state.tempValue -= 1;
  updateTemperatureDisplay();
}

const registerEventHandlers = () => {
  const tempUpButton = document.querySelector('#increaseTempControl');
  const tempDownButton = document.querySelector('#decreaseTempControl');

  tempUpButton.addEventListener("click", increaseTemp);
  tempDownButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", () => {
  updateTemperatureDisplay();
  registerEventHandlers();
})

