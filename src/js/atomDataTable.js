const a_direction = ["asc", "desc"];
const a_types = ["string", "number", "Ymd", "m/d/Y", "m-d-y", "d/m/Y", "d-m-y"];

class AriseDatatable {
  /**
   * Construct the object and initialize table with dependecies
   * @param {HTMLElement} table
   * @param {Object|undefined} customOptions
   *
   * @returns
   */
  constructor(table, customOptions) {
    if (!(table instanceof HTMLTableElement)) {
      console.error(
        "AriseDatatable: Can only initialize on a HTMLTableElement, not on ",
        table
      );
      return null;
    }

    this.sortClass = "a-sort";
    this.directionAttr = "data-direction";
    this.tableid = a_uniqId();

    this.regex = {
      dateDb: /^((19|20)\d{2})((0|1)\d{1})([0-3]\d{1})/g,
      dateFrSlash: /^([0-3]\d{1})\/([0-1]\d{1})\/((19|20)\d{2})/g,
      dateEnSlash: /^((0|1|2)\d{1})\/([0-3]\d{1})\/((19|20)\d{2})/g,
      dateEnDash: /^((19|20)\d{2})-([0-1]\d{1})-([0-3]\d{1})/g,
      dateFrDash: /^([0-3]\d{1})-([0-1]\d{1})-((19|20)\d{2})/g,
    };

    this.options = {
      autoFilter: true, // Unused yet
      filterableColumn: false, // Define columns that can be filtered by search input. Expect array on int
      orderableColumn: false, // Define columns that can be ordered. Expect array
      preOrderedColumn: false, // Unused yet
      columnType: false, // define de type of datas if specific (accept "string", "number", "Ymd", "m/d/Y", "m-d-y", "d/m/Y", "d-m-y")
      autoSort: false, // Unused yet
      nbPerPage: false, // Items by paginated elements. Expect integer
      searchInput: true, // Display and instantiate the input search
      inputSearchClass: false, // custom class for input search
      paginateClass: "a-primary", // custom class for pagination buttons
      paginationText: true,
    };

    // initialize datas
    this.table = table;
    Object.assign(this.options, customOptions);
    this.currentPage = 0;

    // initialize Dom
    this.instantiateListenerSortingColumn();
    this.instantiateTableHeader();
    this.instantiateTableFooter();
    if (this.options.searchInput) {
      this.instantiateRowsClass();
      this.instantiateInputShuffle();
    }
    this.options.nbPerPage && this.instantiatePagination();
    this.options.nbPerPage && this.displayPages();
  }

  /* ------------------------------------------ Initalize functions ------------------------------ */

  /**
   * Initialize a header to insert filters elements
   */
  instantiateTableHeader() {
    const header = document.createElement("div");
    header.classList.add("a-table-header", "ta-r");
    header.id = `arise-table-header-${this.tableid}`;
    this.header = header;
    this.table.before(this.header);
  }

  /**
   * Initialize a footer bloc after table to contain pagination
   */
  instantiateTableFooter() {
    const footer = document.createElement("div");
    footer.classList.add("a-table-footer", "flex", "ai-c", "jc-sb");
    footer.id = `arise-table-footer-${this.tableid}`;
    this.footer = footer;
    this.table.after(this.footer);
  }


  /**
   * Initialize the pagination at the start and buttons
   * Compute the number of pages max expected
   */
  instantiatePagination() {
    this.footer.innerHTML = "";
    const rows = this.table.querySelectorAll("tbody tr");
    this.maxPages =
      a_safeInt(rows.length / this.options.nbPerPage) +
      (a_safeInt(rows.length) % a_safeInt(this.options.nbPerPage) != 0 ? 1 : 0);

    const pagination = document.createElement("div");
    pagination.classList.add("a-paginate-line", "center");

    var paginationButtons = [];
    for (var i = 0; i < this.maxPages; i++) {
      const button = document.createElement("button");
      button.classList.add(
        "a-btn-sm",
        "a-paginate-btn",
        this.options.paginateClass
      );
      i === 0 && button.classList.add("a-active");
      button.innerText = i + 1;
      button.dataset.index = i;

      button.addEventListener("click", (e) => {
        this.currentPage = e.target.dataset.index;
        this.displayPages();
      });

      paginationButtons.push(button);
      pagination.append(button);
    }

    const paginationText = document.createElement("div");
    paginationText.id = `arise-table-footer-text-${
      this.options.paginationText ? this.tableid : ""
    }`;

    this.footer.append(paginationText, pagination);
    this.paginationButtons = paginationButtons;
  }

