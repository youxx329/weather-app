import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div className='btn-wrap'>
      <Button variant="secondary" className='current-btn'>Current Location</Button>
      <Button variant="secondary">Jeju</Button>
      <Button variant="secondary">Bali</Button>
      <Button variant="secondary">Venice</Button>
    </div>
  )
}

export default WeatherButton