const apiUrl = 'https://api.open-meteo.com/v1/forecast';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchCoordinates(location);
    }
});

// Function to fetch latitude and longitude for the given location
function fetchCoordinates(location) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                fetchWeather(lat, lon);
            } else {
                console.error('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching coordinates:', error);
        });
}

// Function to fetch weather data using Open-Meteo API
function fetchWeather(lat, lon) {
    const url = `${apiUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.current_weather;
            locationElement.textContent = `Lat: ${lat}, Lon: ${lon}`;
            temperatureElement.textContent = `${Math.round(weather.temperature)}°C`;
            descriptionElement.textContent = `Wind Speed: ${weather.windspeed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
