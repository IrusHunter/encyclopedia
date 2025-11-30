// const acHeader = document.getElementsByClassName("accordion")[0];
// const acContent = acHeader.nextElementSibling;
// acHeader.addEventListener("click", () => {
//   const isHidden = acContent.style.display === "none" || acContent.style.display === "";
//   acContent.style.display = isHidden ? "block" : "none";

//   if (isHidden) {
//     const headerRect = document.querySelector("header").getBoundingClientRect();
//     const contentRect = acContent.getBoundingClientRect();
//     const newLeft = headerRect.right - contentRect.width;
//     acContent.style.left = newLeft + "px";
//   }
// });
// acContent.addEventListener("mouseleave", () => {
//   acContent.style.display = "none";
// });

// const titles = document.querySelectorAll("main dt");
// const ul = document.getElementsByClassName("accordion-content")[0];

// titles.forEach((dt) => {
//   const li = document.createElement("li");
//   li.textContent = dt.textContent;
//   li.addEventListener("click", () => {
//     location.hash = "#" + dt.id;
//     acContent.style.display = "none";
//   });
//   ul.appendChild(li);
// });

// // пошук контейнера за назвою
// const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", () => {
//   const text = searchInput.value.toLowerCase();
//   const items = document.querySelectorAll("main dt");
//   items.forEach((dt) => {
//     const matches = dt.textContent.toLowerCase().includes(text);
//     const dd = dt.nextElementSibling;
//     dt.style.display = matches ? "block" : "none";
//     dd.style.display = matches ? "grid" : "none";
//   });
// });
