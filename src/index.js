import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './components/weatherCard';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <WeatherApp />
    </ErrorBoundary>
  </React.StrictMode>
);

