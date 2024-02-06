import { Elem, rootCSSVariable } from "./dom-manip";

export const updateWeatherValue = (name, value) => {
  const elem = new Elem(`#${name}-var`);
  elem.textContent = value;
};

export const showLoading = (visible) => {
  showError(false);
  showInfoBox(false);
  const loadingElement = new Elem(".loading-box");
  loadingElement.setCSSPropertyValue("animation-delay", "0.4s");
  if (visible) {
    loadingElement
      .removeClass("fade-out")
      .addClass("fade-in")
      .removeClass("hidden");
  } else {
    loadingElement.removeClass("fade-in").addClass("hidden");
  }
};

export const showError = (visible) => {
  const element = new Elem(".error-box");
  if (visible) {
    element.removeClass("fade-out").addClass("fade-in").removeClass("hidden");
  } else {
    element.removeClass("fade-in").addClass("hidden");
  }
};

export const showWeatherBox = (visible) => {
  const element = new Elem(".weather-box");
  if (visible) {
    element.removeClass("fade-out").addClass("fade-in").removeClass("hidden");
  } else {
    element.removeClass("fade-in").addClass("hidden");
  }
};

export const showInfoBox = (visible) => {
  const element = new Elem(".info-box");
  if (visible) {
    element.removeClass("fade-out").addClass("fade-in").removeClass("hidden");
  } else {
    element.removeClass("fade-in").addClass("hidden");
  }
};

export const updateVars = (val) => {
  updateWeatherValue("feels-like", val.feelsLike);
  updateWeatherValue("tempurature", val.tempurature);
  updateWeatherValue("humidity", val.humidity);
  updateWeatherValue("wind-speed", val.windSpeed);
};

export const showContent = (error, val) => {
  showLoading(false);
  if (val) {
    showError(false);
    showWeatherBox(true);
    showInfoBox(true);
    updateVars(val);
  }
  if (error) {
    showWeatherBox(false);
    showInfoBox(false);
    showError(true);
  }
};

export const expandCard = (expand = undefined) => {
  const heightVar = "card-height";
  const heights = { expanded: "500px", collapsed: "46px" };
  if (expand) {
    rootCSSVariable(heightVar, heights.expanded);
    showLoading(true);
  } else {
    rootCSSVariable(heightVar, heights.collapsed);
  }
};
export function createAutocompleteDropDown(values, parent) {
  const { bottom, left, right } = parent.getBoundingClientRect();

  const container = document.createElement("div");
  container.classList.add("autocomplete-dropdown-menu");
  container.style.position = "absolute";
  container.style.top = bottom + "px";
  container.style.left = left + "px";
  container.style.right = right + "px";
  container.style.zIndex = 100;

  const MenuItem = (val) => {
    const menuItem = document.createElement("button");
    menuItem.value = val;
    menuItem.onClick = () => {
      parent.value = val;
      document.removeChild(container);
    };
    return menuItem;
  };

  for (const val of values) {
    container.appendChild(MenuItem(val));
  }

  document.body.appendChild(container);
}

export const createOptionElement = (val) => {
  const elem = document.createElement("option");
  elem.value = val;
  return elem;
};
