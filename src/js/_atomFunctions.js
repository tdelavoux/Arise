function a_isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function a_isVisible(n) {
  return n.offsetWidth > 0 && n.offsetHeight > 0;
}

function a_isHtml(n) {
  return n instanceof HTMLElement;
}

function a_detach(n) {
  if (n instanceof NodeList) {
    n.forEach(function (i) {
      i.remove();
    });
  } else {
    a_isHtml(n) && n.remove();
  }
}

function a_safeInt(number, defaultValue = 0) {
  if (number === null || isNaN(number)) {
    return defaultValue;
  }
  return parseInt(number);
}

function a_isInt(v) {
  var x;
  return !isNaN(v) && ((x = parseFloat(v)), (0 | x) === x) && !v.toUpperCase().includes("E");
}

function a_safeFloat(number, defaultValue = 0) {
  if (number === null || isNaN(number)) {
    return defaultValue;
  }

  return parseFloat(number);
}

function a_isFloat(v) {
  return !isNaN(v) && !v.toUpperCase().includes("E");
}

function a_detachAndGet(el) {
  var res = [];
  while (el.children.length > 0) {
    res.push(el.removeChild(el.children[0]));
  }
  return res;
}

function a_uniqId() {
  return `${a_RandomString()}-${a_RandomString()}-${a_RandomString()}`;
}

function a_RandomString() {
  return (Date.now() * Math.round(Math.random() * 10000)).toString(16);
}

/**
 *
 * @param {HTMLElement} element
 * @param {?int} ms
 * @returns {boolean} Returns true if element is now collapsed, and false otherwise.
 */
function a_toggle(element, ms = null) {
  if (!(element instanceof HTMLElement)) {
    console.warn("Atom Toggle: Element is not a valid HTMLElement", element);
    return;
  }

  if (ms !== null) {
    element.style.transitionDuration = `${ms}ms`;
  }

  element.classList.add("a-collapsable"); // For transitions timings
  return element.classList.toggle("a-collapsed"); // To start the animation
}

/**
 *
 * @param {HTMLElement} element
 * @param {?int} ms
 * @returns {void}
 */
function a_hide(element, ms = 400) {
  if (AtomAnimation.a_isAnimated(element)) {
    setTimeout(() => a_hide(element, ms), ms);
    return;
  }
  if (!a_isVisible(element)) {
    return;
  }
  AtomAnimation.fadeOut(element, ms);
  setTimeout(() => {
    element.style.display = "none";
  }, ms);
}

/**
 *
 * @param {HTMLElement} element
 * @param {?int} seconds
 * @returns {void}
 */
function a_show(element, ms = 500) {
  if (AtomAnimation.a_isAnimated(element)) {
    setTimeout(() => a_show(element, ms), ms);
    return;
  }
  if (a_isVisible(element)) {
    return;
  }
  AtomAnimation.fadeIn(element, ms);
  element.style.display = null;
}

function a_after_dom_content_loaded(callback) {
  if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", callback);
    return;
  }
  // Custom event for hot reload on Atom's documentation
  document.addEventListener("AtomDocumentationSetupListeners", callback);

  // `DOMContentLoaded` has already fired
  callback();
}
