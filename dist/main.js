/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/styles/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ \"./src/styles/main.scss\");\n\n// import './styles/main.module.scss';\n\n// const API_KEY = 'e6bbe854d03bc9ce738f1e30c12c4688';\nconst API_KEY = \"==AduVWbw9GblZXZk9lcvZ2X5V2aft2YhJGbsFmZ\";\nconst weatherCard = document.querySelector('.weather-card');\nconst errorMessage = document.querySelector('.error-message');\nlet currentUnit = 'c';\nlet currentWeatherData = null;\n\n// DOM Elements\nconst elements = {\n  city: document.querySelector('.city'),\n  country: document.querySelector('.country'),\n  tempValue: document.querySelector('.temp-value'),\n  description: document.querySelector('.description'),\n  weatherIcon: document.querySelector('.weather-icon'),\n  feelsLike: document.querySelector('.feels-like'),\n  humidity: document.querySelector('.humidity'),\n  wind: document.querySelector('.wind')\n};\n\n\nfunction convertTemperature(temp, unit) {\n  return unit === 'c' ? temp : Math.round((temp * 9/5) + 32);\n}\n\nasync function getWeatherData(location) {\n  try {\n    const response = await fetch(\n      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`\n    );\n\n    if (response.status === 404) {\n      throw new Error('City not found. Please try again.');\n    }\n    \n    if (!response.ok) {\n      throw new Error('Failed to fetch weather data');\n    }\n\n    return await response.json();\n  } catch (error) {\n    throw error;\n  }\n}\n\nfunction setWeatherBackground(condition) {\n  const body = document.body;\n  const conditions = [\n    'clear', 'clouds', 'rain', \n    'thunderstorm', 'snow', 'mist',\n    'haze', 'fog'\n  ];\n\n  // Remove all weather classes\n  body.classList.remove(...conditions);\n  body.classList.remove('default');\n\n  switch(condition.toLowerCase()) {\n    case 'clear':\n      body.classList.add('clear');\n      break;\n    case 'clouds':\n      body.classList.add('clouds');\n      break;\n    case 'rain':\n    case 'drizzle':\n      body.classList.add('rain');\n      break;\n    case 'thunderstorm':\n      body.classList.add('thunderstorm');\n      break;\n    case 'snow':\n      body.classList.add('snow');\n      break;\n    case 'mist':\n    case 'haze':\n    case 'fog':\n      body.classList.add('mist');\n      break;\n    default:\n      body.classList.add('default');\n  }\n}\n\n\n\nfunction processWeatherData(data) {\n  const weatherCondition = data.weather[0].main;\n  return {\n    city: data.name,\n    country: data.sys.country,\n    temp: Math.round(data.main.temp),\n    feelsLike: Math.round(data.main.feels_like),\n    humidity: data.main.humidity + '%',\n    wind: data.wind.speed + ' m/s',\n    description: data.weather[0].description,\n    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,\n    condition: weatherCondition\n  };\n}\n\nfunction updateUI(data) {\n  const temp = convertTemperature(data.temp, currentUnit);\n  const feelsLikeTemp = convertTemperature(data.feelsLike, currentUnit);\n\n  elements.city.textContent = data.city;\n  elements.country.textContent = data.country;\n  elements.tempValue.textContent = temp;\n  elements.description.textContent = data.description;\n  elements.weatherIcon.src = data.icon;\n  elements.feelsLike.textContent = `${feelsLikeTemp}°`;\n  elements.humidity.textContent = data.humidity;\n  elements.wind.textContent = data.wind;\n  \n  setWeatherBackground(data.condition);\n  weatherCard.classList.add('show');\n  errorMessage.style.display = 'none';\n}\n\nfunction showError(message) {\n  errorMessage.textContent = message;\n  errorMessage.style.display = 'block';\n  weatherCard.classList.remove('show');\n   document.body.classList.add('default');\n}\n\n// Unit toggle handler\ndocument.querySelector('.unit-toggle').addEventListener('click', (e) => {\n  if (e.target.classList.contains('unit-btn')) {\n    currentUnit = e.target.dataset.unit;\n    \n    // Update button styles\n    document.querySelectorAll('.unit-btn').forEach(btn => \n      btn.classList.toggle('active', btn.dataset.unit === currentUnit)\n    );\n\n    // Update UI with current unit if data exists\n    if (currentWeatherData) {\n      updateUI(currentWeatherData);\n    }\n  }\n});\n\n// Form submission handler\ndocument.querySelector('.search-form').addEventListener('submit', async (e) => {\n  e.preventDefault();\n  const form = e.target;\n  const input = form.querySelector('.search-input');\n  const btn = form.querySelector('.search-btn');\n  \n  try {\n    btn.classList.add('loading');\n    const rawData = await getWeatherData(input.value.trim());\n    currentWeatherData = processWeatherData(rawData);\n    updateUI(currentWeatherData);\n    input.value = '';\n  } catch (error) {\n    showError(error.message);\n    currentWeatherData = null;\n  } finally {\n    btn.classList.remove('loading');\n  }\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;