  /**
   * Add shuffle class on rows to initalize filtering system
   */
  instantiateRowsClass() {
    for (var row of this.table.querySelectorAll(
      `tbody tr:not(.arise-tr-${this.tableid}`
    ))
      row.classList.add(`arise-tr-${this.tableid}`);
  }

  /**
   * Add Arise shuffle input for row search
   */
  instantiateInputShuffle() {
    const searchGroup = document.createElement("div");
    searchGroup.classList.add("a-input-group", "w-fc");
    const searchIcon = document.createElement("span");
    searchIcon.classList.add("a-input-button");
    searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    const searchInput = document.createElement("input");
    searchInput.classList.add("a-input");
    !!this.inputSearchClass && searchInput.classList.add(this.inputSearchClass);
    searchInput.id = `arise-search-${this.tableid}`;
    this.inputSearch = searchInput;

    searchGroup.append(searchIcon, searchInput);

    this.header.append(searchGroup);
    const shuffler = new AriseShuffle({
      itemSelector: `arise-tr-${this.tableid}`,
      animationTime: 200,
    });

    searchInput.addEventListener("keyup", () => {
      shuffler.filter((element) => {
        const isVisible = this.shuffleFunction(
          element,
          searchInput.value.trim().toLowerCase()
        );
        isVisible
          ? element.classList.remove("a-shuffled-hidden")
          : element.classList.add("a-shuffled-hidden");
        return isVisible;
      });
      if (this.options.nbPerPage) {
        this.currentPage = 0;
        this.displayPages();
      }
    });
  }

  /**
   * Apply listeners on column header to sort lines by content
   */
  instantiateListenerSortingColumn() {
    const tableHeader = this.table.querySelector("thead tr");
    const headers =
      this.options.orderableColumn instanceof Array
        ? this.options.orderableColumn
        : Array(tableHeader.children.length - 0)
            .fill()
            .map((_, idx) => 0 + idx);
    [...headers].forEach((colNumber) => {
      const column = tableHeader.querySelector(
        "th:nth-child(" + (colNumber + 1) + ")"
      );
      if (!column) {
        console.warn(`Arise DataTable : Column ${colNumber} do not exist`);
        return;
      }
      column.classList.add(this.sortClass);
      column.style.cursor = "pointer";
      column.addEventListener("click", () => {
        this.sortColumn(colNumber);
      });
    });
  }

  /* ------------------------------------------ Filtering and Sorting functions ------------------------------ */

  /**
   * Define the filtering algorithm
   *
   * @param {HTMLElement} element
   * @param {string} inputValue
   *
   * @returns {boolean} true if element should be shown, false otherwise
   */
  shuffleFunction(element, inputValue) {
    if (this.options.filterableColumn instanceof Array) {
      var txtRes = "";
      this.options.filterableColumn.forEach(function (index) {
        txtRes += element.querySelector(`td:nth-child(${index + 1})`).innerText;
      });
      return txtRes.toLowerCase().includes(inputValue);
    } else {
      return element.innerText.toLowerCase().includes(inputValue);
    }
  }

  addClassSortHead() {
    if (this.options.orderableColumn instanceof Array) {
      this.options.orderableColumn.forEach((colNumber) => {
        if (!isNaN(colNumber)) {
          //colType = types.includes(options.columnType[colNumber]) ? options.columnType[colNumber] :  types[0];
          this.table.querySelector("th:nth-child(" + colNumber + ")").innerHTML += this.sortIcon;
          this.table.querySelector("th:nth-child(" + colNumber + ")").addEventListener("click", () => {
            this.sortColumn(colNumber);
          });
        }
      });
    } else {
      var tableHeader = this.table.querySelector("thead tr");
      let colNum = 0;
      for (var element of Object.values(tableHeader.children)) {
        element.innerHTML += this.sortIcon;
        element.dataset.col = colNum;
        colNum++;
      }
      tableHeader.addEventListener("click", (e) => {
        this.sortColumn(e.target.closest("th").dataset.col);
      });
    }
  }

