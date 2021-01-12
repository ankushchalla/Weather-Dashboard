import { changeStyle } from "./change_style.js"
import { getFuture } from "./future.js";

function getWeather(cityName) {
    if (typeof cityName === 'undefined') {
        var name = $("#search-city").val();
    }
    else {
        var name = cityName;
    }
    var city = {
        name: name,
        temp:"",
        humidity: "",
        conditions: "",
        UV: "",
        date: "",
        future: {}
    }
    console.log("city.name", city.name);
        
    var apiKey = "a0e1b9a2b622bab0e9cc16737109dcfb";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        // Build current weather card and display it.
        console.log(response);
        let date = new Date(response.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',  
            month: 'long', 
            day: 'numeric'
        }); 
        city.date = date;
        city.temp = Math.round(response.main.temp);
        city.humidity = response.main.humidity;
        city.conditions = response.weather[0].description;

        // UV requires seperate API call.
        var UVurl = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${apiKey}`;
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (UVresponse) {
            city.UV = UVresponse.value;
            buildWeatherPage(city.name, city.temp, city.humidity, city.conditions, city.UV, city.date);

            $("#forecastBtn").click(function() {
                $(".container").empty();
                changeStyle("./styles/weather-page.css", "./styles/five-day.css")
                getFuture(city.name);
            })
        })
    })
}

function buildWeatherPage(name, temp, humidity, conditions, UV, dateInfo) {
    let container = $(".container");
    let weatherInfo = $("<div>").addClass("weather-info");
    let info = $("<div>").addClass("info");

    weatherInfo.append($("<div>").attr("id", "temp-today").text(`${temp}°`));
    let condition = $("<div>").attr("id", "conditions").text(`${conditions}`);
    let humidityLevel = $("<div>").attr("id", "humidity").text(`Humidity: ${humidity}%`);
    let UVlevel = $("<div>").attr("id", "UV").text(`UV Index: ${UV}`);

    let infoContainer = $("<div>").addClass("info-container");
    let cityDate = $("<div>").addClass("city-date");
    let city = $("<div>").attr("id", "city").text(`${name}`);
    let date = $("<div>").attr("id", "date").text(`${dateInfo}`);

    let forecastBtn = $("<button>").attr("id", "forecastBtn").text("Forecast");

    weatherInfo.append(info.append(condition, humidityLevel, UVlevel));
    infoContainer.append(cityDate.append(city, date), forecastBtn);
    container.append(weatherInfo, infoContainer);

}

export { getWeather };
