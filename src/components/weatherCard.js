import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [forecast, setForecast] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);


  const API_KEY = "3e954c0127513176e8470a6c4308f6b1";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("Unable to fetch weather data. Please try again.");
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        setForecast(response.data.list.slice(0, 5)); // Next 5 data points
      } catch (err) {
        console.error("Error fetching forecast data:", err);
      }
    };



    if (city) {
      fetchForecast();
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(query);
    setQuery("");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </form>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : weather ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800">{weather.name}</h1>
          <p className="text-gray-600 mt-2">{weather.weather[0].description}</p>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-4xl font-semibold text-gray-800">
                {weather.main.temp}°C
              </p>
              <p className="text-sm text-gray-500">
                Feels like {weather.main.feels_like}°C
              </p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-16 h-16"
            />
          </div>
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {forecast && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800">5-Day Forecast</h2>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {forecast.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-100 rounded-md">
                <p className="font-semibold">
                  {new Date(item.dt_txt).toLocaleDateString()}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="mx-auto w-12 h-12"
                />
                <p>{item.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
