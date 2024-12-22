import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [city, setCity] = useState("London");
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "3e954c0127513176e8470a6c4308f6b1";

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    };

    const fetchForecast = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecast(response.data.list.slice(0, 5));
      setHourlyForecast(
        response.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        )
      );
    };

    fetchWeather();
    fetchForecast();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(query);
    setQuery("");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen w-full ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-sky-400 via-blue-400 to-blue-500 text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-[1200px]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left mb-4 md:mb-0">
            Weather Forecast
          </h1>
          <div className="flex flex-col md:flex-row gap-4 md:w-[60%]">
            <form onSubmit={handleSearch} className="flex-1 flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a city..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder:text-gray-200"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                Search
              </button>
            </form>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Weather */}
          {weather && (
            <div className="md:col-span-1 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{weather.name}</h2>
              <p className="text-lg capitalize text-center mb-6">{weather.weather[0].description}</p>
              <div className="flex items-center justify-center mb-6">
                <p className="text-5xl md:text-6xl font-bold">{Math.round(weather.main.temp)}°C</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  className="w-20 h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-sm mb-1">Humidity</p>
                  <p className="text-xl font-bold">{weather.main.humidity}%</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-sm mb-1">Wind Speed</p>
                  <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          )}

          {/* 5-Day Forecast */}
          {forecast && (
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-bold mb-4">5-Day Forecast</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-white/20 transition-colors"
                  >
                    <p className="text-sm mb-2">{new Date(day.dt_txt).toLocaleDateString()}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="forecast-icon"
                      className="w-16 h-16 mx-auto"
                    />
                    <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hourly Forecast */}
        {hourlyForecast && (
          <div className="mt-6">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Today's Hourly Forecast
            </h3>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center shrink-0 w-[140px] hover:bg-white/20 transition-colors"
                >
                  <p className="text-sm mb-2">
                    {new Date(hour.dt_txt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt="hourly-icon"
                    className="w-16 h-16 mx-auto"
                  />
                  <p className="text-xl font-bold">{Math.round(hour.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
