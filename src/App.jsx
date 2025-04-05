import { useEffect, useState } from 'react'
import './App.css'
import WeatherBox from './component/WeatherBox.jsx';
import WeatherButton from './component/WeatherButton.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from "react-spinners";


// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨 화씨 날씨 상태
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭 할때마다 도시별 날씨가 나온다
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState("current");

  const cities = ['Jeju', 'Bali', 'Venice']
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(true); 
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      getWeatherByCurrentLocation(lat, lon);

      setCity("current");
    });

  }
  const apiKey = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;
  
  const getWeatherByCurrentLocation = async(lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    setLoading(true)
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 불러오기 실패:", error);
    } finally {
      setLoading(false); // 로딩 끝
    }
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true)
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
    setLoading(false);
    // setSelectedCity("current");
  }

  // 첫 마운트 때 실행 (최초 렌더링 시)
useEffect(() => {
  getCurrentLocation(); // 현재 위치 날씨 불러오기
  setCity("current");   // 상태도 같이 설정 (버튼 UI 일관성 위해)
}, []);

  useEffect(() => {
    if (!city) return; // city가 비어있으면 아무것도 하지 않음

    if(city==="current") {
      getCurrentLocation()
      setSelectedCity("current");
    } else {
      getWeatherByCity()
      setSelectedCity(city);  
    }
  }, [city])


  return (
    <>
    <div>
      {loading ? (<div style={{ display: 'flex', justifyContent: 'center', marginTop: -30 }}>
      <ClipLoader color="#36d7b7" size={100} />
      </div>) : (
        <>
          <WeatherBox weather={weather}></WeatherBox>
          <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation} selectedCity={selectedCity}></WeatherButton>
        </>
      )}
      </div>
    </>
  )
}

export default App
