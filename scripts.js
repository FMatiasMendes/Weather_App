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
	
	//erase
	console.log(data);

	const {
		name: city,
		main:{temp, humidity},
		sys: {sunrise, sunset},
		timezone: timezone,
		weather: [{description, id}]
	} = data;

	card.textContent = "";
	card.style.display = "flex";

	const cityDisplay = document.createElement("h1");
	const tempDisplay = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const descDisplay = document.createElement("p");
	const weatherEmoji = document.createElement("p");
	//test
	const localTime = document.createElement("p");

	cityDisplay.textContent = city;
	tempDisplay.textContent = `${temp}° C`;
	humidityDisplay.textContent = `Humidity: ${humidity}%`;
	descDisplay.textContent = description;
	weatherEmoji.textContent = getWeatherEmoji(id);
	//test
	localTime.textContent = getLocalTime(timezone);

	cityDisplay.classList.add("cityDisplay");
	tempDisplay.classList.add("tempDisplay");
	humidityDisplay.classList.add("humidityDisplay");
	descDisplay.classList.add("descDisplay");
	weatherEmoji.classList.add("weatherEmoji");

	card.appendChild(cityDisplay);
	card.appendChild(tempDisplay);
	card.appendChild(humidityDisplay);
	card.appendChild(descDisplay);
	card.appendChild(weatherEmoji);
	//test
	card.appendChild(localTime);
}

function getWeatherEmoji(weatherId){

	switch(true){
		case (weatherId >= 200 && weatherId < 300):
			return "⛈️";
		case (weatherId >= 300 && weatherId < 400):
			return "🌧️";
		case (weatherId >= 500 && weatherId < 600):
			return "🌦️";
		case (weatherId >= 600 && weatherId < 700):
			return "❄️";
		case (weatherId >= 700 && weatherId < 800):
			return "🌫️";
		case (weatherId === 800):
			return "☀️";
		case (weatherId > 800):
			return "☁️";
		default:
			return "❓";
	}
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

	return `Local time: ${localTime}H`;
}