//constants
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "89fe191d4ad03c4d24b3fbfd05ea997f";

//functions
weatherForm.addEventListener("submit", async event => {

	event.preventDefault();

	const city = cityInput.value;

	if(city){
		try{
			const weatherData = await getWeatherData(city);
			displayWeatherInfo(weatherData);
		}
		catch(error){
			const errorMessage = error.message.replace('Error', "");
            displayError(errorMessage);
		}
	}
	else{
		displayError("Please enter a city");
	}
});

async function getWeatherData(city){

	//API call
	const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	const response = await fetch(apiURL);

	console.log(response);

	if(!response.ok){
		throw new Error(`City not found: ${city}`);
	}

	return await response.json();
	
}

function displayWeatherInfo(data){
	
	console.log(data);

	const {
		name: city,
		main:{temp, humidity},
		sys: {sunrise, sunset},
		timezone: timezone,
		weather: [{description, icon}]
	} = data;

	card.textContent = "";
	card.style.display = "flex";

	const cityDisplay = document.createElement("h1");
	const tempDisplay = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const descDisplay = document.createElement("p");
	const weatherEmoji = document.createElement("p");
	const localTimeDisplay = document.createElement("p");
	const localTime = getLocalTime(timezone);

	cityDisplay.textContent = city;
	tempDisplay.textContent = `${temp}° C`;
	humidityDisplay.textContent = `Humidity: ${humidity}%`;
	descDisplay.textContent = description;
	weatherEmoji.innerHTML = getWeatherEmoji(icon);
	localTimeDisplay.textContent = `Local time: ${localTime}H`;

	cityDisplay.classList.add("cityDisplay");
	tempDisplay.classList.add("tempDisplay");
	humidityDisplay.classList.add("humidityDisplay");
	descDisplay.classList.add("descDisplay");
	weatherEmoji.classList.add("weatherEmoji");
	localTimeDisplay.classList.add("localTimeDisplay");

	card.appendChild(cityDisplay);
	card.appendChild(tempDisplay);
	card.appendChild(humidityDisplay);
	card.appendChild(descDisplay);
	card.appendChild(weatherEmoji);
	card.appendChild(localTimeDisplay);

	const isItDay = dayOrNight (sunrise, sunset, localTime, timezone);
	const night = document.querySelector(".card");

	if (!isItDay){
		night.id = "nightBackground";
	}
	else{
		night.removeAttribute('id')
	}

}

function getWeatherEmoji(icon){
	return `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather_icon">`;
}

function displayError(message){
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("errorDisplay");

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}

function getLocalTime(timezone){

	const now = new Date();	
	const offsetMilliseconds = timezone * 1000;

	now.setTime(now.getTime() + offsetMilliseconds);

	const localTime = new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
    minute: '2-digit',
    hour12: false
	}).format(now);

	return localTime;	
}

function dayOrNight (sunriseTime, sunsetTime, localTime, timezone){

	sunriseTime = new Date(sunriseTime * 1000);
  sunsetTime = new Date(sunsetTime * 1000);

	const sunTime = sunriseTime.getHours()*60 + sunriseTime.getMinutes() + timezone/60;
	const nightTime = sunsetTime.getHours()*60 + sunsetTime.getMinutes() + timezone/60;

	const localTimeParts = localTime.split(":");
  const realTime = parseInt(localTimeParts[0]) * 60 + parseInt(localTimeParts[1]);

	if (realTime >= sunTime && realTime < nightTime) {
		return true;
	} else {
		return false;
	}
}

