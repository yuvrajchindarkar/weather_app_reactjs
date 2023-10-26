import React, { useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { MdArrowUpward, MdOpacity } from 'react-icons/md';
import { FaThermometerHalf, FaMapMarkerAlt, FaTachometerAlt } from 'react-icons/fa';
import axios from 'axios';
import './css/weather.css';

function WeatherWebApp() {
  const [data, setData] = useState({
    temperature: 10,
    name: 'Mumbai',
    description: 'clear',
    icon: 'https://openweathermap.org/img/w/50n.png',
    temp_min: 10,
    temp_max: 30,
    humidity: 37,
    pressure: 1013,
    feels_like: 30.49,
  });
  const [name, setName] = useState('');

  const handleClick = () => {
    if (name !== '') {
      console.log(data);
      const apiKey = '7aa9433e417f0d190d516044346a2b90';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then((res) => {
          setData({
            temperature: res.data.main.temp,
            name: res.data.name,
            description: res.data.weather[0].description,
            icon: `https://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
            temp_min: res.data.main.temp_min,
            temp_max: res.data.main.temp_max,
            humidity: res.data.main.humidity,
            pressure: res.data.main.pressure,
            feels_like: res.data.main.feels_like,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <div className="main">
        <div className="searchbar">
          <input
            type="text"
            className="search"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
                <button className="button" onClick={handleClick}>Search</button>
        </div>
        <div className="inner-container">
          <div className="box1">
            <div className="info1">
              <div className="description">
                <h1 className="city">
                  {data.name}
                  <FaMapMarkerAlt className="location" />
                </h1>
                <p className="date">{new Date().toDateString()}</p>
                <img src={data.icon} alt="Weather Icon" className="img" />
                <p className="descrip">{data.description}</p>
              </div>
            </div>
          </div>
          <div className="box2">
            <div className="temperature">
              <p className="temp">{data.temperature}° C</p>
            </div>
          </div>
        </div>
        <span className="line"></span>

        <div className="extra-info">
          <div className="extra1">
            <small>
              <AiOutlineArrowDown className="icon-extra" />
              Temp_Min
            </small>
            <h3>{data.temp_min}°C</h3>
            <small>
              <MdArrowUpward className="icon-extra" />
              Temp_Max
            </small>
            <h3>{data.temp_max}°C</h3>
          </div>
          <div className="extra1">
            <small>
              <FaTachometerAlt className="icon-extra" />
              Pressure
            </small>
            <h3>{data.pressure} hPa</h3>
          </div>
          <div className="extra1">
            <small>
              <MdOpacity className="icon-extra" />
              Humidity
            </small>
            <h3>{data.humidity}%</h3>
            <p>The dew point is 25° right now</p>
          </div>
          <div className="extra1">
            <small>
              <FaThermometerHalf className="icon-extra" />
              Feels_Like
            </small>
            <h3>{data.feels_like}°C</h3>
            <p>Humidity is making it feel warmer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWebApp;
