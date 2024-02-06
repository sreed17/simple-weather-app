export const getWeatherIconImage = (id) => {
  if (typeof id !== "string") throw new Error("invalid weather icon id");
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
};

export const getWeatherCallApiUrlwithCityName = (cityName, API_KEY) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
};

export async function sendWeatherApiRequestWithCityName(locationName, apiKey) {
  if (!location || typeof locationName !== "string")
    throw new Error("Location-name is missing or is invalid");
  const apiUrl = getWeatherCallApiUrlwithCityName(locationName, apiKey);
  const response = await fetch(apiUrl);
  const weatherData = await response.json();

  const isError =
    "cod" in weatherData &&
    "message" in weatherData &&
    !("weather" in weatherData);

  if (isError) throw new Error(`${weatherData.cod}: ${weatherData.message}`);

  return {
    icon: weatherData.weather[0].icon,
    desc: `${weatherData.weather[0].main}`,
    windSpeed: weatherData.wind.speed,
    tempurature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    feelsLike: weatherData.main.feels_like,
  };
}
