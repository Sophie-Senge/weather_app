
let todayWeatherDisplay = document.querySelector("#today");
let citiesHistoryEl = document.querySelector("#history");
let forecastEl = document.querySelector("#forecast");


let citiesHistory = [];



// function with add event listener with fetch values


document.querySelector("#search-button").addEventListener("click", function(event){
event.preventDefault();
let citySearched = document.querySelector("#search-input").value;
citiesHistory.push(citySearched);
renderButtons();

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=d79ebdf8167debecd6d65d2247f86bad`)
.then(response => response.json())
.then(citiesFound =>{
  let firstCity = citiesFound[0];
  // console.log(firstCity.lat);
  // console.log(firstCity.lon);

  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=d79ebdf8167debecd6d65d2247f86bad&units=metric`)
})

.then(response => response.json())
.then(data => {
  console.log(data)
  console.log(data.list[8])
  //values which need to be used in main weather div
  let cityName = data.city.name;
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
 

    // for (let i = 8; i < 40; i + 8) {
      // const element = array[i];
      
      console.log(data.list[8])

      cityLocation = data.list[8].dt
      cityDate = moment(cityLocation, "X").format("DD/MM/YY");
      cityTemp = data.list[8].main.temp;
      cityWind = data.list[8].wind.speed;
      cityHumidity = data.list[8].main.humidity
      icon = data.list[8].weather[0].icon
      icon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  
      let fiveDays = `<div class="card" style="width: 18rem;">
      <div class="card-header">
        ${cityDate} <img class="img-thumbnail rounded" src=${icon}>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Temp: ${cityTemp} °C</li>
        <li class="list-group-item">Wind: ${cityWind} KPH</li>
        <li class="list-group-item">Humidity: ${cityHumidity} %</li>
      </ul>
    </div>`
  
    forecastEl.innerHTML = fiveDays;
  
      
    // }
    
  
})


})

//function to cycle through 5 days temp



//function to render cities history

function renderButtons(){

  $("#history").empty();

  for (let i = 0; i < citiesHistory.length; i++) {
    
    let buttons = $("<button>");
    buttons.addClass("city");
    buttons.text(citiesHistory[i]);
    $("#history").append(buttons);
    
  }

}


// i need to be able to get weather data for this
// $(document).on("click", ".city",);

// renderButtons();







