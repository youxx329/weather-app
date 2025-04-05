import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, getCurrentLocation, selectedCity }) => {
  console.log('cities?', cities);
  
  return (
    <div className='btn-wrap'>
      <Button variant="secondary" className={`current-btn ${selectedCity === "current" ? "selected-btn" : ""}`} onClick={getCurrentLocation}>
        Current Location
      </Button>

      {cities.map((item) => (
        <Button 
          key={item} 
          variant="secondary" 
          className={selectedCity === item ? "selected-btn" : ""}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  )
}

export default WeatherButton