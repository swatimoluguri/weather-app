import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./forecast.css";

const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const Forecast = ({ data }) => {
    const dayInWeek = new Date().getDay();
    const forecastDays = WeekDays.slice(dayInWeek, WeekDays.length).concat(WeekDays.slice(0, dayInWeek));
    let i = 0;
    return (
        <>
            <h2>Next 5 Days</h2>
            {data && data.weatherData && Object.entries(data.weatherData).map(([date, item]) => (
                <Accordion className="accordion" key={date}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand-more-icon" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <div><img alt="forecast" className="forecast-icon" src={`icons/${item.icon}.png`} /></div>
                        <div className="weekday">
                            <div><p className='weekday-date'>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })}</p>
                                <p className='weekday-label'>{forecastDays[i++]}</p></div>

                            <div className='weekday-description'>{item.description}</div>
                            <div className='weekday-min-max-temp'>{item.max}°C / {item.min}°C </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="bottom">
                            <div>
                            <div className="parameter-row">
                                    <span className="parameter-label">Forecast</span>
                                    <span className="parameter-value">{item.description}</span>
                                </div>
                                <div className="parameter-row">
                                    <span className="parameter-label">Wind</span>
                                    <span className="parameter-value">{item.wind} m/s</span>
                                </div>
                            </div>
                            <div>
                                <div className="parameter-row">
                                    <span className="parameter-label">Humidity</span>
                                    <span className="parameter-value">{item.humidity}%</span>
                                </div>
                                <div className="parameter-row">
                                    <span className="parameter-label">Pressure</span>
                                    <span className="parameter-value">{item.pressure} hPa</span>
                                </div>
                            </div>
                            <div>
                                <div className="parameter-row">
                                    <span className="parameter-label">Min Temperature</span>
                                    <span className="parameter-value">{Math.round(item.min)}°C</span>
                                </div>
                                <div className="parameter-row">
                                    <span className="parameter-label">Max temperature</span>
                                    <span className="parameter-value">{Math.round(item.max)}°C</span>
                                </div>

                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
}

export default Forecast;