// add event listener with fetch values

document.querySelector("#search-button").addEventListener("click", function(event){
event.preventDefault();
let citySearched = document.querySelector("#search-input").value;

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=d79ebdf8167debecd6d65d2247f86bad`)
.then(response => response.json())
.then(citiesFound =>{
  let firstCity = citiesFound[0];
  console.log(firstCity.lat);
  console.log(firstCity.lon);

  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=d79ebdf8167debecd6d65d2247f86bad&units=metric`)
})

.then(response => response.json())
.then(data => {
  console.log(data)
  //values which need to be used in main weather div
  cityName = data.city.name;
  console.log(data.city.name)
  //needs to be current date
  cityDate = data.city.timezone;
  console.log(data.city.timezone)
  cityTemp = data.list[0].main.temp
  console.log(data.list[0].main.temp)
  console.log(data.list[0].wind.speed)
  console.log(data.list[0].main.humidity)
    
})


})









/** The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed*/