  /**
   * Toggle Sort table content depending on the column content
   *
   * @param {int} colNumber
   * @returns
   */
  sortColumn(colNumber) {
    if (colNumber >= this.table.querySelectorAll("thead tr th").length) {
      console.error("Invalid column number. count start at 0.");
      return;
    }
    this.lastSortedColNumber = colNumber;
    var ascending;
    var rows = a_detachAndGet(this.table.querySelector("tbody"));
    for (var row of rows) {
      if (
        !row.hasAttribute(this.directionAttr) ||
        row.getAttribute(this.directionAttr) == a_direction[1]
      ) {
        row.setAttribute(this.directionAttr, a_direction[0]);
        ascending = true;
      } else if (row.getAttribute(this.directionAttr) == a_direction[0]) {
        row.setAttribute(this.directionAttr, a_direction[1]);
        ascending = false;
      }
    }

    var colType = a_types.includes(this.options.columnType[colNumber]) ? this.options.columnType[colNumber] : a_types[0];
    this.functionCaller(colType, ascending, colNumber, rows);

    for (var row of rows) {
      this.table.querySelector("tbody").appendChild(row);
    }

    this.displayPages();
  }

  sortString(rows, value, ascending) {
    rows.sort(function (a, b) {
      if (ascending) {
        return a.children[value].innerHTML.toLowerCase() < b.children[value].innerHTML.toLowerCase() ? -1 : 0;
      } else {
        return a.children[value].innerHTML.toLowerCase() > b.children[value].innerHTML.toLowerCase() ? -1 : 0;
      }
    });
  }

  sortNumber(rows, value, ascending) {
    rows.sort(function (a, b) {
      if (isNaN(a.children[value].innerHTML) || isNaN(b.children[value].innerHTML)) {
        AriseDatatable.throwError(value, rows);
      }

      if (ascending) {
        return a.children[value].innerHTML - b.children[value].innerHTML;
      }

      return b.children[value].innerHTML - a.children[value].innerHTML;
    });
  }

  sortDbDate(rows, value, ascending) {
    const elem = this;
    rows.sort(function (a, b) {
      var allRegex = elem.getRegexConstructs(elem.regex.dateDb);
      if (
        (allRegex[0].test(a.children[value].innerHTML.trim()),
        allRegex[1].test(b.children[value].innerHTML.trim()))
      ) {
      //var allRegex = getRegexConstructs(regex.dateDb);
      //if ((allRegex[0].test(a.children[value].innerHTML.trim()), allRegex[1].test(b.children[value].innerHTML.trim()))) {
        if (ascending) {
          return a.children[value].innerHTML - b.children[value].innerHTML;
        } else {
          return b.children[value].innerHTML - a.children[value].innerHTML;
        }
      } else {
        elem.throwError(value, rows);
      }
    });
  }

  sortDateEnSlash(rows, value, ascending) {
    const elem = this;
    rows.sort(function (a, b) {
      var allRegex = elem.getRegexConstructs(elem.regex.dateEnSlash);
      if (
        (allRegex[0].test(a.children[value].innerHTML),
        allRegex[1].test(b.children[value].innerHTML))
      ) {
      //var allRegex = getRegexConstructs(regex.dateEnSlash);
      //if ((allRegex[0].test(a.children[value].innerHTML), allRegex[1].test(b.children[value].innerHTML))) {
        if (ascending) {
          return new Date(a.children[value].innerHTML) - new Date(b.children[value].innerHTML);
        } else {
          return new Date(b.children[value].innerHTML) - new Date(a.children[value].innerHTML);
        }
      } else {
        elem.throwError(value, rows);
      }
    });
  }

