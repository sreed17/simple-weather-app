import { sendWeatherApiRequestWithCityName } from "./api-calls";
import { WeatherAppModel } from "./app.model";
import { Elem } from "./dom-manip";
import { showContent, showLoading, expandCard } from "./app.view";
import {
  EMPTY,
  catchError,
  distinctUntilChanged,
  fromEvent,
  map,
  throttleTime,
} from "rxjs";
import "./styles/index.scss";

const weatherAppModel = new WeatherAppModel({
  loading: showLoading,
  start: () => {
    const inputElem = new Elem("#city-name-input");
    inputElem.value = "";
    expandCard(false);
  },
  infoDisplay: showContent,
  errorDisplay: showContent,
});

// search-box form
const searchBox = document.querySelector(".search-box");

fromEvent(searchBox, "submit")
  .pipe(
    throttleTime(1000),
    map((evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      const cityName = formData.get("city-name").trim();
      if (!cityName) throw new Error("City name cannot be empty");
      return cityName;
    }),
    distinctUntilChanged(),
    catchError((error) => {
      console.error("Validation error: ", error.message);
      submitButton.disabled = false;
      return EMPTY;
    })
  )
  .subscribe(async (cityName) => {
    try {
      expandCard(true);
      weatherAppModel.setLoading();
      const data = await sendWeatherApiRequestWithCityName(
        cityName,
        process.env.API_KEY
      );
      weatherAppModel.setData(data);
    } catch (e) {
      weatherAppModel.setError(e);
    }
  });

searchBox.addEventListener("submit", async (evt) => {});

const clearBtn = document.getElementById("clear-btn");
clearBtn.onclick = () => {
  weatherAppModel.clearData();
};

// Loading

var loadingInterval = null;

const clearLoadingInterval = () => {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
};

const loadContent = () => {
  clearLoadingInterval();
  const loader = new Elem(".loader");
  loader.addClass("hidden");
  const weatherCard = new Elem(".weather-card");
  weatherCard.removeClass("hidden");
};

const updateProgress = (val) => {
  const progressBar = new Elem("#loading-progress");
  return setInterval(() => {
    const currentVal = progressBar.getAttribute("value");
    const nextVal = Math.round(parseInt(currentVal) * 1.2);
    const exceedsBoundary = nextVal >= val;
    const value = exceedsBoundary ? val : nextVal;
    progressBar.setAttribute("value", value);
    if (value === 100) setTimeout(loadContent, 100);
    if (exceedsBoundary) {
      clearLoadingInterval();
    }
  }, 100);
};

document.addEventListener("DOMContentLoaded", (evt) => {
  loadingInterval = updateProgress(50);
});

window.addEventListener("load", () => {
  clearLoadingInterval();
  loadingInterval = updateProgress(100);
});
