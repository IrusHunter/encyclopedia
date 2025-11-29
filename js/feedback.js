const detail = document.getElementById("detail");

const tooltip = document.createElement("div");
tooltip.innerText = "Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка.";
tooltip.classList.add("tooltip");

document.body.appendChild(tooltip);

detail.addEventListener("mouseenter", (e) => {
  const rect = detail.getBoundingClientRect();
  tooltip.style.top = rect.top + "px";

  tooltip.classList.add("tooltip-visible");
});

detail.addEventListener("mouseleave", () => {
  tooltip.classList.remove("tooltip-visible");
});
