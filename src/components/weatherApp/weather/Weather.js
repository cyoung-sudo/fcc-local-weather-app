import './Weather.css';

export default function Weather(props) {
  return (
    <div id="weather">
      <div className="title">{props.weather.name} ({props.weather.country})</div>
      <div className="content">
        <div>{props.weather.main} ({props.weather.desc})</div>
        <img id="weather-icon" src={props.weather.icon} alt="Weather icon"/>
        <div>{props.weather.temp} {props.fahrenheit ? "°F" : "°C"}</div>
        <button onClick={props.toggleTemp}>{props.fahrenheit ? "Celsius" : "Fahrenheit"}</button>
      </div>
    </div>
  )
}