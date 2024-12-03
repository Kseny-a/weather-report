// wave 2
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

const updateLandscape = (temp) => {
  const landscapeContainer = document.querySelector('#landscape');
  let landscape = '';

  if (temp >= 80) {
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp <= 59) {
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  landscapeContainer.textContent = landscape;
}


const updateTemperatureDisplay = () => {
  const tempContainer = document.querySelector('#tempValue');
  tempContainer.textContent = `${state.tempValue}F`;
  tempContainer.style.color = tempColorByNum(state.tempValue);
  updateLandscape(state.tempValue);
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
// wave 3
const updateCityName = () => {
  const cityNameInput = document.querySelector('#cityNameInput');
  const cityNameDisplay = document.querySelector('#headerCityName');
  cityNameDisplay.textContent = cityNameInput.value;
};

const registerCityNameHandlers = () => {
  const cityNameInput = document.querySelector('#cityNameInput');
  cityNameInput.addEventListener('input', updateCityName);
};

document.addEventListener("DOMContentLoaded", () => {
  updateTemperatureDisplay();
  registerEventHandlers();
  registerCityNameHandlers();
});


