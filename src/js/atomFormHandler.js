/**
 * Activation au clic sur un bouton de soumission
 * Vérifie l'ensemble des champs du formulaire
 *
 * @use	 optional	 a-data-function                   Fonction JS associée au bouton si celui-ci ne submit pas de formulaire. La fonction est lancé si aucun élément n'est bloquant
 * @use  optional    a-check-invisible                 Défini si les champs masqués doivent être pris en compte
 * @use  optional    a-notify-none                     Si présent, disable les notifications globales
 * @use  optional    a-notify-all                      Si présent, toutes les erreurs sont notifiées
 * @use  optional    a-disable-color                   Si présent, ne colore pas les inputs en erreur
 * @use  optional    a-input-notify-none               Si présent, disable les message des inputs
 * @use  optional    a-data-opt-bloc                   Fonction de blocage personnalisée. Si retourne false, bloque le formulaire
 * @use  optional    a-data-opt-bloc-msg               Message associé au blocage du formulaire global
 */
Array.from(document.getElementsByClassName("a-form-handler")).forEach(
  (button) => {
    button.addEventListener("click", function () {
      /** @type {HTMLFormElement} */
      const form = this.closest("form");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
      });

      compute(form, this);
    });
  }
);

class AriseFormHandler {
  static setupListeners(rootElement) {
    [...rootElement.querySelectorAll(".a-form-handler")].forEach((el) => {
      el.removeEventListener("click", AriseFormHandler.controlListener, false);
      el.addEventListener("click", AriseFormHandler.controlListener, false);
    });
  }

