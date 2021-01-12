import { changeStyle } from "./change_style.js"

function getFuture(city) {
    let apiKey = "a0e1b9a2b622bab0e9cc16737109dcfb";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    $.ajax({
        url: url,
        type: "GET"
    }).then(function (response) {
        console.log(response);
        let fiveDay = [];
        /*
            The 5-day forecast is divided into 3 hour time blocks. Thus, every 8 elements is 1 day.
            The code below iterates through 8 element sections to get the max temp + humidity for that section (day).
        */
        let weather = response.list;
        for (let i = 0; i < weather.length; i += 8) {
            let maxTemp = -100;
            let maxHumid = -100;
            let date = new Date(weather[i].dt * 1000);
            let day = toDay(date.getDay());
            let conditions;
            console.log("date", day);
            for (let j = i; j < i + 8; j++) {
                if (maxTemp < weather[j].main.temp) {
                    maxTemp = weather[j].main.temp;
                    conditions = weather[j].weather[0].description;
                }
                if (maxHumid < weather[j].main.humidity) {
                    maxHumid = weather[j].main.humidity;
                }
            }
            fiveDay.push([day, conditions, Math.round(maxTemp), maxHumid]);
        }
        buildFuture(fiveDay);       
    })
}

function buildFuture(fiveDay) {
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
    addHome();
    
}

function addHome() {
    let home = $("<button>").addClass("home").append($("<i>").addClass("fa fa-home"));
    $(".container").append(home);
    $(".home").click(function() {
        location.reload();
    })
}

// Changing direction of scroll wheel.
function horizScrollOn() {
$('.container').on('mousewheel DOMMouseScroll', function(event){
    event.preventDefault();
    var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

    $(this).scrollLeft( $(this).scrollLeft() - ( delta * 40 ) );
});
}

// Helper that gets day of the week given int 0-6.
function toDay(date) {
    let day;
    switch (date) {
        case 0:
            day = "M";
            break;
        case 1:
            day = "Tu";
            break;
        case 2:
            day = "W";
            break;
        case 3:
            day = "Th";
            break;
        case 4:
            day = "F";
            break;
        case 5:
            day = "Sat";
            break;
        case 6:
            day = "Sun";
    }
    return day;
}

export { getFuture };