import React from 'react';

const ForecastCard = ({ forecast, theme }) => (
  <div className={`${theme.accent} ${theme.pattern} rounded-3xl p-6 lg:p-8 h-full backdrop-blur-sm`}>
    <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
    <div className="space-y-3 sm:space-y-4">
      {forecast?.map((day, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between bg-white/10 rounded-xl p-3 sm:p-4"
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="forecast"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <p className="font-medium text-sm sm:text-base">
                {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <p className="text-xs sm:text-sm opacity-75">{day.weather[0].description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl sm:text-2xl font-bold">{Math.round(day.main.temp)}°</p>
            <p className="text-xs sm:text-sm opacity-75">
              H:{Math.round(day.main.temp_max)}° L:{Math.round(day.main.temp_min)}°
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ForecastCard; 