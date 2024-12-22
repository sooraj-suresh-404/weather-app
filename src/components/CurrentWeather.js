import React from 'react';

const CurrentWeather = ({ weather, theme }) => (
  <div className={`${theme.accent} ${theme.pattern} rounded-3xl p-6 lg:p-8 h-full backdrop-blur-sm`}>
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 lg:mb-8">
      <div className="text-center sm:text-left mb-4 sm:mb-0">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold">{Math.round(weather.main.temp)}°</h2>
        <p className="text-lg sm:text-xl capitalize mt-2">{weather.weather[0].description}</p>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="weather"
        className="w-24 h-24 sm:w-32 sm:h-32"
      />
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <WeatherStat label="Feels Like" value={`${Math.round(weather.main.feels_like)}°`} />
      <WeatherStat label="Humidity" value={`${weather.main.humidity}%`} />
      <WeatherStat label="Wind" value={`${Math.round(weather.wind.speed)} m/s`} />
      <WeatherStat label="Pressure" value={`${weather.main.pressure} hPa`} />
    </div>
  </div>
);

const WeatherStat = ({ label, value }) => (
  <div className="bg-white/10 rounded-2xl p-3 sm:p-4 text-center">
    <p className="text-xs sm:text-sm opacity-75">{label}</p>
    <p className="text-base sm:text-lg font-semibold mt-1">{value}</p>
  </div>
);

export default CurrentWeather; 