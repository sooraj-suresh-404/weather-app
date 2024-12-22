import React from 'react';

const Header = ({ city, theme, toggleDarkMode, darkMode }) => (
  <div className="flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="text-3xl sm:text-4xl">{theme.icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {city || 'Weather App'}
          </h1>
          <p className="text-sm text-white/70">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      <button 
        onClick={toggleDarkMode} 
        className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </div>
  </div>
);

export default Header; 