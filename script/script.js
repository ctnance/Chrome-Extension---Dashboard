// Helper function to create and use elements with less code
function createElement(tag, parent, className = "") {
  if (!parent) {
    console.log("parent is null!");
    return;
  }
  let element = document.createElement(tag);
  element.className = className;
  parent.appendChild(element);
  return element;
}

async function loadDashboard() {
  setBackgroundImg();
  loadMainContainer();
  displayCryptoData();
  displayWeather();
}

function loadMainContainer() {
  let mainContainer = createElement(
    "main",
    document.querySelector("body"),
    "main-container"
  );
  setTimeText();
  loadSearchBar();
}

async function fetchImgData() {
  let response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  if (response.ok) {
    let data = await response.json();
    if (!data.errors) return data;
  }
}

async function setBackgroundImg() {
  let data = await fetchImgData();
  if (data) {
    let body = document.querySelector("body");
    let url = data.urls.full;
    if (url) {
      body.style.backgroundImage = `url(${url})`;
    }
    setLocationTag(data.location.title);
  }
}

function setLocationTag(locationText) {
  if (!locationText) return; // do not set location tag if text is blank
  document.querySelector("body").innerHTML += `
    <a class="location-text" href="https://www.google.com/search?q=${locationText}" target="_blank">${locationText}</a>`;
}

function setTimeText() {
  let currentTime = new Date().toLocaleTimeString("en-US", { timeStyle: "short" });
  let timeText = document.querySelector(".time-text")
    ? document.querySelector(".time-text")
    : createElement("h1", document.querySelector(".main-container"), "time-text");
  timeText.textContent = currentTime;
  setTimeout(setTimeText, 1000); // Update the time every 1000 milliseconds (1 second) to ensure time is up to date
}

function loadSearchBar() {
  let searchBar = createElement(
    "form",
    document.querySelector(".main-container"),
    "search-bar"
  );
  searchBar.innerHTML = `
    <input type="text" name="search" placeholder="search the web">
  `;

  searchBar.focus();

  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    window.location.assign(`https://duckduckgo.com/?q=${e.target.children[0].value}`);
  });
}

// Fetches basic cyrptocurrency data
async function getCryptoData(coin) {
  let response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  }
}

// Displays basic cyrptocurrency data
async function displayCryptoData() {
  let cryptoContainer = createElement(
    "div",
    document.querySelector("body"),
    "crypto-info"
  );

  let data = await getCryptoData("shiba-inu");
  if (data) {
    cryptoContainer.innerHTML = `
    <div class="coin-name">
      <img src=${data.image.small} alt=""><span>${data.name}</span>
    </div>
    <div class="price-info"><p>💲 - ${data.market_data.current_price.usd}</p></div>
    `;
  }
}

function getCurrentLocation() {
  let location = navigator.geolocation;

  location.getCurrentPosition(
    // Success
    (pos) => {
      // Set coordinates from position in varable
      let coords = pos.coords;
      fetch(
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          let weatherContainer = createElement(
            "div",
            document.querySelector("body"),
            "weather-container"
          );
          weatherContainer.innerHTML = `
          <div class="weather-info">
          <img src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="${
            data.weather[0].description
          } icon"><span class="temperature">${Math.round(data.main.temp)}°</span>
          </div>
          <p class="city">${data.name}</p>`;
        });
    },
    // Fail
    () => {
      console.warn("Failed to retreive location!");
    },
    // Options
    {
      enableHighAccuracy: true,
      timeout: 5000,
    }
  );
}

// TODO Implemenet function to get weather data rather than rely on getCurrentLocation()
// async function getWeatherData(lat, lon) {
// Code will go here
// }

async function displayWeather() {
  getCurrentLocation();
  // TODO: implement logic to display weather here rather than in GetCurrentLocation();
}

loadDashboard();
