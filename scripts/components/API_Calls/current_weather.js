
function getWeatherToday(name) {
    let apiKey = "a0e1b9a2b622bab0e9cc16737109dcfb";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=${apiKey}`;
    
    let city = {
        name: name,
        temp:"",
        humidity: "",
        conditions: "",
        UV: "",
        date: "",
        future: {}
    }

    return new Promise(resolve => {
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            // Get current weather data.
            let date = new Date(response.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'long',  
                month: 'long', 
                day: 'numeric'
            }); 
            city.date = date;
            city.temp = Math.round(response.main.temp);
            city.humidity = response.main.humidity;
            city.conditions = response.weather[0].description;

            // UV index requires seperate ajax call using date found in response.
            let UVurl = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${apiKey}`;
            $.ajax({
                url: UVurl,
                method: "GET"
            }).then(function (UVresponse) {
                city.UV = UVresponse.value;
                resolve(city);
            });
        }).fail( (xhr, status, error) => {
            if (xhr.status === 404 || xhr.status === 400) {
                alert(`The OpenWeather API responded with a ${xhr.status} Error: ${error}. Please try another request.`);
                location.reload();
            }
            else {
                throw error;
            }
        });
    });
}

export { getWeatherToday };