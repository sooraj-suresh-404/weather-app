import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ query, setQuery, handleSearch, theme }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedQuery = query.trim().replace(/[^\w\s-]/gi, '');
    if (sanitizedQuery) {
      handleSearch(e);
    }
  };

  return (
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
      <form 
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search for a city"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          maxLength={50}
          aria-label="City search"
          className={`w-full pl-11 pr-12 py-3.5 rounded-xl ${theme.accent} ${theme.pattern} 
            backdrop-blur-md text-white placeholder:text-white/70 
            focus:outline-none focus:ring-2 focus:ring-white/30
            text-base shadow-lg transition-all`}
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SearchBar; 