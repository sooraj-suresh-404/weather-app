import React, { useEffect } from 'react';

const Header = ({ city, theme, toggleDarkMode, darkMode, setDarkMode }) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  };

  useEffect(() => {
    const updateDarkMode = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 18 || hour < 6;
      setDarkMode(shouldBeDark);
    };

    updateDarkMode();
    const interval = setInterval(updateDarkMode, 60000);
    return () => clearInterval(interval);
  }, [setDarkMode]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{theme.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {city || 'Weather App'}
              </h1>
              <p className="text-sm text-white/70">
                {getTimeOfDay()} • {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2.5 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title="Toggle manual dark mode"
          >
            {darkMode ? (
              <svg 
                className="w-6 h-6 text-yellow-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            ) : (
              <svg 
                className="w-6 h-6 text-gray-900" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header; 