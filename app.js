// Import API key from external file
import {WeatherApiKey} from "./data.js"

// DOM Element Selections
const city = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const temperature_f = document.querySelector("#temperature-f");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const wheatherIcon = document.querySelector("#weather-icon");
const countryName = document.querySelector(".country-name");
 const forcast_location = document.querySelector(".forcast-location h2");
 const forecast_grid_part_1 = document.querySelector(".forecast-grid-part-1");
  const forcast_update_time = document.querySelector("#forcast-update-time");
 
// Variable to store the city name from user input
let city_Name = "";

// Event listener for input field to capture city name as user types
city.addEventListener('input', (e) => {
    city_Name = e.target.value;
})

// Event listener for search button to trigger weather data fetch
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getWheatherInformation();
})

// Function to fetch and display weather information
function getWheatherInformation() {
    // API call to weatherapi.com with city name
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WeatherApiKey}&q=${city_Name}&days=2&aqi=yes&alerts=no`)
        .then((res) => {
            // Check if response is valid
           
            if (!res.ok) {
                if (city_Name == " ") {
                    alert(" Please Write a city name");
                    return;

                }else{
                    alert(" Please Write correct city name");
                    return;
                }
            }
            return res.json();

        })
        .then((data) => {
            if (data) {
                console.log(data);
                
                // Update DOM elements with weather data
                cityName.innerHTML = data.location.country + " ," + data.location.name;
                forcast_location.innerHTML = data.location.name;
                temperature.innerHTML = "Celsius :" + data.current.temp_c + "°C";
                temperature_f.innerHTML = "F :" + data.current.temp_f + "°F";
                wind.innerHTML = "Wind :" + data.current.wind_kph + "Km/h ";
                humidity.innerHTML = "Humidity : " + data.current.humidity + " %";
                sunrise.innerHTML = "Sunrise : " + data.forecast.forecastday[0].astro.sunrise;
                sunset.innerHTML = "Sunset : " + data.forecast.forecastday[0].astro.sunset;
                wheatherIcon.src = data.current.condition.icon;
                forcast_update_time.innerHTML =   data.current.last_updated;
                  let cullter ="";
                let hours = data.forecast.forecastday[0].hour.forEach((hours) => {
                     
                     cullter += `
                    <div class="hourly-card">
                    <div class="forcast-time"   >${hours.time}</div>
                    <div class="forcast-temperature"> ${hours.temp_c}°C</div>
                    <div class="forcast-weather-icon"><img src="${hours.condition.icon}" alt="${hours.condition.text}" loding="lazy" style= "font-size:1rem"/></div>
                    <div class="forcast-details">
                        <div>
                            <span>Precipitation</span>
                            <span> ${hours.precip_mm}%</span>
                        </div>
                         
                        <div class="progress-bar">
                        
                            <div class="progress" style="width: ${ hours.chance_of_rain/100*100}%  ;height: 2px; background-color: #000000;"></div>
                        </div>
                        <div>
                            <span class="forcast-wind">Wind</span>




                            <span class="forcast-wind-speed"> ${hours.wind_kph} km/h ←</span>
                        </div>
                        <div>
                            <span class="forcast-humidity">Humidity</span>
                            <span>${hours.humidity}%</span>
                        </div>
                    </div>
                </div>
                     `;
                    
                       
                              
                 });
                 forecast_grid_part_1.innerHTML = cullter;
 
            }
        })
        .catch((error) => {
             alert("Please check your internet" );
             
        }) 
        
}



