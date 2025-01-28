import './styles/main.scss';

const API_KEY = process.env.API_KEY;
const weatherCard = document.querySelector('.weather-card');
const errorMessage = document.querySelector('.error-message');
let currentUnit = 'c';
let currentWeatherData = null;

// DOM Elements
const elements = {
  city: document.querySelector('.city'),
  country: document.querySelector('.country'),
  tempValue: document.querySelector('.temp-value'),
  description: document.querySelector('.description'),
  weatherIcon: document.querySelector('.weather-icon'),
  feelsLike: document.querySelector('.feels-like'),
  humidity: document.querySelector('.humidity'),
  wind: document.querySelector('.wind')
};


function convertTemperature(temp, unit) {
  return unit === 'c' ? temp : Math.round((temp * 9/5) + 32);
}

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`
    );

    if (response.status === 404) {
      throw new Error('City not found. Please try again.');
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

function setWeatherBackground(condition) {
  const body = document.body;
  const conditions = [
    'clear', 'clouds', 'rain', 
    'thunderstorm', 'snow', 'mist',
    'haze', 'fog'
  ];

  // Remove all weather classes
  body.classList.remove(...conditions);
  body.classList.remove('default');

  switch(condition.toLowerCase()) {
    case 'clear':
      body.classList.add('clear');
      break;
    case 'clouds':
      body.classList.add('clouds');
      break;
    case 'rain':
    case 'drizzle':
      body.classList.add('rain');
      break;
    case 'thunderstorm':
      body.classList.add('thunderstorm');
      break;
    case 'snow':
      body.classList.add('snow');
      break;
    case 'mist':
    case 'haze':
    case 'fog':
      body.classList.add('mist');
      break;
    default:
      body.classList.add('default');
  }
}



function processWeatherData(data) {
  const weatherCondition = data.weather[0].main;
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity + '%',
    wind: data.wind.speed + ' m/s',
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    condition: weatherCondition
  };
}

function updateUI(data) {
  const temp = convertTemperature(data.temp, currentUnit);
  const feelsLikeTemp = convertTemperature(data.feelsLike, currentUnit);

  elements.city.textContent = data.city;
  elements.country.textContent = data.country;
  elements.tempValue.textContent = temp;
  elements.description.textContent = data.description;
  elements.weatherIcon.src = data.icon;
  elements.feelsLike.textContent = `${feelsLikeTemp}°`;
  elements.humidity.textContent = data.humidity;
  elements.wind.textContent = data.wind;
  
  setWeatherBackground(data.condition);
  weatherCard.classList.add('show');
  errorMessage.style.display = 'none';
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  weatherCard.classList.remove('show');
   document.body.classList.add('default');
}

// Unit toggle handler
document.querySelector('.unit-toggle').addEventListener('click', (e) => {
  if (e.target.classList.contains('unit-btn')) {
    currentUnit = e.target.dataset.unit;
    
    // Update button styles
    document.querySelectorAll('.unit-btn').forEach(btn => 
      btn.classList.toggle('active', btn.dataset.unit === currentUnit)
    );

    // Update UI with current unit if data exists
    if (currentWeatherData) {
      updateUI(currentWeatherData);
    }
  }
});

// Form submission handler
document.querySelector('.search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('.search-input');
  const btn = form.querySelector('.search-btn');
  
  try {
    btn.classList.add('loading');
    const rawData = await getWeatherData(input.value.trim());
    currentWeatherData = processWeatherData(rawData);
    updateUI(currentWeatherData);
    input.value = '';
  } catch (error) {
    showError(error.message);
    currentWeatherData = null;
  } finally {
    btn.classList.remove('loading');
  }
});
