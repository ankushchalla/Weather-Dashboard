import { addHome } from "../buttons/nav_buttons.js";


// Takes in a city object and renders the information onto the page.
function buildWeatherPage(city) {
    let container = $(".container");
    let weatherContainer = $("<div>");
    let weatherInfo = $("<div>").addClass("weather-info");
    let info = $("<div>").addClass("info");

    weatherInfo.append($("<div>").attr("id", "temp-today").text(`${city.temp}°`));
    let condition = $("<div>").attr("id", "conditions").text(`${city.conditions}`);
    let humidityLevel = $("<div>").attr("id", "humidity").text(`Humidity: ${city.humidity}%`);
    let UVlevel = $("<div>").attr("id", "UV").text(`UV Index: ${city.UV}`);

    let infoContainer = $("<div>").addClass("info-container");
    let cityDate = $("<div>").addClass("city-date");
    let cityName = $("<div>").attr("id", "city").text(`${city.name}`);
    let date = $("<div>").attr("id", "date").text(`${city.date}`);

    let forecastBtn = $("<button>").attr("id", "forecastBtn").text("Forecast");

    addHome(weatherContainer);
    weatherContainer.append(weatherInfo.append(info.append(condition, humidityLevel, UVlevel)));
    infoContainer.append(cityDate.append(cityName, date), forecastBtn);
    container.append(weatherContainer, infoContainer);
}

export { buildWeatherPage };