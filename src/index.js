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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
  
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index){
    if (index <6) {
  forecastHTML = forecastHTML +`

  <div class="carousel-inner">
  <div class="carousel-item active">
    <div class="d-flex justify-content-around text-center mb-4 pb-3 pt-2">
      <div class="flex-column">
        <p class="weather-forecast-temperatures"><strong>21°C</strong></p>
        <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;">   <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      /></i>
        <p class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></p>
      </div>
      <div class="flex-column">
        <p class="weather-forecast-temperatures"><strong>${Math.round(
          forecastDay.temp.max
        )}°</strong></p>
        <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;">   <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      /></i>
        <p class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></p>
      </div>
      <div class="flex-column">
        <p class="weather-forecast-temperatures"><strong><span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span></strong></p>
        <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;">   <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      /></i>
        <p class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></p>
      </div>
      <div class="flex-column">
        <p class="weather-forecast-temperatures"><strong><span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span></strong></p>
        <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;">   <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      /></i>
        <p class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></p>
      </div>
      <div class="flex-column">
        <p class="weather-forecast-temperatures"><strong><span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span></strong></p>
        <i class="fas fa-cloud-showers-heavy fa-2x mb-3" style="color: #ddd;">   <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      /></i>
        <p class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></p>
      </div>
    </div>
  </div>
</div>
`;
    }
  });

}

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
  
  function getForecast(coordinates){
    let apiKey = "e415f3a15e30e3c0aed9dae29f1ce456";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
    axios.get(apiURL).then(displayForecast);
  }
  
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

    getForecast(response.data.coord);
    
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



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsuisLink = document.querySelector("#celsius-link");