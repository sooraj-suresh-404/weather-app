import React from 'react';

const ForecastCard = ({ forecast, theme }) => {
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getUniqueForecasts = () => {
    const uniqueDays = {};
    forecast?.forEach(item => {
      const day = new Date(item.dt_txt).toLocaleDateString();
      if (!uniqueDays[day] || new Date(item.dt_txt).getHours() === 12) {
        uniqueDays[day] = item;
      }
    });
    return Object.values(uniqueDays).slice(0, 5);
  };

  const uniqueForecasts = getUniqueForecasts();

  return (
    <div className={`${theme.accent} ${theme.pattern} backdrop-blur-md rounded-3xl p-6`}>
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="divide-y divide-white/10">
        {uniqueForecasts.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0 
              hover:bg-white/10 rounded-xl transition-all duration-300 px-4 -mx-4
              cursor-pointer transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="forecast"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <p className="font-medium text-lg">
                  {index === 0 ? 'Today' : getDayName(day.dt_txt)}
                </p>
                <p className="text-sm text-white/70 capitalize">
                  {day.weather[0].description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  {Math.round(day.main.temp_max)}°
                </span>
                <span className="text-white/70">
                  {Math.round(day.main.temp_min)}°
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70 mt-1">
                <span className="flex items-center gap-1">
                  💧 {day.main.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  💨 {Math.round(day.wind.speed)}m/s
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard; 