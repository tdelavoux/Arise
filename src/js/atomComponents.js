const A_TEXTAREA_MAXLENGTH_DEFAULT = 500;

/** -----------------------------------------------------
 *      text-area characters counter
 * ------------------------------------------------------
 * @use optional maxlength
 *
 * Défini un compteur automatique de caractères restant pour un texte area donné.
 * La taille max est basée sur l'attribut maxlength de la textArea. Par défaut, la valeur est à 500;
 */
class AtomComponents {
  static installCountAreaListeners() {
    document.querySelectorAll(".a-count-area>textarea").forEach((textarea) => {
      console.debug("[ATOM] Setting up countarea listeners for ", textarea);
      this.installCountAreaAutoResizeListener(textarea);
      this.installCountAreaCounterListener(textarea);
    });
  }

  static installCountAreaAutoResizeListener(textarea) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.addEventListener("input", function () {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }

  static installCountAreaCounterListener(textarea) {
    if (textarea.parentNode.querySelector("p.a-count-text") !== null) {
      return;
    }

    const maxLength = a_safeInt(textarea.getAttribute("maxlength"), A_TEXTAREA_MAXLENGTH_DEFAULT);
    const labelElement = document.createElement("p");
    labelElement.classList.add("small-text");
    labelElement.classList.add("a-count-text");
    labelElement.innerHTML = `${maxLength - textarea.value.length} caractères restants`;
    textarea.parentNode.prepend(labelElement);

    textarea.addEventListener("keyup", function (ev) {
      const remaining = maxLength - ev.currentTarget.value.length;

      const plural = remaining > 1 ? "s" : "";
      labelElement.innerText = `${remaining} caractère${plural} restant${plural}`;
    });
  }
}

AtomComponents.installCountAreaListeners();

window.AtomComponents = AtomComponents;
