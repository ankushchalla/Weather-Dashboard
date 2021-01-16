
function getFuture(city) {
    return new Promise(resolve => {
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
            resolve(fiveDay);
        })
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