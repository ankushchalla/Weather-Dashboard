import { getWeather } from "./components/open_weather.js"
import { changeStyle } from "./components/change_style.js"

function main() {
    let cityName = $("#search-city").val();
    $(".container").empty();
    changeStyle("./styles/landing.css", "./styles/weather-page.css");
    getWeather(cityName);
}

$("#form").on("submit", function(event) {
    event.preventDefault();
    main();
});


