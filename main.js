var allCities = []

function getWeather(cityName) {
    if (typeof cityName === 'undefined') {
        var name = $("#search-city").val();
        $("#search-city").text("")
    }
    else {
        var name = cityName;
    }
    var city = {
        name: name,
        temp:"",
        humidity: "",
        wind: "",
        UV: "",
        future: {}
    }
    
    if (!(allCities.includes(city.name.toLowerCase()))) {
        console.log(city.name.toLowerCase());
        allCities.unshift(city.name.toLowerCase());
    }
    
    var apiKey = "a0e1b9a2b622bab0e9cc16737109dcfb";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
    $("#weather-col").html("");
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        // Build current weather card and display it.
        city.temp = toFaren(response.main.temp);
        city.humidity = response.main.humidity;
        city.wind = response.wind.speed;

        // UV requires seperate API call.
        var UVurl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${apiKey}`;
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (UVresponse) {
            city.UV = UVresponse.value;
            var cityCard = buildCard(city.name, city.temp, city.humidity, city.wind, city.UV);
            $("#weather-col").append(cityCard);

            getFuture(city);
        })
    })

    //Enabling persistence of searched cities.
    if (localStorage.getItem("allCities") === null) {
        localStorage.setItem("allCities", JSON.stringify(allCities));
    }
    else {
        localStorage.setItem("allCities", JSON.stringify(allCities));
    }
    renderList();
}

// Get 5-day forecast, add info to city object, and display.
function getFuture(city) {
    var apiKey = "a0e1b9a2b622bab0e9cc16737109dcfb";
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=imperial&appid=${apiKey}`;    
    $.ajax({
        url: url,
        type: "GET"
    }).then(function(response) {
        var fiveDay = [];
        /*
            The 5-day forecast is divided into 3 hour time blocks. Thus, every 8 elements is 1 day.
            The code below iterates through 8 element sections to get the max temp + humidity for that section (day).
        */
        var weather = response.list;
        var iconURL;
        for (var i = 0; i < weather.length; i += 8) {
            var maxTemp = -100;
            var maxHumid = -100;
            var date = formatDate(weather[i].dt_txt.split(" ")[0]);
            for (var j = i; j < i + 8; j++) {
                if (maxTemp < weather[j].main.temp) {
                    maxTemp = weather[j].main.temp;
                    var icon = weather[j].weather[0].icon;
                    iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
                }
                if (maxHumid < weather[j].main.humidity) {
                    maxHumid = weather[j].main.humidity;
                }
            }
            fiveDay.push([date, iconURL, maxTemp, maxHumid]);
        }
        buildFuture(fiveDay);       
    })
}

function buildFuture(fiveDay) {
    var fiveGrid = $("<div>").addClass("d-flex");
    for (var i = 0; i < fiveDay.length; i++) {
        var dayCard = $("<div>").addClass("card mt-1 mb-2 flex-fill");
        var date = $("<div>").addClass("card-header text-center pb-1").append($("<h5>").text(fiveDay[i][0]));
        var body = $("<div>").addClass("card-body");
        var image = $("<img>").attr("src", fiveDay[i][1]);
        var content = $("<p>").addClass("card-text").html(`High: ${fiveDay[i][2]}</br>Humidity: ${fiveDay[i][3]}%`);
        fiveGrid.append(dayCard.append(date, body.append(image, content)));
    }
    $("#weather-col").append(fiveGrid);
}

function buildCard(name, temp, humidity, wind, UV) {
    var cityCard = $("<div>").addClass("card today");
    var title = $("<h2>").text(name).attr("style", "text-transform:capitalize;");
    var header = $("<div>").addClass("card-header").append(title);
    var body = $("<div>").addClass("card-body").append($("<h1>").addClass("card-title").text(`${temp} °F`));
    var listGroup = $("<ul>").addClass("list-group list-group-flush");
    if (UV < 2) {
        var UVlabel = "success";
    }
    else if (UV >= 2 || UV < 6) {
        var UVlabel = "warning";
    }
    else {
        var UVlabel = "danger";
    }

    listGroup.append($("<li>").addClass("list-group-item").text(`Humidity: ${humidity}%.`),
        $("<li>").addClass("list-group-item").text(`Wind Speed: ${wind} meters/sec.`),
        $("<li>").addClass(`list-group-item list-group-item-${UVlabel}`).text(`UV: ${UV}.`));
    cityCard.append(header, body, listGroup);
    return cityCard;
}

function renderList() {
    $("#cities").html("");
    if (localStorage.getItem("allCities") === null) {
        return;
    }
    else {
        allCities = JSON.parse(localStorage.getItem("allCities"));
    }
    for (var i = 0; i < allCities.length; i++) {
        var city = $("<button>").attr("type", "button").addClass("list-group-item list-group-item-action").text(allCities[i]);
        $("#cities").append(city);
    }
}

function formatDate(date) {
    // var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8);
    return `${month}/${day}`;
}

function toFaren(K) {
    var F = (K - 273.15) * (9 / 5) + 32;
    return F.toFixed(2);
}

function main() {
    renderList();
    // Display weather information of last searched city on load.
    if (localStorage.getItem("allCities") !== null) {
        var lastCity = JSON.parse(localStorage.getItem("allCities"))[0];
        getWeather(lastCity);
    }

    $("form").on("submit", function (event) {
        event.preventDefault();
        getWeather();
    });

    $("#search").click(function(event) {
        event.preventDefault();
        getWeather();
    });

    $("#cities").click(function(event) {
        getWeather(event.target.textContent);
    })
}

main();