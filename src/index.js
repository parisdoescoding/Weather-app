function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
  
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = cityInput.value;
  }
  
  let form = document.querySelector("form");
  
  form.addEventListener("submit", searchCity);
  
  function convertTemp(event) {
    event.preventDefault();
    let currentTemp = document.querySelector(".temperature");
    currentTemp.innerHTML = "°C";
  }
  
  let now = new Date();
  console.log(now);
  console.log(now.getMilliseconds());
  console.log(now.getDay());
  console.log(now.getFullYear());
  console.log(now.getMonth());
  
  let h3 = document.querySelector("h3");
  let date = now.getDate();
  let year = now.getFullYear();
  
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = days[now.getDay()];
  
  h3.innerHTML = `${day}, ${date} ${month} ${year}`;
  
  let h4 = document.querySelector("h4");
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  h4.innerHTML = `${hours}:${minutes}`;
  
  function displayWeather(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector(".temperature");
    let temperature = Math.round(response.data.main.temp);
    temperatureElement.innerHTML = `${temperature}`;
    document.querySelector("#current-city").innerHTML = response.data.name;
    let humidityElement = document.querySelector("#humidity");
    let humidity = Math.round(response.data.main.humidity);
    humidityElement.innerHTML = `${humidity}`;
    let windElement = document.querySelector("#wind");
    let wind = Math.round(response.data.wind.speed);
    windElement.innerHTML = `${wind}`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celsiusTemperature = response.data.main.temp;
  }
  
  function search(event) {
    event.preventDefault();
  
    let apiKey = "e415f3a15e30e3c0aed9dae29f1ce456";
    let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  form.addEventListener("submit", search);
  
//current Location

function searchLocation(position) {
  let apiKey = "e415f3a15e30e3c0aed9dae29f1ce456";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
 

//Coverting Celcius/Fahrenheit

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let fahrenheitTemperature = (temperatureElement.innerHTML* 9) / 5+32;
  temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
}

let temperatureElement = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsuisLink = document.querySelector("#celsius-link");
celsuisLink.addEventListener("click", displayCelsiusTemperature)