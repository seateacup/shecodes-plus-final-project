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

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);