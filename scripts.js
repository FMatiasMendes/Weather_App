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
			console.error(error);
			displayError(error);
		}
	}
	else{
		displayError("Please enter a city");
	}
});

async function getWeatherData(city){

}

function displayWeatherInfo(data){

}

function getWeatherEmoji(weatherId){

}

function displayError(message){
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("errorDisplay");

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}