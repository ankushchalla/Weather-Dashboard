import { changeStyle } from "./change_style.js"
import { getFuture } from "./API_Calls/future.js";
import { getWeatherToday } from "./API_Calls/current_weather.js";
import { buildWeatherPage } from "./Builders/build_today.js";
import { buildFuture } from "./Builders/build_future.js";

async function getWeather(cityName) {
    let name;
    if (typeof cityName === 'undefined') {
        name = $("#search-city").val();
    }
    else {
        name = cityName;
    }

    let weatherToday = await getWeatherToday(name);
    buildWeatherPage(weatherToday);

    $("#forecastBtn").click(async function () {
        $(".container").empty();
        changeStyle("./styles/weather-page.css", "./styles/five-day.css")
        let fiveDay = await getFuture(name);
        buildFuture(fiveDay);
    })
}

export { getWeather };
