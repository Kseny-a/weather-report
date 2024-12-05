// wave 2
const state = {
  tempValue: 50,
  defaultCity: 'Seattle',

};

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

  tempContainer.textContent = state.tempValue.toFixed(0)
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
  registerResetCityNameEventHandlers();
  registerTempToCelsiusEventHandlers();
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

          baseTempValue = tempInF;
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

// wave 5

const skyObj = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
}

const selectElement = document.querySelector('#skySelect');
const skyContainer = document.querySelector('#sky');
selectElement.addEventListener('change',(event) =>{
const key = event.target.value;
console.log(event)
skyContainer.textContent = skyObj[key]; 
});

// wave 6

const resetCityName = () => {
  const cityNameInput = document.querySelector('#cityNameInput');
  const cityNameDisplay = document.querySelector('#headerCityName');
  cityNameInput.value = state.defaultCity;
  cityNameDisplay.textContent = state.defaultCity;
}

const registerResetCityNameEventHandlers = () => {
  const resetButton = document.querySelector('#cityNameReset');
  resetButton.addEventListener('click', resetCityName);
}


// Optional Temp to Celsius button

const changeTempToCelsius = () => {
  const tempContainer = document.querySelector('#tempValue');
  const currentTempF = baseTempValue;
  const tempCelsius = (currentTempF - 32)*5/9;
  
  state.tempValue = tempCelsius;
  tempContainer.textContent = tempCelsius.toFixed(0);
  tempContainer.style.color = tempColorByNum(currentTempF)
  
  const toCButton = document.querySelector('#tempToCelsius')
  toCButton.textContent = 'C'
}

const registerTempToCelsiusEventHandlers = () => {
  const changeButton = document.querySelector('#tempToCelsius');
  changeButton.addEventListener('click', changeTempToCelsius);
}