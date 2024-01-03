import './App.css';
import Search from './components/Search';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import { WEATHER_API_URL, FORECAST_API_URL, WEATHER_API_KEY } from './components/api';
import { useState, useEffect } from 'react';
import Logo from './logo.png';


function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnsearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${FORECAST_API_URL}/?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setWeather({ city: searchData.label, ...weatherResponse });
        let forecastDates = JSON.parse(JSON.stringify(forecastResponse));
        console.log(forecastDates);
        const extractArrayByDate = (property) => {
          return Object.values(forecastDates.list).reduce((result, details) => {
            const date = details.dt_txt.split(' ')[0];
            if (!result[date]) {
              result[date] = [];
            }
            if (property === 'main.temp')
              result[date].push(details.main.temp);
            if (property === 'main.humidity')
              result[date].push(details.main.humidity);
            if (property === 'main.pressure')
              result[date].push(details.main.pressure);
            if (property === 'wind.speed')
              result[date].push(details.wind.speed);
              if (property === 'weather.description')
              result[date].push(details.weather[0].description);
              if (property === 'weather.icon')
              result[date].push(details.weather[0].icon);
            return result;
          }, {});
        };
        const temperatureArrayByDate = extractArrayByDate('main.temp');
        const humidityArrayByDate = extractArrayByDate('main.humidity');
        const pressureArrayByDate = extractArrayByDate('main.pressure');
        const windArrayByDate = extractArrayByDate('wind.speed');
        const weatherDescArrayByDate = extractArrayByDate('weather.description');
        const weatherIconArrayByDate = extractArrayByDate('weather.icon');
        function calculateAverage(values) {
          if (values.length === 0) {
            return 0;
          }
          const sum = values.reduce((acc, val) => acc + val, 0);
          const average = sum / values.length;
          return average;
        }
        function getMaxOccurrencesDateWise(data) {
          const result = {};
          for (const [date, weatherArray] of Object.entries(data)) {
            const occurrencesMap = {};
            for (const weatherType of weatherArray) {
              occurrencesMap[weatherType] = (occurrencesMap[weatherType] || 0) + 1;
            }
            let maxWeatherType;
            let maxCount = 0;
            for (const [weatherType, count] of Object.entries(occurrencesMap)) {
              if (count > maxCount) {
                maxWeatherType = weatherType;
                maxCount = count;
              }
            }
            result[date] =maxWeatherType;
          }
          return result;
        }
        const weatherDescByDate=getMaxOccurrencesDateWise(weatherDescArrayByDate);
        const weatherIconByDate=getMaxOccurrencesDateWise(weatherIconArrayByDate);
        let weatherData = {};
        Object.keys(temperatureArrayByDate).forEach(date => {
          weatherData[date] = {
            min: Math.round(Math.min(...temperatureArrayByDate[date])),
            max: Math.round(Math.max(...temperatureArrayByDate[date])),
            wind: Math.round(calculateAverage(windArrayByDate[date])),
            humidity: Math.round(calculateAverage(humidityArrayByDate[date])),
            pressure: Math.round(calculateAverage(pressureArrayByDate[date])),
            description:weatherDescByDate[date],
            icon:weatherIconByDate[date]
          };
        });
        let today = new Date();
        today = today.toISOString().split('T')[0];
        delete weatherData[today];
        setForecast({ city: searchData.label, weatherData });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log(forecast);
  }, [forecast]);

  return (
    <div className="container">
      <img className='logo' src={Logo} alt="logo" />
      <p>Real-time weather updates and a 5-day forecast for any city in India.</p>
      <Search onSearchChange={handleOnsearchChange} />
      {weather && <Weather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
