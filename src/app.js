// DISPLAY CURRENT DATE

function formatDate() {
    let now = new Date();
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let month = months[now.getMonth()];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];
    // let date = now.getDate();
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = `${day} ${hours}:${minutes}`;
}

formatDate();

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function(day) {
        forecastHTML = forecastHTML + `
                  <div class="col-2">
                    <div class="weather-forecast-date">${day}</div>
                    <img
                      src="http://openweathermap.org/img/wn/01d@2x.png"
                      width="60px"
                      alt=""
                    />
                    <div class="weather-forecast-temperature">
                      <span class="weather-forecast-temperature-maximum"
                        >18°</span
                      >
                      <span class="weather-forecast-temperature-minimum"
                        >12°</span
                      >
                    </div>
                </div>`;
    });
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
}

function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apiKey = "7cfa0d2aaa29695fdee2ebd04a28582f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature); 
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayCurrentLocation(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "7cfa0d2aaa29695fdee2ebd04a28582f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentLocation);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentBtn = document.querySelector("#current-location");
currentBtn.addEventListener("click", navigator.geolocation.getCurrentPosition(showPosition));

displayForecast();