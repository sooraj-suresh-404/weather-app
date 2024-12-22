export const getWeatherTheme = (weatherCode) => {
  const themes = {
    // Clear sky - Day
    '01d': {
      gradient: 'from-sky-400 via-blue-400 to-blue-500',
      accent: 'bg-blue-400/30',
      icon: '☀️',
      pattern: 'bg-opacity-20'
    },
    // Clear sky - Night
    '01n': {
      gradient: 'from-gray-900 via-blue-900 to-black',
      accent: 'bg-blue-900/30',
      icon: '🌙',
      pattern: 'bg-opacity-20'
    },
    // Few clouds - Day
    '02d': {
      gradient: 'from-blue-400 via-blue-300 to-blue-400',
      accent: 'bg-blue-300/30',
      icon: '⛅',
      pattern: 'bg-opacity-20'
    },
    // Few clouds - Night
    '02n': {
      gradient: 'from-gray-800 via-blue-900 to-gray-900',
      accent: 'bg-blue-800/30',
      icon: '☁️',
      pattern: 'bg-opacity-20'
    },
    // Scattered clouds
    '03d': {
      gradient: 'from-blue-300 via-gray-300 to-blue-300',
      accent: 'bg-gray-400/30',
      icon: '☁️',
      pattern: 'bg-opacity-20'
    },
    '03n': {
      gradient: 'from-gray-800 via-gray-900 to-gray-800',
      accent: 'bg-gray-700/30',
      icon: '☁️',
      pattern: 'bg-opacity-20'
    },
    // Broken clouds
    '04d': {
      gradient: 'from-gray-400 via-gray-500 to-gray-400',
      accent: 'bg-gray-500/30',
      icon: '☁️',
      pattern: 'bg-opacity-20'
    },
    '04n': {
      gradient: 'from-gray-800 via-gray-900 to-gray-800',
      accent: 'bg-gray-700/30',
      icon: '☁️',
      pattern: 'bg-opacity-20'
    },
    // Shower rain
    '09d': {
      gradient: 'from-blue-600 via-blue-700 to-blue-800',
      accent: 'bg-blue-600/30',
      icon: '🌧️',
      pattern: 'bg-opacity-20'
    },
    '09n': {
      gradient: 'from-blue-900 via-gray-900 to-blue-900',
      accent: 'bg-blue-800/30',
      icon: '🌧️',
      pattern: 'bg-opacity-20'
    },
    // Rain
    '10d': {
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      accent: 'bg-blue-500/30',
      icon: '🌧️',
      pattern: 'bg-opacity-20'
    },
    '10n': {
      gradient: 'from-blue-800 via-gray-900 to-blue-900',
      accent: 'bg-blue-700/30',
      icon: '🌧️',
      pattern: 'bg-opacity-20'
    },
    // Thunderstorm
    '11d': {
      gradient: 'from-gray-700 via-purple-900 to-gray-800',
      accent: 'bg-purple-800/30',
      icon: '⛈️',
      pattern: 'bg-opacity-20'
    },
    '11n': {
      gradient: 'from-gray-900 via-purple-900 to-black',
      accent: 'bg-purple-900/30',
      icon: '⛈️',
      pattern: 'bg-opacity-20'
    },
    // Snow
    '13d': {
      gradient: 'from-blue-100 via-blue-200 to-blue-300',
      accent: 'bg-blue-200/30',
      icon: '❄️',
      pattern: 'bg-opacity-20'
    },
    '13n': {
      gradient: 'from-blue-200 via-blue-300 to-blue-400',
      accent: 'bg-blue-300/30',
      icon: '❄️',
      pattern: 'bg-opacity-20'
    },
    // Mist/Fog
    '50d': {
      gradient: 'from-gray-300 via-gray-400 to-gray-500',
      accent: 'bg-gray-400/30',
      icon: '🌫️',
      pattern: 'bg-opacity-20'
    },
    '50n': {
      gradient: 'from-gray-600 via-gray-700 to-gray-800',
      accent: 'bg-gray-600/30',
      icon: '🌫️',
      pattern: 'bg-opacity-20'
    }
  };

  return themes[weatherCode] || themes['01d'];
}; 