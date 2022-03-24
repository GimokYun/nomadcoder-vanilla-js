const API_KEY = "20a6d27aa9bbfec1ee56bc07a8a68f51";

const weatherPart = document.querySelector("#weather");
const weatherPopup = document.querySelector(".weather__popup");

const weatherIcons = {
    "sun" : `<i class="fa-solid fa-sun"></i>`,
    "moon" : `<i class="fa-solid fa-moon"></i>`,
    "clouds" : `<i class="fa-solid fa-cloud"></i>`,
    "snow" : `<i class="fa-solid fa-snowflake"></i>`,
    "rain" : `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
    "thunder" : `<i class="fa-solid fa-bolt-lightning"></i>`,
    "drizzle" : `<i class="fa-solid fa-cloud-rain"></i>`,
    "smog" : `<i class="fa-solid fa-smog"></i>`,
    "tornado" : `<i class="fa-solid fa-wind"></i>`
}

const daysUpper = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; 

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherToday(lat, lon);
    forecastWeather(lat, lon);
}

function getWeatherToday(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        const popUpMessage = document.querySelector(".weather__popup-message");
        const popUpLocation = document.querySelector("#popupLocation");
        const popUpDescription = document.querySelector("#popupDescription");
        const popUpTodayWeather = document.querySelector("#popupToday");

        const hours = getPresentHours();

        const weatherMain = data.weather[0].main;
        const weatherDescription = data.weather[0].description;

        let weatherKey = "";
        let weatherMessage = "";
        switch(weatherMain) {
            case "Thunderstorm" : 
                weatherKey = "thunder";
                weatherMessage = "I hope nothing goes wrong.";
                break;
            case "Drizzle" :
                weatherKey = "drizzle";
                weatherMessage = "Take an umbrella.";
                break;
            case "Rain" :
            case "Squall" :
                weatherKey = "rain";
                weatherMessage = "Take an umbrella.";
                break;
            case "Snow" :
                weatherKey = "snow";
                weatherMessage = "Beware of the icy road.";
                break;
            case "Tornado" :
                weatherKey = "tornado";
                weatherMessage = "I hope nothing goes wrong.";
                break;
            case "Clear" :
                console.log(hours)
                console.log(hours>=6 && hours <=18)
                if (hours >= 6 && hours <= 18) {
                    weatherKey = "sun";
                }
                else {
                    weatherKey = "moon";
                }
                weatherMessage = "Take a walk and ventilate.";
                break;
            case "Clouds" :
                weatherKey = "clouds";
                weatherMessage = "Don't be too down.";
                break;
            default :
                weatherKey = "smog";
        }

        const weatherIcon = weatherIcons[weatherKey];
        city.innerText = data.name;
        popUpLocation.innerText = data.name;
        const weatherText = `${Math.round(data.main.temp)}°C`;
        weather.innerHTML = `${weatherIcon}${weatherText}`;
        popUpTodayWeather.innerHTML = `${weatherIcon}${weatherText}`;
        popUpDescription.innerText= weatherDescription;

        popUpMessage.innerText = `${weatherMessage} Have a good day:)`;
    });
}

function forecastWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const forecastIcons = document.querySelectorAll(".forecast__icon");
        const maxDegrees = document.querySelectorAll(".forecast__max-degree");
        const minDegrees = document.querySelectorAll(".forecast__min-degree");
        const forecastDays = document.querySelectorAll(".forecast__day");

        for(let i = 0 ; i < forecastIcons.length ; i++) {
            const weatherMain = data.daily[i].weather[0].main;
            const maxDegree = Math.round(data.daily[i].temp.max);
            const minDegree = Math.round(data.daily[i].temp.min);
            const date = new Date();

            let weatherKey = "";
            switch(weatherMain) {
                case "Thunderstorm" : 
                    weatherKey = "thunder";
                    break;
                case "Drizzle" :
                    weatherKey = "drizzle";
                    break;
                case "Rain" :
                case "Squall" :
                    weatherKey = "rain";
                    break;
                case "Snow" :
                    weatherKey = "snow";
                    break;
                case "Tornado" :
                    weatherKey = "tornado";
                    break;
                case "Clear" :
                    weatherKey = "sun";
                    break;
                case "Clouds" :
                    weatherKey = "clouds";
                    break;
                default :
                    weatherKey = "smog";
            }
            forecastIcons[i].innerHTML = weatherIcons[weatherKey];
            maxDegrees[i].innerText = `${maxDegree}°C`;
            minDegrees[i].innerText = `${minDegree}°C`;
            forecastDays[i].innerText = daysUpper[(date.getDay() + i) % 7];
        } 
    });
}

function getPresentHours() {
    const date = new Date();
    return date.getHours();
}

function onGeoError() {
    alert("Can't find you. Weather can't be provided😰");
}

function handleWeatherClick() {
    weatherPopup.classList.toggle("hidden");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
weatherPart.addEventListener("click", handleWeatherClick);