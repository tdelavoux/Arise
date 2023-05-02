document.body.addEventListener("click", function (e) {
  var t = e.target;
  if (t && t.classList.contains("atom-pan-tab-header-item")) {
    var parent = t.closest(".atom-pan-tab");
    parent.querySelectorAll(".atom-pan-tab-body div, .atom-pan-tab-header-item").forEach((i) => {
      i.classList.remove("active");
    });
    t.classList.add("active");
    document.querySelector(t.dataset.target).classList.add("active");
  }
});