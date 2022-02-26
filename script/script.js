async function fetchBackgroundImg() {
  let response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  let data = await response.json();
  setBackgroundImg(data.urls.full);
  console.log(data);
}

function setBackgroundImg(url) {
  let body = document.querySelector("body");
  body.style.backgroundImage = `url(${url})`;
}

fetchBackgroundImg();
