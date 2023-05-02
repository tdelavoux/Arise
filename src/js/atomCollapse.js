/**
 * @param {HTMLElement} source
 * @returns {HTMLElement} target
 */
function getCollapseTarget(source) {
  const customTargetId = source.getAttribute("a-collapse-target-id");

  const target = customTargetId !== null ? document.getElementById(customTargetId) : source.nextElementSibling;

  if (target === null) {
    console.warn(source);
    throw new Error("Atom Collapse: no target found for this collapsable: " + (source.id ? source.id : source.textContent.trim()));
  }

  return target;
}

// Set listeners to collapse elements on click
document.body.addEventListener("click", function (e) {
  const source = e.target;
  if (!source.classList.contains("a-collapse-trigger")) {
    return;
  }

  const isNowCollapsed = a_toggle(getCollapseTarget(source));

  source.classList.toggle("a-collapse-triggered", isNowCollapsed);
});

a_after_dom_content_loaded(function () {
  // Sync the triggered class with the collapsed class
  document.querySelectorAll(".a-collapse-trigger").forEach((source) => {
    const collapseTarget = getCollapseTarget(source);

    source.classList.toggle("a-collapse-triggered", collapseTarget.classList.contains("a-collapsed"));
  });
});

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

class AtomCollapse {
  constructor(el, customOptions) {
    if (!(el instanceof HTMLElement)) {
      console.error("AtomCollapse: element is not a valid HTMLElement", el);
      return null;
    }

    this.options = {
      collapsedText: null,
      startingPosition: null,
      collapseSpeed: 0.4,
    };
    $.extend(this.options, customOptions);

    this.innerText = el.innerHTML;
    this.triggerElement = el;
    this.target = document.getElementById(el.getAttribute("collapse-target")) ?? el.nextElementSibling;

    if (!this.target instanceof HTMLElement) {
      console.error(
        "AtomCollapse: Target element is not a valid HTMLElement",
        this.target
      );
      return null;
    }

    el.classList.add("a-pointer");
    if (this.options.startingPosition === "collapsed") {
      this.target.classList.add("a-collapsed");
    }
    this.updateText();
    let obj = this;
    el.addEventListener("click", obj.collapseToggle.bind(obj));
  }

  collapseToggle() {
    a_toggle(this.target, a_isNumeric(this.options.collapseSpeed) ? this.options.collapseSpeed : 0.4);
    this.updateText();
  }

  updateText() {
    if (this.target.classList.contains("a-collapsed")) {
      this.triggerElement.innerHTML =
        this.options.collapsedText ?? this.innerText;
    } else {
      this.triggerElement.innerHTML = this.innerText;
    }
  }

  setCollapsedText(text) {
    this.options.collapsedText = text;
  }

  setCollapseSpeed(speed) {
    this.options.collapseSpeed = speed;
  }
}
