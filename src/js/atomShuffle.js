class AtomShuffleInstance {
  constructor(el, customClass = null) {
    if (!(el instanceof HTMLElement)) {
      console.error("AtomShuffleInstance: element is not a valid HTMLElement", el);
      return null;
    }
    var className = customClass && (typeof customClass === "string" || customClass instanceof String) ? customClass : "atomShuffleItem";
    el.addEventListener("keyup", function () {
      const val = el.value.toLowerCase();
      const items = document.getElementsByClassName(className);
      Array.from(items).forEach((it) => {
        if (!val || it.dataset.title?.toLowerCase().includes(val)) {
          a_show(it);
        } else {
          a_hide(it);
        }
      });
    });
  }
}

class AtomShuffle {
  constructor(customOptions) {
    this.options = {
      itemSelector: "atomShuffleItem",
      animationTime: 500,
      visibility: false,
    };
    this.options = { ...this.options, ...customOptions };
  }

  filter(funct) {
    const elements = document.getElementsByClassName(this.options.itemSelector);
    [...elements].forEach((el) => {
      const visible = funct(el);
      visible && (this.options.visibility || !a_isVisible(el)) && a_show(el, this.options.animationTime);
      !visible && (this.options.visibility || a_isVisible(el)) && a_hide(el, this.options.animationTime);
    });
  }
  destroy() {
    delete this;
  }
}
window.AtomShuffleInstance = AtomShuffleInstance;
window.AtomShuffle = AtomShuffle;