  static controlListener() {
    const form = this.closest("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    compute(form, this);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  AriseFormHandler.setupListeners(document);
});

window.AriseFormHandler = AriseFormHandler;

/**
 * Check the form and submit it if it is correct
 *
 * @param {HTMLFormElement} form
 * @param {HTMLButtonElement} button
 * @returns void
 */
async function compute(form, button) {
  const A_EMPTY_STRING = "";

  const notifyNone = form.hasAttribute("a-notify-none");
  const notifyAll = form.hasAttribute("a-notify-all");
  const notifyInputNone = form.hasAttribute("a-input-notify-none");
  const colorInput = form.hasAttribute("a-disable-color");
  const checkInvisible = form.getAttribute("a-check-invisible");
  const optionalVerificationCallback = form.getAttribute("a-data-opt-bloc");
  const optionalVerificationMessage = form.getAttribute("a-data-opt-bloc-msg");
  const callback = form.getAttribute("a-data-function");

  let blocking = false;
  const errors = [];

  // Check the validity for each type of input. The callback methods modify the blocking and errors variables
  form.querySelectorAll(".a-verify-select").forEach(a_verify_select);
  form.querySelectorAll(".a-verify-text").forEach(a_verify_text);
  form.querySelectorAll(".a-verify-textarea-with-count").forEach(a_verify_textarea_with_count);
  form.querySelectorAll(".a-verify-date").forEach(a_verify_date);
  form.querySelectorAll(".a-verify-phone").forEach(a_verify_phone);
  form.querySelectorAll(".a-verify-email").forEach(a_verify_email);
  form.querySelectorAll(".a-verify-int").forEach(a_verify_int);
  form.querySelectorAll(".a-verify-float").forEach(a_verify_float);
  form.querySelectorAll(".a-verify-checked").forEach(a_verify_checked);
  form.querySelectorAll(".a-verify-one-in-list, a-verify-radio").forEach(a_verify_radio);
  form.querySelectorAll(".a-verify-file").forEach(a_verify_file);

  // Si une fonction perso est définie, on évalue le blocage
  if (optionalVerificationCallback !== false && (await eval(optionalVerificationCallback)) === false) {
    blocking = a_form_handler_error(
      form,
      false,
      true,
      errors,

      optionalVerificationMessage ?? "Des erreurs ont été détectées dans le formulaire. Merci de vérifier les données",
      "Formulaire"
    );
  }

  if (blocking === false) {
    // Data is correctly entered in the form ⇒ we submit it
    if (callback) {
      eval(callback);
    } else {
      form.submit();
    }

    return;
  }

  // blocking is true ⇒ we show the errors
  if (!notifyInputNone) {
    errors.forEach(function (error) {
      const inputErrorElement = document.createElement("span");
      inputErrorElement.classList.add(
        error.elem.parentNode.classList.contains("a-count-area") ? "a-input-error-text-with-count" : "a-input-error-text"
      );
      inputErrorElement.innerHTML = error.errorMessage.trim();
      error.elem.parentNode.append(inputErrorElement);
    });
  }

  if (notifyAll) {
    errors.forEach(function (error) {
      new AriseNotification(`${error.name ?? "Champ incorrect"} : ${error.errorMessage}`, "danger");
    });
  } else if (!notifyNone) {
    new AriseNotification("Des erreurs ont été détectées dans le formulaire. Merci de vérifier les données.", "danger");
  }
  // Allow the form to be cleared
  addReinitColorListener(form);
  button.blur();

  /** #########################################################################################################
   *							                      Fonctions de vérification
   *  ######################################################################################################### */

  /**
   * --------- Vérification des sélecteurs  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-verif          : Value lancant une erreur. par défaut aucune value
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLSelectElement} item
   */
  function a_verify_select(item) {
    var verif = item.getAttribute("a-verif") ?? A_EMPTY_STRING;
    var name = item.getAttribute("a-name") ?? "Selecteur";
    var displayMsg = !item.hasAttribute("a-disable-message");
    var alternateVerif = item.getAttribute("a-alternate-verif");
    var nullable = item.hasAttribute("a-nullable");

    var errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    var error = "Aucune sélection faite";

    var isEmpty = (!nullable && !item.value) || item.value === verif;
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || eval(alternateVerif))) {
      blocking = a_form_handler_error(item, colorInput, displayMsg, errors, isEmpty ? error : errCustomMsg, name);
    }
  }

  /**
   * --------- Vérification des champs texte  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-min-length     : Taille minimale du texte à saisir
   * @use optional  a-max-length     : Taille maximale du texte à saisir
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_text(item) {
    const minLength = a_safeInt(item.getAttribute("a-min-length"));
    const maxLength = item.getAttribute("a-max-length") ? a_safeInt(item.getAttribute("a-max-length")) : null;
    const name = item.getAttribute("a-name") ?? "Texte";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");
    const numericOnly = item.hasAttribute("a-numeric-only");

    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const errorNumeric = "Caractères numériques uniquement";
    const error = "Saisie obligatoire";
    const errorInf = `Saisie trop courte (min ${minLength} caractères)`;
    const errorOver = `Saisie trop longue (max ${maxLength} caractères)`;

    var isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    var isNan = numericOnly && !a_isNumeric(item.value.trim());
    var inf = item.value.trim().length < minLength;
    var over = maxLength !== null && item.value.trim().length > maxLength;
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || isNan || inf || over || eval(alternateVerif))) {
      blocking = a_form_handler_error(
        item,
        colorInput,
        displayMsg,
        errors,
        isEmpty ? error : isNan ? errorNumeric : inf ? errorInf : over ? errorOver : errCustomMsg,
        name
      );
    }
  }

  /**
   * --------- Vérification Des champs textarea avec count  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-min-length     : taille minimale du texte à saisir
   * @use optional  a-max-length     : taille maximale du texte à saisir
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLTextAreaElement} item
   */
  function a_verify_textarea_with_count(item) {
    const minLength = a_safeInt(item.getAttribute("a-min-length"));
    const maxLength = item.getAttribute("a-max-length") ? a_safeInt(item.getAttribute("a-max-length")) : null;
    const name = item.getAttribute("a-name") ?? "Commentaire";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");

    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Saisie obligatoire";
    const errorInf = `Saisie trop courte (min ${minLength} caractères)`;
    const errorOver = `Saisie trop longue (max ${maxLength} caractères)`;

    const isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    const inf = item.value.trim().length < minLength;
    const over = maxLength !== null && item.value.trim().length > maxLength;
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || inf || over || eval(alternateVerif))) {
      a_detach(item.parentNode.querySelectorAll(".a-input-error-text-with-count"));
      blocking = a_form_handler_error(
        item,
        colorInput,
        displayMsg,
        errors,
        isEmpty ? error : inf ? errorInf : over ? errorOver : errCustomMsg,
        name
      );
    }
  }

  /**
   * --------- Vérification Des champs Date  ----------
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-date-format    : format de la date a vérifier (accepté les YY, YYYY, DD, MM, /, -)
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_date(item) {
    const name = item.getAttribute("a-name") ?? "Date";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");

    let format = item.getAttribute("a-date-format") ?? "d/m/Y";
    if (!/^([d|m|y|Y|h|H|i|s|\-| |:|\/]*)$/.test(format.trim())) {
      console.warn(`AriseFormHandler: ${format} n'est pas un format valide. Initialisation à la valeur par défaut d/m/Y`);
      format = "d/m/Y";
    }

    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Saisie obligatoire";
    const errorFormat = `Format invalide. Attendu : ${format}`;

    // Formatage de la REGEX a partir du format
    const rules = {
      "/": "([\\/])",
      " ": "([ ])",
      "-": "([-])",
      ":": "([:])",
      d: "(0?[1-9]|[12][0-9]|3[01])",
      m: "(0?[1-9]|1[0-2])",
      Y: "([0-9]{4})",
      y: "([0-9]{2})",
      h: "(0?[0-9]|1[0-1])",
      H: "(0?[0-9]|1?[0-9]|2[0-3])",
      i: "(0?[0-9]|[1-5][0-9])",
      s: "(0?[0-9]|[1-5][0-9])",
    };
    let regFormat = format;
    for (const [key, value] of Object.entries(rules)) {
      regFormat = regFormat.replace(new RegExp(key, "g"), value);
    }

    const isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    const unmatched = item.value.trim() !== A_EMPTY_STRING && !new RegExp(`^${regFormat}$`).test(item.value.trim());
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || unmatched || eval(alternateVerif))) {
      blocking = a_form_handler_error(item, colorInput, displayMsg, errors, isEmpty ? error : unmatched ? errorFormat : errCustomMsg, name);
    }
  }

  /**
   * --------- Vérification Des champs Telephone  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-phone-format   : Format attendu du numéro de téléphone. Par défaut XX.XX.XX.XX.XX. Accept . - / +
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_phone(item) {
    const name = item.getAttribute("a-name") ?? "Telephone";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");
    let format = item.getAttribute("a-phone-format") ?? "XX.XX.XX.XX.XX";
    if (!/^([0|1|2|3|4|5|6|7|8|9|X|-| |+|:|.|\/]*)$/.test(format.trim())) {
      console.warn(`AriseFormHandler: ${format} n'est pas un format valide. Intitialisation a la valeur par défaut XX.XX.XX.XX.XX`);
      format = "XX.XX.XX.XX.XX";
    }

    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Saisie obligatoire";
    const errorFormat = `Format invalide. Attendu : ${format.toUpperCase()}`;

    const rules = {
      "/": "([\\/])",
      0: "([0])",
      1: "([1])",
      2: "([2])",
      3: "([3])",
      4: "([4])",
      5: "([5])",
      6: "([6])",
      7: "([7])",
      8: "([8])",
      9: "([9])",
      " ": "([ ])",
      "\\.": "([.])",
      "-": "([-])",
      ":": "([:])",
      "\\+": "([+])",
      X: "([0-9])",
    };

    let regFormat = format;
    for (const [key, value] of Object.entries(rules)) {
      regFormat = regFormat.replace(new RegExp(key, "g"), value);
    }

    const isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    const unmatched = item.value.trim() !== A_EMPTY_STRING && !new RegExp(`^${regFormat}$`).test(item.value);
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || unmatched || eval(alternateVerif))) {
      blocking = a_form_handler_error(item, colorInput, displayMsg, errors, isEmpty ? error : unmatched ? errorFormat : errCustomMsg, name);
    }
  }

  /**
   * --------- Vérification Des champs email  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_email(item) {
    const name = item.getAttribute("a-name") ?? "Email";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");

    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Saisie obligatoire.";
    const errorFormat = "Format email invalide.";

    // From https://www.emailregex.com/
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    const unmatched = item.value.trim() !== A_EMPTY_STRING && !regexEmail.test(item.value.trim());
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || unmatched || eval(alternateVerif))) {
      blocking = a_form_handler_error(item, colorInput, displayMsg, errors, isEmpty ? error : unmatched ? errorFormat : errCustomMsg, name);
    }
  }

  /**
   * --------- Vérification Des champs Int  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable       : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   * @use optional  a-min             : taille minimale de l'objet. Default 0
   * @use optional  a-max				: taille maximale de l'objet. Default 2147483647
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_int(item) {
    const min = a_safeInt(item.getAttribute("a-min"));
    const max = item.getAttribute("a-max") ? a_safeInt(item.getAttribute("a-max")) : null;
    const name = item.getAttribute("a-name") ?? "Integer";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");

    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Saisie obligatoire";
    const errorType = "Nombre entier attendu.";
    const errorInf = `Valeur trop petite (min ${min})`;
    const errorOver = `Valeur trop grande (max ${max})`;

    const isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    const isNumeric = item.value.trim() === A_EMPTY_STRING || a_isInt(item.value);
    const inf = a_safeInt(item.value) < min;
    const over = max !== null && a_safeInt(item.value) > max;
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || !isNumeric || inf || over || eval(alternateVerif))) {
      blocking = a_form_handler_error(
        item,
        colorInput,
        displayMsg,
        errors,
        isEmpty ? error : !isNumeric ? errorType : inf ? errorInf : over ? errorOver : errCustomMsg,
        name
      );
    }
  }

  /**
   * --------- Vérification Des champs Float  ----------
   *
   * @use optional  a-alternate-verif : Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message   : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name            : Nom du champs pour l'affichage des erreurs
   * @use optional  a-nullable        : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-disable-message : Permet de désactiver l'affichage des message sous les champs input
   * @use optional  a-min             : taille minimale de l'objet. Default 0
   * @use optional  a-max			  : taille maximale de l'objet. Default 2147483647
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_float(item) {
    const min = a_safeFloat(item.getAttribute("a-min"));
    const max = item.getAttribute("a-max") ? a_safeFloat(item.getAttribute("a-max")) : null;
    const name = item.getAttribute("a-name") ?? "Float";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");
    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Saisie obligatoire";
    const errorType = "Nombre entier attendu.";
    const errorInf = `Valeur trop petite (min ${min})`;
    const errorOver = `Valeur trop grande (max ${max})`;

    const isEmpty = !nullable && item.value.trim() === A_EMPTY_STRING;
    const isNumeric = a_isFloat(item.value);
    const inf = parseFloat(item.value) < min;
    const over = max !== null && parseFloat(item.value) > max;
    if ((checkInvisible || a_isVisible(item)) && (isEmpty || !isNumeric || inf || over || eval(alternateVerif))) {
      blocking = a_form_handler_error(
        item,
        colorInput,
        displayMsg,
        errors,
        isEmpty ? error : !isNumeric ? errorType : inf ? errorInf : over ? errorOver : errCustomMsg,
        name
      );
    }
  }

  /**
   * --------- Vérification des checkboxs  ----------
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-nullable        : Le champ est obligatoire. Nécéssaire quand le form admet des champs non requis
   * @use optional  a-name           : nom du champ pour identifcation de l'erreur
   * @use optional  a-disable-message : Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_checked(item) {
    const name = item.getAttribute("a-name") ?? "Checkbox";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");
    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Checkbox obligatoire";
    const isEmpty = !nullable && !item.checked;
    if ((checkInvisible || a_isVisible(item.parentNode)) && (isEmpty || eval(alternateVerif))) {
      blocking = a_form_handler_error(
        item,
        colorInput,
        displayMsg,
        errors,
        isEmpty ? error : !isNumeric ? errorType : inf ? errorInf : over ? errorOver : errCustomMsg,
        name
      );
    }
  }

  /**
   * --------- Vérification Radios & Checkbox multiples  ----------
   * Verification de la sélection d'une checkbox parmis une liste
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : nom du champ pour identifcation de l'erreur
   * @use required  a-shared-name    : nom idantifiant les elements de la liste des checkboxs a vérifier
   * @use optional  a-disable-message: Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_radio(item) {
    const name = item.getAttribute("a-name") ?? "Choix";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");
    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Une coche obligatoire";

    const checkName = item.getAttribute("name");
    const allChecks = form.querySelectorAll(`input[name="${checkName}"]`);
    const isEmpty =
      !nullable && Array.prototype.slice.call(allChecks).some((x) => x.checked && (checkInvisible || a_isVisible(item.parentNode)));
    if (isEmpty || eval(alternateVerif)) {
      blocking = a_form_handler_error(
        item,
        colorInput,
        displayMsg,
        errors,
        isEmpty ? error : !isNumeric ? errorType : inf ? errorInf : over ? errorOver : errCustomMsg,
        name
      );
    }
  }

  /**
   * --------- Vérification Des Input Files  ----------
   * Verification simple que l'un des input files a bien un fichier sélectionné
   *
   * @use optional  a-alternate-verif: Fonction complémentaire de vérification du contenu. Celle-ci doit renvoyer vrai si le blocage est effectif
   * @use optional  a-error-message  : Message d'erreur personnalisé précisiant l'erreur souvelvée par la fonction de verification alternative
   * @use optional  a-name           : Nom du champs pour l'affichage des erreurs
   * @use optional  a-disable-message     : Permet de désactiver l'affichage des message sous les champs input
   *
   * @param {HTMLInputElement} item
   */
  function a_verify_file(item) {
    const name = item.getAttribute("a-name") ?? "Fichier";
    const displayMsg = !item.hasAttribute("a-disable-message");
    const nullable = item.hasAttribute("a-nullable");
    const alternateVerif = item.getAttribute("a-alternate-verif");
    const errCustomMsg = item.getAttribute("a-error-message") ?? "Champ incorrect";
    const error = "Fichier obligatoire";
    const isEmpty = !nullable && !item.files.length;
    if ((checkInvisible || a_isVisible(item.parentNode)) && (isEmpty || eval(alternateVerif))) {
      blocking = a_form_handler_error(item.parentNode, colorInput, displayMsg, errors, isEmpty ? error : errCustomMsg, name);
    }
  }

  /**
   * @param {HTMLElement} item
   * @param {boolean} colorInput True if error colors are enabled
   * @param {boolean} displayMsg True if the error message should be displayed
   * @param {Array} err Global array of errors, push the error to it
   * @param {string} errmsg The error message to show
   * @param {string} name The interface name of the message
   * @returns
   */
  function a_form_handler_error(item, colorInput, displayMsg, err, errmsg, name) {
    a_detach(item.parentNode.querySelectorAll(".a-input-error-text"));
    if (!colorInput) item.parentNode.classList.add("a-form-error");
    if (displayMsg) err.push({ elem: item, errorMessage: errmsg, name: name });
    return true;
  }
}

/**
 * Add listeners to remove the error messages when the input are modified
 *
 * @param {HTMLFormElement} form
 */
function addReinitColorListener(form) {
  function a_form_reset_error(item) {
    a_detach(item.parentNode.querySelectorAll(".a-input-error-text"));
    item.parentNode.classList.remove("a-form-error");
  }

  Array.from(form.querySelectorAll(".a-verify-select")).forEach((item) => {
    item.addEventListener("change", function () {
      a_form_reset_error(this);
    });
  });

  Array.from(form.querySelectorAll(".a-verify-checked, .a-verify-one-in-list, a-verify-radio, .a-verify-file")).forEach((item) => {
    item.addEventListener("change", function () {
      a_form_reset_error(this.parentNode);
    });
  });

  Array.from(
    form.querySelectorAll(
      ".a-verify-text, .a-verify-textarea-with-count, .a-verify-date, .a-verify-phone, .a-verify-email, .a-verify-int, .a-verify-float"
    )
  ).forEach((item) => {
    item.addEventListener("keydown", function () {
      a_form_reset_error(this);
    });
  });
}
