class AriseAnimation {
  static animTime = 500;
  static visibleX = { transform: "translateX(0px)", opacity: "1" };
  static visibleY = { transform: "translateY(0px)", opacity: "1" };
  static rightOut = { transform: "translateX(80px)", opacity: "0" };
  static leftOut = { transform: "translateX(-80px)", opacity: "0" };
  static upOut = { transform: "translateY(-30px)", opacity: "0" };
  static bottomOut = { transform: "translateY(30px)", opacity: "0" };

  static opacityIn = { opacity: "1" };
  static opacityOut = { opacity: "0" };

  static slideRightIn(el, time) {
    this.animate(el, time, "slideRightIn", this.rightOut, this.visibleX);
  }

  static slideRightOut(el, time) {
    this.animate(el, time, "slideRightOut", this.visibleX, this.rightOut);
  }

  static slideLeftIn(el, time) {
    this.animate(el, time, "slideLeftIn", this.leftOut, this.visibleX);
  }

  static slideLeftOut(el, time) {
    this.animate(el, time, "slideLeftOut", this.visibleX, this.leftOut);
  }

  static slideUpIn(el, time) {
    this.animate(el, time, "slideUpIn", this.upOut, this.visibleY);
  }

  static slideUpOut(el, time) {
    this.animate(el, time, "slideUpOut", this.visibleY, this.upOut);
  }

  static fadeIn(el, time) {
    this.animate(el, time, "fadeIn", this.opacityOut, this.opacityIn);
  }

  static fadeOut(el, time) {
    this.animate(el, time, "fadeOut", this.opacityIn, this.opacityOut);
  }

  static a_isAnimated(el) {
    let res = false;
    [...el.classList].forEach(function (element) {
      if (element.includes("a-animating")) {
        res = true;
      }
    });
    return res;
  }

  static animate(el, time, name, startin, ending) {
    if (el.classList.contains(`a-animating-${name}`)) {
      return;
    }
    el.classList.add(`a-animating-${name}`);
    el.animate([startin, ending], {
      duration: time ?? this.animTime,
    });
    setTimeout(() => el.classList.remove(`a-animating-${name}`), time);
  }
}
