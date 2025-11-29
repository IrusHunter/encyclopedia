// качечки на фоні у хедері
const DUCK_INTENSITY = 0.5; // на секунду
const DUCK_HEIGHT = 2;

const header = document.getElementsByTagName("header")[0];
function createDuckSnowflake() {
  const duck = document.createElement("img");
  duck.src = "media/duck3.png";
  duck.classList.add("duck-image");

  duck.style.top = Math.random() * (header.clientHeight + 40) - 20 + "px";
  duck.style.height = Math.random() + DUCK_HEIGHT + "em";
  duck.style.width = "auto";
  duck.style.zIndex = Math.random() > 0.5 ? 0 : 100;

  header.appendChild(duck);

  animateDuck(duck);
}

function animateDuck(duck) {
  const speed = 1 + Math.random() * 2; // різна швидкість
  let x = -150;

  function frame() {
    x += speed;
    duck.style.transform = `translateX(${x}px)`;

    if (x > header.clientWidth + 200) {
      duck.remove();
    } else {
      requestAnimationFrame(frame);
    }
  }

  frame();
}

function startDuckSnow() {
  setInterval(() => {
    createDuckSnowflake();
  }, 1000 / DUCK_INTENSITY);
}

startDuckSnow();

// зміна основного напрямку контейнера
const nav = document.querySelector("header nav");
function navFlexDirectionChanger() {
  if (window.innerWidth <= 768) {
    nav.style.flexDirection = "row";
  } else {
    nav.style.flexDirection = "column";
  }
}
navFlexDirectionChanger();
window.addEventListener("resize", navFlexDirectionChanger);
