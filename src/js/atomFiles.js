class AriseFile {
  constructor(el) {
    if (HTMLCollection.prototype.isPrototypeOf(el)) {
      Array.from(el).forEach((elem) => {
        this.initialize(elem);
      });
      return;
    }
    this.initialize(el);
  }

  initialize(el) {
    if (!(el instanceof HTMLInputElement)) {
      console.error("AriseFile: cannot instanciate, element is not a valid HTMLInputElement", el);
      return null;
    }
    const label = el.closest("label");
    const contentContainer = label.querySelector(".js-fileName");
    const saveValue = contentContainer.innerText;

    el.addEventListener("change", function (element) {
      let fileName;
      if (element.target.value) fileName = element.target.value.split("\\").pop();
      if (fileName) {
        label.classList.add("has-file");
        contentContainer.innerText = fileName;
      } else {
        contentContainer.innerText = saveValue;
      }
    });
  }
}
class AriseFileDrop {
  constructor(el) {
    if (HTMLCollection.prototype.isPrototypeOf(el)) {
      Array.from(el).forEach((elem) => {
        this.initialize(elem);
      });
      return;
    }
    this.initialize(el);
  }

  initialize(el) {
    if (!(el instanceof HTMLElement)) {
      console.error("AriseFile: cannot instanciate, element is not a valid HTMLElement", el);
      return null;
    }

    const uniqId = a_uniqId();
    const uploader = el.querySelector(".file-upload");
    const blocResult = el.querySelector(".file-bloc-result");
    const fileBloc = el.querySelector(".file-bloc");
    const label = el.querySelector(".file-upload-label");
    const btnReturn = el.querySelector(".a-btn-return");

    label.setAttribute("for", "file-upload-" + uniqId);
    uploader.id = "file-upload-" + uniqId;
    a_hide(blocResult, 0);

    uploader.addEventListener("change", function (element) {
      let fileName = element.target.value.split("\\").pop();
      if (fileName) {
        a_hide(fileBloc, 0);
        blocResult.querySelector(".file-recap").innerHTML = "Fichier : " + fileName;
        a_show(blocResult, 0);
      } else {
        element.querySelector("input").value = "";
      }
      btnReturn.addEventListener("click", function (element) {
        a_show(fileBloc, 0);
        a_hide(blocResult, 0);
        uploader.value = "";
      });
    });
  }
}
window.AriseFile = AriseFile;
window.AriseFileDrop = AriseFileDrop;
