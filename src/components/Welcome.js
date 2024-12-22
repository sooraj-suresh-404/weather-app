import React from 'react';

const Welcome = ({ onGetLocation, onSkip, theme }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
    <div className={`${theme.accent} ${theme.pattern} backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-lg`}>
      <h1 className="text-4xl font-bold mb-4">Welcome to Weather App</h1>
      <p className="text-lg mb-8 text-white/80">
        Get accurate weather information for your location
      </p>
      
      <div className="space-y-4">
        <button
          onClick={onGetLocation}
          className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 rounded-xl 
            transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          Use My Location
        </button>
        
        <button
          onClick={onSkip}
          className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl 
            transition-all duration-300"
        >
          Skip
        </button>
      </div>
    </div>
  </div>
);

export default Welcome; 