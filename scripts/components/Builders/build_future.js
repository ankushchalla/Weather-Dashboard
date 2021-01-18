import { getWeather } from "../open_weather.js";
import { changeStyle } from "../change_style.js";
import { buildLanding } from "../Builders/build_landing.js";

// Adds five day forecast info onto screen.
function buildFuture(fiveDay, cityName) {
    addButtons(cityName);
    for (let i = 0; i < fiveDay.length; i++) {
        let card = $("<div>").addClass("box").attr("id", `day-${i}`);
        let tempAndDay = $("<div>").addClass("temp-day");
        let temp = $("<div>").addClass("temp").text(`${fiveDay[i][2]}°`);
        let day = $("<div>").addClass("day").text(fiveDay[i][0]);
        tempAndDay.append(temp, day);

        let conditions = $("<div>").addClass("conditions").text(fiveDay[i][1]);
        let humidity = $("<div>").addClass("humidity").text(`Humidity: ${fiveDay[i][3]}%`);

        $(".container").append(card.append(tempAndDay, conditions, humidity));
    }

    // For some reason, margin right on last box is only applied if something comes after it.
    // This is hacky, look for better solution.
    $(".container").append($("<div>").addClass("space-hack").text("`"));
    horizScrollOn();

}

function addButtons(cityName) {
    let bttnContainer = $("<div>").addClass("button-container");
    let home = $("<button>").addClass("home").append($("<i>").addClass("fa fa-home"));
    let back = $("<button>").addClass("back").text("return");
    $(".container").append(bttnContainer.append(home, back));
    home.click(function () {
        $(".container").empty();
        changeStyle("./styles", "./styles/landing.css");
        buildLanding();
    })
    back.click(function () {
        $(".container").empty();
        changeStyle("./styles", "./styles/weather-page.css");
        getWeather(cityName);
    })
}

// Changing direction of scroll wheel.
function horizScrollOn() {
    $('.container').on('mousewheel DOMMouseScroll', function (event) {
        event.preventDefault();
        var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

        $(this).scrollLeft($(this).scrollLeft() - (delta * 40));
    });
}

export { buildFuture };