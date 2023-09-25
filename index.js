const APIKEY = ''

const  weatherDataEl = document.getElementById('weather-data')
const cityInputEl = document.getElementById('city-input')
const formEl = document.querySelector('form')

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue) { 
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKEY}&units=imperial`)
        if (!response.ok) { 
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        
        const temp = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°F`, 
            `Humidity: ${data.main.humidity}`,
            `Wind Speed: ${data.wind.speed}`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        
        weatherDataEl.querySelector(".temperature").textContent = `${temp}°F`;
        weatherDataEl.querySelector(".description").textContent = `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map(detail => { 
            return `<div>${detail}</div>`;
        });
    } catch (error) {
        console.log(error)
    }
}