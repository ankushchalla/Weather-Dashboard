import { getWeather } from "./components/open_weather.js"
import { changeStyle } from "./components/change_style.js"

function main() {
    let cityName = $("#search-city").val();
    console.log("city", cityName);
    $(".container").empty();
    changeStyle("./styles", "./styles/weather-page.css");
    getWeather(cityName);
}

$("form").on("submit", function(event) {
    event.preventDefault();
    main();
});

export { main };


