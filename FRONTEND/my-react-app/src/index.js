import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* This should be the ONLY BrowserRouter in your entire app */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);