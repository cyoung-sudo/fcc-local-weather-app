import './WeatherApp.css';
// React
import React from 'react';
// Components
import Permission from './permission/Permission';
import Weather from './weather/Weather';
import axios from 'axios';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      fahrenheit: false,
      permission: false
    };
    this.accessLocation = this.accessLocation.bind(this);
    this.toggleTemp = this.toggleTemp.bind(this);
    this.setBGColor = this.setBGColor.bind(this);
  }

  componentDidMount() {
    document.getElementById("app").style.backgroundColor = "white";
  }

  // Access location and weather data
  accessLocation() {
    // Check if geolocation is available
    if(navigator.geolocation) {
      console.log("Geolocation Available");
      // Get user location
      navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude } = position.coords;
        // Request for weather data
        axios
          .get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`, {timeout: 10000})
          .then(res => {
            // Extract revelant data
            let weather = {
              name: res.data.name,
              country: res.data.sys.country,
              main: res.data.weather[0].main,
              desc: res.data.weather[0].description,
              icon: res.data.weather[0].icon,
              temp: res.data.main.temp,
            }
            // Update state
            this.setState({
              weather: weather,
              permission: true
            });
            // Set dynamic background color
            this.setBGColor(res.data.main.temp);
          })
          .catch(err => console.log(err));
      }, err => console.log(err), {timeout: 10000});
    } else {
      console.log("Geolocation Not Available");
    }
  }

  // Toggle temp scale
  toggleTemp() {
    let weather = {...this.state.weather};
    let temp = this.state.weather.temp;
    // C -> F
    if(this.state.fahrenheit) {
      weather.temp = ((temp - 32) * (5/9)).toFixed(2);
    // F -> C
    } else {
      weather.temp = ((temp * 9/5) + 32).toFixed(2);
    }
    // Update state
    this.setState(prevState => ({
      weather: weather,
      fahrenheit: !prevState.fahrenheit
    }));
  }

  // Set background color according to temp
  setBGColor(temp) {
    let palette = [
      [5, "deepskyblue"],
      [13, "lightskyblue"],
      [20, "lightyellow"],
      [27, "orange"],
      [35, "orangered"]
    ];
    let tempColor;
    for(let i=0; i<palette.length-1; i++) {
      let low = palette[i];
      let high = palette[i+1];
      let average = (low[0] + high[0])/2;
      if(temp < low[0]) {
        tempColor = low[1];
        break;
      } else if(temp >= low[0] && temp < average) {
        tempColor = low[1];
        break;
      } else if(temp >= average && temp < high[0]) {
        tempColor = high[1];
        break;
      }
    }
    document.getElementById("app").style.backgroundColor=tempColor;
  }
  
  
  render() {
    if(this.state.permission) {
      return <Weather
        weather={this.state.weather}
        fahrenheit={this.state.fahrenheit} 
        toggleTemp={this.toggleTemp}/>;
    } else {
      return <Permission 
        accessLocation={this.accessLocation}/>;
    }
  }
}

export default WeatherApp;