import React from 'react';

const Modal = ({ isOpen, theme, onGetLocation, onSkip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`${theme.accent} ${theme.pattern} backdrop-blur-md rounded-3xl p-6 sm:p-8 
        max-w-md w-full shadow-xl animate-fadeIn`}>
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Welcome to Weather App
          </h2>
          <p className="text-base sm:text-lg mb-6 text-white/80">
            Would you like to see the weather for your current location?
          </p>
          
          <div className="space-y-3">
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
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 