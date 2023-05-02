class AriseNotificationWrapper {
  static globalConfig = {
    maxElements: null,
  };
  static globalAlignments = {
    tr: {
      top: "70px",
      right: "10px",
    },
    tl: {
      top: "70px",
      left: "10px",
    },
    bl: {
      bottom: "30px",
      left: "10px",
    },
    br: {
      bottom: "30px",
      right: "10px",
    },
  };
  static wrappers = {
    id: "ariseNotify-wrapper-",
    style: "position:fixed;z-index:99999;pointer-events:none;",
  };

  constructor(position) {
    const wrapper = document.createElement("div");
    this.localConfig = AriseNotificationWrapper.globalConfig;
    wrapper.setAttribute("id", AriseNotificationWrapper.wrappers.id + position);
    wrapper.style.cssText = AriseNotificationWrapper.wrappers.style;
    for (const [key, value] of Object.entries(AriseNotificationWrapper.globalAlignments[position])) {
      wrapper.style[key] = value;
    }
    document.body.appendChild(wrapper);
    this.element = wrapper;
  }
  static getWrapper(position) {
    var key = position in AriseNotificationWrapper.globalAlignments ? position : "tr";
    return (this.element = document.getElementById(this.wrappers.id + key) ?? new this(key));
  }
  static setGlobalConfig(config) {
    this.globalConfig = {
      ...this.globalConfig,
      ...config,
    };
  }
  insertNotification(elem) {
    this.element.appendChild(elem);
    if (parseInt(this.localConfig.maxElements) && this.element.childElementCount > this.localConfig.maxElements) {
      a_detach(this.element.firstChild);
    }
  }
}

class AriseNotification {
  static globalConfig = {
    clickToHide: true,
    autoHide: true,
    autoHideDelay: 10000,
    alignment: "tr",
    type: "success",
    showAnimationTime: 400,
    hideAnimationDuration: 300,
    htmlEnable: true,
    customClass: null,
  };
  static wrappers = {};
  static acceptedAlignment = ["tl", "tr", "bl", "br"];
  static acceptedTypes = ["success", "danger", "info", "warning", "light", "dark", "primary", "secondary"];
  static styles = {
    commun:
      "font-size:14px;font-weight:bold;z-index:99999;padding: 0.7em 1em;border-radius:7px; margin: 0.5em 1em 0.5em auto;overflow:hidden;max-width:600px;width:fit-content;align-self:end;pointer-events:fill;cursor: pointer;",
    success: ["a-text-success", "a-h-success"],
    danger: ["a-text-danger", "a-h-danger"],
    info: ["a-text-info", "a-h-info"],
    light: ["a-text-light", "a-h-light"],
    warning: ["a-text-warning", "a-h-warning"],
    dark: ["a-text-dark", "a-bg-dark"],
    primary: ["a-text-primary", "a-h-primary"],
    secondary: ["a-text-secondary", "a-h-secondary"],
  };

  constructor(text = "This is a notification", localConfig) {
    const loc = typeof localConfig === "string" ? { type: localConfig } : localConfig;
    this.localConfig = {
      ...AriseNotification.globalConfig,
      ...loc,
    };
    AriseNotification.wrappers[this.localConfig.alignment] =
      AriseNotification.wrappers[this.localConfig.alignment] ?? AriseNotificationWrapper.getWrapper(this.localConfig.alignment);
    this.wrappers = AriseNotification.wrappers;
    this.text = text;
    this.show();
  }

  show() {
    var element = document.createElement("div");
    element.innerText = this.text;
    if (this.localConfig.htmlEnable) {
      element.innerHTML = this.text;
    }
    element.style.cssText = AriseNotification.styles.commun;
    element.classList.add("arise-notification-content");
    if (typeof this.localConfig.customClass === "string") {
      this.localConfig.customClass.split(" ").forEach((el) => {
        element.classList.add(el);
      });
    } else if (this.localConfig.customClass !== null) {
      console.error("AriseNotification: wrong type in customClass. String expected");
    }

    switch (this.localConfig.alignment) {
      case "tr":
      case "br":
        AriseAnimation.slideRightIn(element, this.localConfig.showAnimationTime);
        break;
      case "tl":
      case "bl":
      default:
        AriseAnimation.slideLeftIn(element, this.localConfig.showAnimationTime);
        break;
    }

    AriseNotification.styles[this.localConfig.type].forEach((className) => element.classList.add(className));
    const alignment = AriseNotification.acceptedAlignment.includes(this.localConfig.alignment)
      ? this.localConfig.alignment
      : AriseNotification.globalConfig.alignment;
    this.wrappers[alignment].insertNotification(element);
    if (this.localConfig.autoHide) {
      setTimeout(() => this.destroy(element), this.localConfig.autoHideDelay);
    }
    element.onclick = this.localConfig.clickToHide ? () => this.destroy(element) : null;
  }

  destroy(element) {
    switch (this.localConfig.alignment) {
      case "tr":
      case "br":
        AriseAnimation.slideRightOut(element, this.localConfig.hideAnimationDuration);
        break;
      case "tl":
      case "bl":
      default:
        AriseAnimation.slideLeftOut(element, this.localConfig.hideAnimationDuration);
        break;
    }

    setTimeout(() => a_detach(element), this.localConfig.hideAnimationDuration);
  }

  static trigger(text, style) {
    new AriseNotification(text, style).show();
  }

  static setGlobalConfiguration(config) {
    this.globalConfig = {
      ...this.globalConfig,
      ...config,
    };
  }
  setLocalConfig(config) {
    this.localConfig = {
      ...this.localConfig,
      ...config,
    };
  }
  getLocalConfig() {
    return this.localConfig;
  }
}

window.AriseNotificationWrapper = AriseNotificationWrapper;
window.AriseNotification = AriseNotification;