  sortDateEnDash(rows, value, ascending) {
    const elem = this;
    rows.sort(function (a, b) {
      var allRegex = elem.getRegexConstructs(elem.regex.dateEnDash);
      if (
        (allRegex[0].test(a.children[value].innerHTML),
        allRegex[1].test(b.children[value].innerHTML))
      ) {
      //var allRegex = getRegexConstructs(regex.dateEnDash);
      //if ((allRegex[0].test(a.children[value].innerHTML), allRegex[1].test(b.children[value].innerHTML))) {
        var explodedDateA = a.children[value].innerHTML.split("-");
        var explodedDateB = b.children[value].innerHTML.split("-");
        if (ascending) {
          return (
            new Date(`${explodedDateA[1]}/${explodedDateA[2]}/${explodedDateA[0]}`) -
            new Date(`${explodedDateB[1]}/${explodedDateB[2]}/${explodedDateB[0]}`)
          );
        } else {
          return (
            new Date(`${explodedDateB[1]}/${explodedDateB[2]}/${explodedDateB[0]}`) -
            new Date(`${explodedDateA[1]}/${explodedDateA[2]}/${explodedDateA[0]}`)
          );
        }
      } else {
        elem.throwError(value, rows);
      }
    });
  }

  sortDateFrSlash(rows, value, ascending) {
    const elem = this;
    rows.sort(function (a, b) {
      var allRegex = elem.getRegexConstructs(elem.regex.dateFrSlash);
      if (
        (allRegex[0].test(a.children[value].innerHTML),
        allRegex[1].test(b.children[value].innerHTML))
      ) {
      //var allRegex = getRegexConstructs(regex.dateFrSlash);
      //if ((allRegex[0].test(a.children[value].innerHTML), allRegex[1].test(b.children[value].innerHTML))) {
        var explodedDateA = a.children[value].innerHTML.split("/");
        var explodedDateB = b.children[value].innerHTML.split("/");
        if (ascending) {
          return (
            new Date(`${explodedDateA[1]}/${explodedDateA[0]}/${explodedDateA[2]}`) -
            new Date(`${explodedDateB[1]}/${explodedDateB[0]}/${explodedDateB[2]}`)
          );
        } else {
          return (
            new Date(`${explodedDateB[1]}/${explodedDateB[0]}/${explodedDateB[2]}`) -
            new Date(`${explodedDateA[1]}/${explodedDateA[0]}/${explodedDateA[2]}`)
          );
        }
      } else {
        elem.throwError(value, rows);
      }
    });
  }

  sortDateFrDash(rows, value, ascending) {
    const elem = this;
    rows.sort(function (a, b) {
      var allRegex = elem.getRegexConstructs(elem.regex.dateFrDash);
      if (
        (allRegex[0].test(a.children[value].innerHTML),
        allRegex[1].test(b.children[value].innerHTML))
      ) {
      //var allRegex = getRegexConstructs(regex.dateFrDash);
      //if ((allRegex[0].test(a.children[value].innerHTML), allRegex[1].test(b.children[value].innerHTML))) {
        var explodedDateA = a.children[value].innerHTML.split("-");
        var explodedDateB = b.children[value].innerHTML.split("-");
        if (ascending) {
          return (
            new Date(`${explodedDateA[1]}/${explodedDateA[0]}/${explodedDateA[2]}`) -
            new Date(`${explodedDateB[1]}/${explodedDateB[0]}/${explodedDateB[2]}`)
          );
        } else {
          return (
            new Date(`${explodedDateB[1]}/${explodedDateB[0]}/${explodedDateB[2]}`) -
            new Date(`${explodedDateA[1]}/${explodedDateA[0]}/${explodedDateA[2]}`)
          );
        }
      } else {
        elem.throwError(value, rows);
      }
    });
  }

  /**
   * Dispatch to sorting function depending on the column data
   *
   * @param {string} type       data type defined in a_types
   * @param {boolean} ascending true if ascent sort, false otherwise
   * @param {mixed} value
   * @param {HTMLElement} rows
   */
  functionCaller(type, ascending, value, rows) {
    var functions = {
      string: () => {
        this.sortString(rows, value, ascending);
      },
      number: () => {
        this.sortNumber(rows, value, ascending);
      },
      Ymd: () => {
        this.sortDbDate(rows, value, ascending);
      },
      "m/d/Y": () => {
        this.sortDateEnSlash(rows, value, ascending);
      },
      "d/m/Y": () => {
        this.sortDateFrSlash(rows, value, ascending);
      },
      "m-d-y": () => {
        this.sortDateEnDash(rows, value, ascending);
      },
      "d-m-y": () => {
        this.sortDateFrDash(rows, value, ascending);
      },
    };

    functions[type]();
  }

