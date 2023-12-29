import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./forecast.css";

const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
    const dayInWeek = new Date().getDay();
    const forecastDays = WeekDays.slice(dayInWeek, WeekDays.length).concat(WeekDays.slice(0, dayInWeek));
    return (
        <>
        <h2>Next 7 Days</h2>
            {data.list.splice(0, 7).map((item, idx) => (
                <Accordion className="accordion" key={idx}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand-more-icon" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    ><div><img alt="forecast" className="forecast-icon" src={`icons/${item.weather[0].icon}.png`} /></div>
                        <Typography className="weekday">
                            <div className='weekday-label'>{forecastDays[idx]}</div>
                            <div className='weekday-description'>{item.weather[0].description}</div>
                            <div className='weekday-min-max-temp'>{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C </div>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div className="bottom">
                                <div>
                                    <div className="parameter-row">
                                        <span className="parameter-label">Feels Like</span>
                                        <span className="parameter-value">{Math.round(item.main.temp)}°C</span>
                                    </div>
                                    <div className="parameter-row">
                                        <span className="parameter-label">Wind</span>
                                        <span className="parameter-value">{item.wind.speed} m/s</span>
                                    </div>
                                </div>
                                <div>
                                <div className="parameter-row">
                                        <span className="parameter-label">Humidity</span>
                                        <span className="parameter-value">{item.main.humidity}%</span>
                                    </div>
                                    <div className="parameter-row">
                                        <span className="parameter-label">Pressure</span>
                                        <span className="parameter-value">{item.main.pressure} hPa</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="parameter-row">
                                        <span className="parameter-label">Min Temperature</span>
                                        <span className="parameter-value">{Math.round(item.main.temp_min)}°C</span>
                                    </div>
                                    <div className="parameter-row">
                                        <span className="parameter-label">Max temperature</span>
                                        <span className="parameter-value">{Math.round(item.main.temp_max)}°C</span>
                                    </div>

                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>))}
        </>
    );
}

export default Forecast;