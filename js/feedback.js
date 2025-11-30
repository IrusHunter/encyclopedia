(function () {
  const $detail = $("#detail");
  const $main = $("#content");

  const $tooltip = $("<div>")
    .text("Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка.")
    .addClass("tooltip")
    .appendTo($detail);

  $detail.on("mouseenter", function () {
    $tooltip.addClass("tooltip-visible");
    const rect = this.getBoundingClientRect();
    $tooltip.css({ top: rect.top + "px" });
    const newLeft = rect.right - $tooltip[0].getBoundingClientRect().width;
    $tooltip.css({ left: newLeft + "px" });
  });

  $detail.on("mouseleave", function () {
    $tooltip.removeClass("tooltip-visible");
  });
})();