  getRegexConstructs(regex) {
    return [new RegExp(regex), new RegExp(regex)];
  }

  /**
   * Trigger an error on column data type and reinsert row in table without sorting
   *
   * @param {mixed} value
   * @param {HTMLElement} rows
   */
  throwError(value, rows) {
    this.table.querySelector("tbody").append(rows);
    throw ("Error", `Wrong format type for column ${value} !`);
  }

  /* ------------------------------------------ Rendering functions ------------------------------ */

  /**
   * Display the current Page
   */
  displayPages() {
    const rows = this.table.querySelectorAll(
      "tbody tr:not(.a-shuffled-hidden)"
    );
    const min = this.currentPage * this.options.nbPerPage;
    const max = min + this.options.nbPerPage;
    let counter = 1;
    let pageNumber = (rows.length%this.options.nbPerPage > 0) ? a_safeInt(rows.length/this.options.nbPerPage) : a_safeInt(rows.length/this.options.nbPerPage)+1;

    [...rows].forEach((row) => {
      counter <= min || counter > max
        ? row.classList.add("a-hide")
        : row.classList.remove("a-hide");
      counter++;
    });
    var btns = document.getElementById("arise-table-footer-"+this.tableid).querySelectorAll('.a-paginate-btn');
    btns.forEach(btn => { 
      if(btn.dataset.index >= pageNumber){
        btn.classList.add('a-hide');
      }else{
        btn.classList.remove('a-hide');
      }
    }) ;
    
  }

  /* ------------------------------------------ Users functions ------------------------------ */
  /**
   * Display buttons for change of pages.
   * If maxBtn is null, then the number of max buttons stay the same as before
   *
   */
  displayPagesBtn(maxBtn) {
    // TODO Fix launched as duplicate when input change
    if (maxBtn == null) {
      maxBtn = parseInt(
        this.table.querySelectorAll("tfoot button:not(.a-hide)")[this.table.querySelectorAll("tfoot button:not(.a-hide)").length - 1]
          .dataset.index
      );
    }

    var currPage = parseInt(this.table.dataset.page);

    var btns = this.table.querySelectorAll("tfoot button");

    for (var btn of btns) {
      var index = parseInt(btn.dataset.index);

      if (index != undefined && index != maxBtn && index != 0 && (index > currPage + 2 || index > maxBtn || index < currPage - 2)) {
        btn.classList.add("a-hide");
      } else {
        btn.classList.remove("a-hide");
      }
    }

    //Displaying ... buttons at the start and/or at the end
    if (maxBtn > 3 && maxBtn - 3 > currPage) {
      this.table.querySelector("#etcBtnEnd").classList.remove("a-hide");
      this.table.querySelector('button[data-index="' + maxBtn + '"]').before(this.table.querySelector("#etcBtnEnd"));
    } else {
      this.table.querySelector("#etcBtnEnd").classList.add("a-hide");
    }

    if (currPage - 2 > 1) {
      this.table.querySelector("#etcBtnStart").classList.remove("a-hide");
    } else {
      this.table.querySelector("#etcBtnStart").classList.add("a-hide");
    }
  }

  /**
   * Force a table redraw to update after insert or delete rows
   */
  redraw() {
    this.instantiateRowsClass();
    this.instantiatePagination();

    // Relocate currentPage if it does not exist anymore
    const maxPage = a_safeInt(
      this.paginationButtons[this.paginationButtons.length - 1]?.dataset.index
    );
    if (this.currentPage > maxPage) {
      this.currentPage = maxPage;
    }

    const forcedEvent = new Event("keyup");
    this.lastSortedColNumber && this.sortColumn(this.lastSortedColNumber);
    this.inputSearch
      ? this.inputSearch.dispatchEvent(forcedEvent)
      : this.displayPages();
  }

  /**
   * Desallocate current DataTable and remove inserted tiers parts
   */
  destroy() {
    this.footer.remove();
    this.header.remove();
    delete this;
  }
}

window.AriseDatatable = AriseDatatable;
