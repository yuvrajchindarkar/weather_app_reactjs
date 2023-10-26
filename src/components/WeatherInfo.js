import React, { useState } from 'react';
import "./css/style.css";
import axios from 'axios';


function WeatherInfo() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'Mumbai',
        description: 'clear' ,
        icon: 'https://openweathermap.org/img/w/50n.png' 
    })
    const [name, setName] = useState('');
   

    const handleClick = () =>{
        if(name !== ""){
          console.log(data)
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7aa9433e417f0d190d516044346a2b90&units=metric`;
            axios.get(apiUrl)
            .then(res =>{
                setData({...data, 
                  celcius: res.data.main.temp, 
                  name:res.data.name,  
                  description: res.data.weather[0].description,
                  icon: `https://openweathermap.org/img/w/${res.data.weather[0].icon}.png` 
                })
            })
            .catch(err => console.log(err))

        }
    }

    return (
      <div className="grid-container">
      <div className="container">
        <h1 className='title'>Weather App</h1>
        <div className="searchbar">
          <input type="text" className="search" placeholder="enter city name" onChange={(e) => setName(e.target.value)}/>
          <button className="button" onClick={handleClick}>Search</button>
        </div>
        <div className='info'>
            <h1 className='city'>{data.name}</h1>
            <img src={data.icon} alt="Weather Icon" className='img' />

            <p className='temp'>{data.celcius} °C</p>
            <p className='description'>{data.description}</p>
        </div>
      </div>
      </div>
    )
  }


export default WeatherInfo