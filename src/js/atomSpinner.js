class AriseSpinnerElement {
  constructor(el) {
    if (!(el instanceof HTMLElement)) {
      console.error("AriseSpinnerElement: element is not a valid HTMLElement", el);
      return null;
    }

    /** @type {HTMLElement} */
    this.target = el;

    this.initialContent = null;
  }

  spin(content = "Loading") {
    this.initialContent = this.target.innerHTML;
    this.target.innerHTML = `<span class="flex ai-c jc-c"><i class="fas fa-circle-notch fa-spin mr-05"></i>${content}</span>`;
    this.target.disabled = true;
    this.target.classList.add("spin");
  }

  stop() {
    this.stopAndUpdate(this.initialContent);
    this.initialContent = null;
  }

  stopAndUpdate(newHTMLContent) {
    this.target.innerHTML = newHTMLContent;
    this.target.disabled = false;
    this.target.classList.remove("spin");
  }
}

window.AriseSpinnerElement = AriseSpinnerElement;
