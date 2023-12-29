import './App.css';
import Search from './components/search/Search';
import Weather from './components/weather/Weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, FORECAST_API_URL, WEATHER_API_KEY } from './components/api';
import { useState } from 'react';
import Logo from './logo.png';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnsearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${FORECAST_API_URL
      }/?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      setWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <img src={Logo} alt="logo" />
      <Search onSearchChange={handleOnsearchChange} />
      {weather && <Weather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
