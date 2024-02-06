export class Elem {
  #elements;

  constructor(selector) {
    this.#elements = document.querySelectorAll(selector);
  }

  get exists() {
    return this.#elements && this.#elements.length > 0;
  }

  get length() {
    if (!this.exists) return 0;
    return this.#elements.length;
  }

  get element() {
    if (!this.exists) throw new Error("element does not exist");
    return this.#elements[0];
  }

  get elements() {
    if (!this.exists) throw new Error("element does not exist");
    return this.#elements;
  }

  addClass(className) {
    if (!this.exists) throw new Error("element does not exist");
    this.#elements.forEach((element) => {
      element.classList.add(className);
    });
    return this;
  }

  removeClass(className) {
    if (!this.exists) throw new Error("element does not exist");
    this.#elements.forEach((element) => {
      element.classList.remove(className);
    });
    return this;
  }

  setAttribute(name, value) {
    if (!this.exists) throw new Error("element does not exist");
    this.#elements.forEach((element) => {
      element.setAttribute(name, value);
    });
    return this;
  }

  getAttribute(name) {
    // returns the attribute of the
    if (this.exists) return this.#elements[0].getAttribute(name);
    throw new Error("element does not exist");
  }

  getDistictAttributeValues(name) {
    if (!this.exists) throw new Error("element does not exist");
    if (this.length === 1) return this.#elements[0].getAttribute(name);
    const attributeValues = new Set();
    this.#elements.forEach((element) => {
      const value = element.getAttribute(name);
      if (value !== null) {
        attributeValues.add(value);
      }
    });
    return Array.from(attributeValues);
  }

  getCSSPropertyValue(name) {
    return getComputedStyle(this.#elements[0]).getPropertyValue(name).trim();
  }

  setCSSPropertyValue(name, value, priority = undefined) {
    if (!this.exists) throw new Error("element does not exist");
    return this.#elements.forEach((element) => {
      element.style.setProperty(name, value, priority);
    });
  }

  get textContent() {
    if (!this.exists) throw new Error("element does not exist");
    return this.#elements[0].textContent;
  }

  set textContent(value) {
    if (!this.exists) throw new Error("element does not exist");
    this.#elements[0].textContent = String(value);
  }

  get value() {
    if (!this.exists) throw new Error("element does not exist");
    return this.#elements[0].value;
  }

  set value(value) {
    if (!this.exists) throw new Error("element does not exist");
    this.#elements[0].value = value;
  }
}

export const getRootCSSProperty = (name) => {
  if (!name) throw new Error("CSS variable name is required");
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

export const setRootCSSProperty = (name, value, priority = undefined) => {
  if (!name) throw new Error("CSS variable name is required");
  document.documentElement.style.setProperty(name, value, priority);
};

const cssVariable = (name) => `--${name}`;

export function rootCSSVariable(name, value = undefined, priority = undefined) {
  const varName = cssVariable(name);
  if (typeof value !== undefined) {
    setRootCSSProperty(varName, value, priority);
  } else {
    return getRootCSSProperty(varName);
  }
}
