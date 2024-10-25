class GridView {
  /**
   * Конструктор для создания виджета таблицы
   * @constructor
   * @param {array} _tableClass - css классы для оформления таблицы
   * @param {array} data - входные данные
   * @param {array} attribute - управляем то что вводим
   * @param {array} _element - куда вываодить таблицу
   * @param {string} _header - заголовок таблицы
   * @param {array} _headerClass - css классы заголовка
   */
  constructor() {
    this._header = "";
    this._headerClass = [];
    this._tableClass = [];
    this._attribute = [];
    this._element = document.querySelector("body");
  }

  /**
   * Метод setHeader - позволяет менять значения свойства _header по определенному алгоритму
   * @param {string} header - заголовок таблицы в виде строки
   * @return {boolean} - возвращает true, когда все хорошо и false, когда входные данные либо не являются строкой, либо является пустой строкой
   */

  setHeader(header) {
    if (typeof header === "string" && header.trim() !== "") {
      this._header = header.trim();
      return true;
    }
    return false;
  }

  /**
   * Метод setHeaderClass - позволяет менять значения свойства _headerClass по определенному алгоритму
   * @param {array} headerClass - css классы для заголовка
   * @return {boolean} - возвращает true, когда все хорошо и false, когда входные данные не являются массивом
   */

  setHeaderClass(headerClass) {
    if (Array.isArray(headerClass)) {
      this._headerClass = headerClass;
      return true;
    }
    return false;
  }

  /**
   * Метод setElement - обычный сеттер, который позволяет менять значения свойства _element по определенному алгоритму
   * @param {array} element
   * @return {boolean} - возвращает true, когда все хорошо и false, когда не находит элемент в DOM дереве
   */

  setElement(element) {
    if (document.querySelector(element)) {
      this._element = document.querySelector(element);
      return true;
    }
    return false;
  }

  /**
   * Метод для вывода заголовка таблицы
   */

  renderHeader(data) {
    this.setHeader(data.header);
    this.setHeaderClass(data.headerClass);
    this.setElement(data.element);

    // Показываем заголовок таблицы
    if (this._header) {
      const header = document.createElement("h2");
      header.textContent = this._header;
      this._headerClass.forEach((cssClass) => {
        header.classList.add(cssClass);
      });
      this._element.append(header);
    }
  }

  /**
   * Метод для вывода таблицы
   */

  renderTable(data) {
    this.data = data.data;
    this.attribute = data.attribute;

    // Показываем таблицу
    const table = document.createElement("table");
    this._tableClass.forEach((cssClass) => {
      table.classList.add(cssClass);
    });

    // Выводим хедер таблицы
    const trHeader = document.createElement("tr");
    for (let key in this.attribute) {
      const th = document.createElement("th");
      if (this.attribute[key].label) {
        th.textContent = this.attribute[key].label;
      } else {
        th.textContent = key;
      }
      trHeader.append(th);
    }
    table.append(trHeader);

    // Отрисовка остальной таблицы
    this.data.forEach((item) => {
      const tr = document.createElement("tr");
      for (let key in this.attribute) {
        const td = document.createElement("td");
        let value = item[key];
        // Есть ли функция в value
        if (this.attribute[key].value) {
          value = this.attribute[key].value(item);
        }
        // Атрибут src
        if (this.attribute[key].src) {
          td.innerHTML = value;
        } else {
          td.textContent = value;
        }
        tr.append(td);
      }
      table.append(tr);
    });

    this._element.append(table);
  }
}
