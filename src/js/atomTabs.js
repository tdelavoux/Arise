document.body.addEventListener("click", function (e) {
  var t = e.target;
  if (t && t.classList.contains("arise-pan-tab-header-item")) {
    var parent = t.closest(".arise-pan-tab");
    parent.querySelectorAll(".arise-pan-tab-body div, .arise-pan-tab-header-item").forEach((i) => {
      i.classList.remove("active");
    });
    t.classList.add("active");
    document.querySelector(t.dataset.target).classList.add("active");
  }
});
