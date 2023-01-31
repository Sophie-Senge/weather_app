let todayWeatherDisplay = document.querySelector("#today");
let citiesHistoryEl = document.querySelector("#history");
let forecastEl = document.querySelector("#forecast");

// function to get city information
function fetchCity(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=d79ebdf8167debecd6d65d2247f86bad`)
    .then(response => response.json())
    .then(citiesFound => {
      let firstCity = citiesFound[0];
      // console.log(firstCity.lat);
      // console.log(firstCity.lon);
      fetchWeather(firstCity.lat, firstCity.lon)
    })

}
//function to get lat and lon
function fetchWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d79ebdf8167debecd6d65d2247f86bad&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      mainCard(data)
      makeForecast(data)
    })
}

function mainCard(data) {
  let cityName = data.city.name;
  saveToStorage(cityName)
  // console.log(data.city.name)
  //needs to be current date
  let cityLocation = data.list[0].dt
  let cityDate = moment(cityLocation, "X").format("DD/MM/YY")
  // console.log(data.list[0].dt)
  //Temp
  let cityTemp = data.list[0].main.temp;
  // console.log(data.list[0].main.temp)
  //wind speed
  let cityWind = data.list[0].wind.speed;
  // console.log(data.list[0].wind.speed)
  //humidity
  let cityHumidity = data.list[0].main.humidity;
  // console.log(data.list[0].main.humidity)

  //icon grab
  // console.log(data.list[0].weather[0].icon)
  let icon = data.list[0].weather[0].icon
  icon = `http://openweathermap.org/img/wn/${icon}@2x.png`;


  let mainWeatherCard =
    `
<div class="card" style="width: 75;">
<ul class="list-group list-group-flush">
<h1>${cityName} <img class="img-thumbnail rounded" src=${icon}></h1>
<h2>${cityDate}</h2>
  <li class="list-group-item">Temp: ${cityTemp} °C</li>
  <li class="list-group-item">Wind: ${cityWind} KPH</li>
  <li class="list-group-item">Humidity: ${cityHumidity} %</li>
</ul>
</div>`
  todayWeatherDisplay.innerHTML = mainWeatherCard;

}

function makeForecast(data) {
  forecastEl.innerHTML = ""
  for (let i = 3; i < data.list.length; i += 8) {
    // const element = array[i];
    // console.log(data.list[8])
    cityLocation = data.list[i].dt
    cityDate = moment(cityLocation, "X").format("DD/MM/YY");
    cityTemp = data.list[i].main.temp;
    cityWind = data.list[i].wind.speed;
    cityHumidity = data.list[i].main.humidity
    icon = data.list[i].weather[0].icon
    icon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let fiveDays = `
  <div class="card-header">
    ${cityDate} <img class="img-thumbnail rounded" src=${icon}>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Temp: ${cityTemp} °C</li>
    <li class="list-group-item">Wind: ${cityWind} KPH</li>
    <li class="list-group-item">Humidity: ${cityHumidity} %</li>
  </ul>`

    // forecastEl.innerHTML = fiveDays;
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card col-sm-2")
    newDiv.innerHTML = fiveDays;
    forecastEl.append(newDiv);
  }
}


document.querySelector("#search-button").addEventListener("click", function (event) {
  event.preventDefault();
  let citySearched = document.querySelector("#search-input").value;
  fetchCity(citySearched)
})

function saveToStorage(newCity){
  var citiesHistory = JSON.parse(localStorage.getItem("weather-search"))
  if(citiesHistory.includes(newCity)){
    return
  }
  citiesHistory.push(newCity)
  localStorage.setItem("weather-search", JSON.stringify(citiesHistory))
  renderButtons()
}

function renderButtons() {
  console.log("Rendering buttons")
  var citiesHistory = JSON.parse(localStorage.getItem("weather-search"))
  if(citiesHistory === null){
    console.log("it's null")
    localStorage.setItem("weather-search", JSON.stringify([]))
    return
  }
  $("#history").empty();
  for (let i = 0; i < citiesHistory.length; i++) {
    let buttons = $("<button>");
    buttons.addClass("city");
    buttons.addClass("btn btn-outline-dark btn-sm");
    buttons.attr("data-name", citiesHistory[i]);
    buttons.text(citiesHistory[i]);
    $("#history").append(buttons);
    
    
  }
 
}
// i need to be able to get weather data for this
$(document).on("click", ".city", fetchCity);


renderButtons();