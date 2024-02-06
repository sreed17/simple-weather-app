const APP_STATES = {
  LOADING: 0,
  START: 1,
  INFO_DISPLAY: 2,
  ERROR_DISPLAY: 3,
};

const callbackKeys = {
  loading: 0,
  start: 1,
  infoDisplay: 2,
  errorDisplay: 3,
};

export class WeatherAppModel {
  #appState;
  #data;
  #error;
  #stateCallbacks = {};

  constructor(callbacks) {
    this.#appState = APP_STATES["START"];
    this.#data = null;
    this.#error = null;

    // Type checking and initializing callbacks
    if (!callbacks || typeof callbacks !== "object")
      throw new Error("Provide callback functions for each states");

    for (const key in callbackKeys) {
      const valid = key in callbacks && typeof callbacks[key] === "function";
      if (!valid) throw new Error("Ivalid callback parameter");
      this.#stateCallbacks[callbackKeys[key]] = callbacks[key];
    }
  }

  setLoading() {
    this.#setState("loading");
  }

  setData(val) {
    if (typeof val === "object") {
      this.#data = val;
      this.#setState("infoDisplay");
    } else {
      throw new Error("Invalid data");
    }
  }

  clearData() {
    this.#data = null;
    this.#setState("start");
  }

  setError(err) {
    if (err) {
      this.#error = err;
      this.#setState("errorDisplay");
    } else {
      throw new Error("Ivalid error object ");
    }
  }

  #setState(val) {
    switch (val) {
      case "loading": {
        this.#appState = APP_STATES["LOADING"];
        this.#stateCallbacks[this.#appState]();
        break;
      }
      case "start": {
        this.#appState = APP_STATES["START"];
        this.#stateCallbacks[this.#appState]();
        break;
      }
      case "infoDisplay": {
        this.#appState = APP_STATES["INFO_DISPLAY"];
        this.#stateCallbacks[this.#appState](null, this.#data);
        break;
      }
      case "errorDisplay": {
        this.#appState = APP_STATES["ERROR_DISPLAY"];
        this.#stateCallbacks[this.#appState](this.#error, null);
        this.#error = null;
        break;
      }
      default: {
        throw new Error("Invalid state");
      }
    }
  }
}
