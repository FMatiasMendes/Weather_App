//constants
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "89fe191d4ad03c4d24b3fbfd05ea997f";

//functions
weatherForm.addEventListener("submit", event => {
	console.log("test1");
	event.preventDefault();

	const city = cityInput.value;

	if(city){

	}
	else{
		displayError("Please enter a city");
		console.log("test2");
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