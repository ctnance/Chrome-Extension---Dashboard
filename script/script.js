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
  let data = await fetchImgData();
  setTimeText();
  if (data) {
    console.log(data);
    setBackgroundImg(data.urls.full);
    setLocationTag(data.location.title);
  }
}

async function fetchImgData() {
  let response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  let data = await response.json();
  return data;
}

function setBackgroundImg(url) {
  let body = document.querySelector("body");
  body.style.backgroundImage = `url(${url})`;
}

function setLocationTag(locationText) {
  if (!locationText) return; // do not set location tag if text is blank
  let locationElem = createElement(
    "p",
    document.querySelector("body"),
    "location-text"
  );
  locationElem.textContent = locationText;
}

function setTimeText() {
  let currentTime = new Date().toLocaleTimeString("en-US");
  let timeText = createElement("h1", document.querySelector("body"), "time-text");
  timeText.textContent = currentTime;
}

loadDashboard();
