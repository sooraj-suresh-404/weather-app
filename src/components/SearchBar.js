import React from 'react';

const SearchBar = ({ query, setQuery, handleSearch, theme }) => (
  <div className="relative z-10 w-full max-w-xl mx-auto">
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <svg 
        className="w-5 h-5 text-white/70" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </div>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className={`w-full pl-11 pr-12 py-3.5 rounded-xl ${theme.accent} ${theme.pattern} 
          backdrop-blur-md text-white placeholder:text-white/70 
          focus:outline-none focus:ring-2 focus:ring-white/30
          text-base shadow-lg transition-all`}
      />
      <button
        type="submit"
        className={`absolute right-3 top-1/2 -translate-y-1/2 
          p-2 rounded-lg hover:bg-white/10
          transition-all duration-200`}
        aria-label="Search"
      >
        <svg 
          className="w-5 h-5 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
    </form>
  </div>
);

export default SearchBar; 