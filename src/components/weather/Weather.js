import "./Weather.css";

const Weather = ({ data }) => {
    return (
        <div className="weather">
            <p className="city">{data.city}</p>
            <div className="top">
                <div>
                    <span className="temperature">{data.main.temp}°C</span>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`}/>
            </div>
            <hr />
            <div className="bottom">
                <div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels Like</span>
                        <span className="parameter-value">{data.main.temp}°C</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{data.wind.speed} m/s</span>
                    </div>
                </div>
                <div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{data.main.pressure} hPa</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Weather;