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
  setTimeText();
  displayCryptoData();
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
  let currentTime = new Date().toLocaleTimeString("en-US");
  let timeText = createElement("h1", document.querySelector("body"), "time-text");
  timeText.textContent = currentTime;
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

loadDashboard();
