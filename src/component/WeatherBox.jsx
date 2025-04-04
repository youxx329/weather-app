import React from 'react'

const WeatherBox = ({weather}) => {
  if (!weather || !weather.main) return null;

  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>{weather.main.temp}°C / {(weather.main.temp * 9/5 + 32).toFixed(1)}°F</h2>
      <h3>{weather.weather && weather.weather.length > 0 ? weather.weather[0].description : '날씨 정보 없음'}</h3>
    </div>
  )
}

export default WeatherBox