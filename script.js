const apiKey = "66529d027c84721f3d3d93b04d3e6714";
async function fetchweatherdata(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);
  } catch (error) {
    console.log(error);
  }
}
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity-pc");
const visibilty = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data) {
  cityElement.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  humidity.textContent = `${data.main.humidity} %`;
  visibilty.textContent = `${data.visibility / 1000}KM`;
  descriptionText.textContent = data.weather[0].description;

  const currentDate = new Date();
  date.textContent = currentDate.toDateString();
  const weatherIconName = getWeatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class = "material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-card");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = inputElement.value;
  if (city !== "") {
    fetchweatherdata(city);
    inputElement.value = "";
  }
});

function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Thunderstorm: "flash_on",
    Drizzle: "umbrella",
    Rain: "umbrella",
    Snow: "ac_unit",
    Mist: "grain",
    Smoke: "whatshot",
    Haze: "filter",
    Dust: "visibility",
    Fog: "filter",
    Sand: "visibility",
    Ash: "whatshot",
    Squall: "flash_on",
    Tornado: "tornado",
    Clear: "wb_sunny",
    Clouds: "cloud",
  };
  return iconMap[weatherCondition] || "help";
}
