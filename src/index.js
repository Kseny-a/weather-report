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

  tempContainer.textContent = state.tempValue.toFixed(2)
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

const registerTempUpdateHandlers = () => {
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
  registerTempUpdateHandlers();
  registerCityNameHandlers();
  registerGetRealtimeTempHandlers();
});

//wave4
const getTemp = () => {
  const cityName = document.querySelector('#headerCityName').textContent;
  axios
    .get('http://127.0.0.1:5000/location', {params: {q: cityName }})
    .then((response) => {
      console.log(response)
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;

      axios
        .get('http://127.0.0.1:5000/weather', {params: {lat, lon}})
        .then((weatherResponse) => {
          const tempInK = weatherResponse.data.main.temp;
          const tempInF = (tempInK * (9/5)) - 459.67;
          console.log(`success! temp is ${tempInF}`);
          state.tempValue = tempInF;
          updateTemperatureDisplay();
          updateLandscape(state.tempValue);
        });
    })
    .catch(() => {
      console.log('Error!');
    });
};

const registerGetRealtimeTempHandlers = () => {
  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', getTemp);
} 

