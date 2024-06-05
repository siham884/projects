document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '87bc85616ed5b1d7966d5691c9e97d1e'; // Your actual OpenWeatherMap API key
    const getWeatherButton = document.getElementById('getWeatherButton');
    const cityInput = document.getElementById('cityInput');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const container = document.querySelector('.container');

    // Function to fetch weather data
    const fetchWeatherData = (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        console.log('Fetching weather data from:', url);

        fetch(url)
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                if (data.cod === 200) {
                    cityName.textContent = data.name;

                    // Determine thermometer color based on temperature
                    let tempColor;
                    if (data.main.temp < 0) {
                        tempColor = '#00f'; // Blue for cold
                    } else if (data.main.temp >= 0 && data.main.temp <= 15) {
                        tempColor = '#0ff'; // Cyan for cool
                    } else if (data.main.temp > 15 && data.main.temp <= 30) {
                        tempColor = '#0f0'; // Green for mild
                    } else {
                        tempColor = '#f00'; // Red for hot
                    }

                    temperature.innerHTML = `${data.main.temp} °C <i class="fas fa-thermometer-half" style="color: ${tempColor};"></i>`;

                    // Set button background color based on temperature color
                    getWeatherButton.style.backgroundColor = tempColor;

                    // Define weather icons and animation classes based on weather condition
                    let weatherIconClass;
                    let animationClass;
                    if (data.weather[0].main === 'Clear') {
                        weatherIconClass = 'fas fa-sun';
                        animationClass = 'clear-sky';
                    } else if (data.weather[0].main === 'Clouds') {
                        weatherIconClass = 'fas fa-cloud';
                        animationClass = 'cloudy';
                    } else if (data.weather[0].main === 'Rain') {
                        weatherIconClass = 'fas fa-cloud-showers-heavy';
                        animationClass = 'rainy';
                    } // Add more conditions as needed

                    // Remove any existing animation classes
                    container.classList.remove('clear-sky', 'cloudy', 'rainy');

                    // Add the new animation class
                    container.classList.add(animationClass);

                    // Display weather icon and description
                    weatherDisplay.innerHTML = `
                        <p><i class="${weatherIconClass}" style="color: white;"></i> Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    `;
                } else {
                    weatherDisplay.innerHTML = `<p>City not found. Please try again.</p>`;
                    cityName.textContent = '';
                    temperature.textContent = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                weatherDisplay.innerHTML = `<p>There was an error fetching the weather data. Please try again later.</p>`;
                cityName.textContent = '';
                temperature.textContent = '';
            });
    };

    // Event listener for Get Weather button
    getWeatherButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            fetchWeatherData(city);
        } else {
            weatherDisplay.innerHTML = `<p>Please enter a city name.</p>`;
            cityName.textContent = '';
            temperature.textContent = '';
        }
    });

    // Fetch weather data for the default city on page load
    fetchWeatherData("London"); // Change this to your desired default city
});
