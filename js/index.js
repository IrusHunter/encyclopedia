function loadPage() {
  let page = location.hash.replace("#", "");
  if (!page) page = "main"; // default

  $("#content").find("*").off();

  $("#content").load(page + ".html", function (response, status, xhr) {
    if (status === "error") {
      console.error("Error loading:", xhr.status, xhr.statusText);
      $("#content").html("<p>Помилка завантаження сторінки " + page + "</p>");
      return;
    }

    $("#page-style").attr("href", "css/" + page + ".css");
    const $oldScript = $("#page-script");
    let newScript = document.createElement("script");
    newScript.id = "page-script";
    newScript.src = "js/" + page + ".js";

    $oldScript.remove();
    document.body.appendChild(newScript);
  });
}

loadPage();
$(window).on("hashchange", loadPage);

// качечки на фоні у хедері
const DUCK_INTENSITY = 0.5; // на секунду
const DUCK_HEIGHT = 2;

const $header = $("header");

function createDuckSnowflake() {
  const $duck = $("<img>", {
    src: "media/duck3.png",
    class: "duck-image",
  });

  $duck.css({
    top: Math.random() * ($header.innerHeight() + 40) - 20 + "px",
    height: Math.random() + DUCK_HEIGHT + "em",
    width: "auto",
    zIndex: Math.random() > 0.5 ? 0 : 100,
    position: "absolute",
  });

  $header.append($duck);

  animateDuck($duck);
}

function animateDuck($duck) {
  const speed = 1 + Math.random() * 2; // різна швидкість
  let x = -150;

  function frame() {
    x += speed;
    $duck.css("transform", `translateX(${x}px)`);
    if (x > $header.innerWidth() + 200) {
      $duck.remove();
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
