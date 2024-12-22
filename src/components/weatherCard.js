import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from './Header';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastCard from './ForecastCard';
import Welcome from './Welcome';
import { getWeatherTheme } from '../utils/weatherThemes';
import Modal from './Modal';
import PropTypes from 'prop-types';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "3e954c0127513176e8470a6c4308f6b1";

  const processHourlyForecast = (data) => {
    // Get current hour
    const currentHour = new Date().getHours();
    
    // Filter and process next 24 hours of forecast
    return data.list
      .filter((item, index) => index < 8) // Get first 8 entries (24 hours)
      .map(item => ({
        ...item,
        dt_txt: new Date(item.dt * 1000) // Convert timestamp to Date object
      }));
  };

  const processDailyForecast = (data, historicalData) => {
    const dailyData = {};
    
    // Add yesterday's data if available
    if (historicalData) {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayKey = yesterdayDate.toLocaleDateString();
      
      dailyData[yesterdayKey] = {
        dt: historicalData.current.dt,
        dt_txt: yesterdayDate.toISOString(),
        main: {
          temp: historicalData.current.temp,
          temp_min: historicalData.current.temp,
          temp_max: historicalData.current.temp,
          humidity: historicalData.current.humidity
        },
        weather: historicalData.current.weather,
        wind: {
          speed: historicalData.current.wind_speed
        }
      };
    }
    
    // Process current and future forecast data
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          ...item,
          temp_min: item.main.temp,
          temp_max: item.main.temp
        };
      } else {
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp);
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp);
      }
    });

    // Convert to array and take first 5 days
    return Object.values(dailyData).slice(0, 5);
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setError(null);
      setIsLoading(true);

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      
      // Process forecast data
      const dailyForecast = processDailyForecast(forecastResponse.data);
      const hourlyForecast = processHourlyForecast(forecastResponse.data);
      
      setForecast(dailyForecast);
      setHourlyForecast(hourlyForecast);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError("Unable to fetch weather data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistoricalWeather = async (cityName) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = Math.floor(yesterday.getTime() / 1000);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${weather.coord.lat}&lon=${weather.coord.lon}&dt=${timestamp}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching historical data:', err);
      return null;
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      if (!API_KEY) {
        setError("API key not found. Please check environment configuration.");
        return;
      }

      if (!cityName?.trim()) {
        setError("Please enter a city name");
        return;
      }

      setError(null);
      setIsLoading(true);
      
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      // Get forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      // Get yesterday's weather if available
      const historicalData = await fetchHistoricalWeather(cityName);
      
      // Process forecast data
      const dailyForecast = processDailyForecast(forecastResponse.data, historicalData);
      const hourlyForecast = processHourlyForecast(forecastResponse.data);
      
      setForecast(dailyForecast);
      setHourlyForecast(hourlyForecast);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(
        !API_KEY ? "API key not found. Please check environment configuration." :
        err.response?.status === 404 ? `City "${cityName}" not found. Please try another location.` :
        err.response?.status === 401 ? "API key invalid. Please check configuration." :
        err.response?.status === 429 ? "Too many requests. Please try again later." :
        "Unable to fetch weather data. Please try again later."
      );
      setWeather(null);
      setForecast(null);
      setHourlyForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherByCity(city);
    }
  }, [city]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setError(null);
    };
  }, []);

  useEffect(() => {
    // Check if API key is available
    if (!API_KEY) {
      setError("API key not found. Please check environment configuration.");
      return;
    }
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await fetchWeatherData(
            position.coords.latitude,
            position.coords.longitude
          );
          setShowWelcomeModal(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError("Unable to get your location. Please search for a city instead.");
          setShowWelcomeModal(false);
          setCity('London'); // Fallback to default city
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city instead.");
      setShowWelcomeModal(false);
      setCity('London'); // Fallback to default city
    }
  };

  const handleSkip = () => {
    setShowWelcomeModal(false);
    setCity('London'); // Default city
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery("");
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const getThemeWithDarkMode = () => {
    const baseTheme = weather ? getWeatherTheme(weather.weather[0].icon) : getWeatherTheme('01d');
    if (darkMode) {
      return {
        ...baseTheme,
        gradient: 'from-gray-900 to-gray-800',
        accent: 'bg-gray-800/30',
        pattern: 'bg-opacity-30'
      };
    }
    return baseTheme;
  };

  const theme = getThemeWithDarkMode();

  const memoizedTheme = useMemo(() => 
    getThemeWithDarkMode(), 
    [weather?.weather[0]?.icon, darkMode]
  );

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${memoizedTheme.gradient} text-white overflow-hidden`}>
      <Modal 
        isOpen={showWelcomeModal}
        theme={theme}
        onGetLocation={handleGetLocation}
        onSkip={handleSkip}
      />
      
      <div className="min-h-screen w-full px-4 py-6 lg:py-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full opacity-20 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            </svg>
          </div>
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 opacity-10 animate-pulse">
            <div className="w-full h-full rounded-full bg-current"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-6">
            <Header 
              city={weather?.name} 
              theme={theme} 
              toggleDarkMode={toggleDarkMode} 
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <SearchBar 
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                theme={theme}
              />
            </div>

            {error && (
              <div className="max-w-xl mx-auto px-4 py-3 rounded-lg bg-red-500/20 text-white text-center">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {/* Weather Content */}
          {weather && !isLoading && (
            <div className="relative z-10">
              {/* Current Weather Section */}
              <div className="mb-8">
                <CurrentWeather weather={weather} theme={theme} />
              </div>

              {/* Forecast Sections */}
              <div className="space-y-6">
                {/* Hourly Forecast */}
                {hourlyForecast && (
                  <div className={`${theme.accent} ${theme.pattern} backdrop-blur-md rounded-3xl p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">24-Hour Forecast</h3>
                      <span className="text-sm text-white/70 md:hidden">Swipe for more →</span>
                    </div>
                    <div className="flex md:grid overflow-x-auto md:overflow-x-visible hide-scrollbar 
                      md:grid-cols-8 gap-4 pb-4 md:pb-0 -mx-6 md:mx-0 px-6 md:px-0">
                      {hourlyForecast.map((hour, index) => (
                        <div 
                          key={index}
                          className="flex-shrink-0 w-[160px] md:w-auto bg-white/10 rounded-xl p-4
                            hover:bg-white/20 transition-colors duration-200"
                        >
                          <div className="flex flex-col items-center">
                            <p className="text-sm font-medium mb-2">
                              {index === 0 ? 'Now' : hour.dt_txt.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <img
                              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                              alt="weather"
                              className="w-16 h-16 my-2"
                            />
                            <p className="text-2xl font-semibold mb-2">{Math.round(hour.main.temp)}°</p>
                            <div className="space-y-2 text-sm text-white/70">
                              <p className="capitalize">{hour.weather[0].description}</p>
                              <div className="flex justify-between gap-2">
                                <span>💧 {hour.main.humidity}%</span>
                                <span>💨 {Math.round(hour.wind.speed)}m/s</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5-Day Forecast */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <ForecastCard forecast={forecast} theme={theme} />
                  </div>
                </div>

                {/* Additional Weather Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weather && (
                    <>
                      <WeatherInfoCard 
                        title="Humidity" 
                        value={`${weather.main.humidity}%`}
                        icon="💧"
                        theme={theme}
                      />
                      <WeatherInfoCard 
                        title="Wind Speed" 
                        value={`${Math.round(weather.wind.speed)} m/s`}
                        icon="💨"
                        theme={theme}
                      />
                      <WeatherInfoCard 
                        title="Pressure" 
                        value={`${weather.main.pressure} hPa`}
                        icon="🌡️"
                        theme={theme}
                      />
                      <WeatherInfoCard 
                        title="Feels Like" 
                        value={`${Math.round(weather.main.feels_like)}°`}
                        icon="🌡️"
                        theme={theme}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Weather Info Card Component
const WeatherInfoCard = ({ title, value, icon, theme }) => (
  <div className={`${theme.accent} ${theme.pattern} backdrop-blur-md rounded-2xl p-4
    hover:bg-white/10 transition-colors duration-200`}>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl">{icon}</span>
      <h4 className="text-sm font-medium text-white/80">{title}</h4>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

WeatherInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default WeatherApp;
