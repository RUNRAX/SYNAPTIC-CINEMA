import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your layout and all of your page components
import Layout from './components/layout.jsx';
import Welcome from './pages/Welcome.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Synaptic from './pages/Synaptic.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import EmotionResults from './pages/EmotionResults.jsx';
import MovieDetails from './pages/MovieDetails.jsx';

export default function App() {
  return (
    <Routes>
      {/* Route 1: The Welcome page. 
        It is a standalone route and a sibling to the Layout route below.
      */}
      <Route path="/" element={<Welcome />} />

      {/* Route 2: The Layout Route.
        This special route has NO path. It acts as a wrapper for all the
        child routes nested inside it. This is the correct way to share a layout.
      */}
      <Route element={<Layout />}>
        {/* These routes are children of the Layout. They will render inside its <Outlet /> */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Synaptic" element={<Synaptic />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/EmotionResults" element={<EmotionResults />} />
        <Route path="/MovieDetails" element={<MovieDetails />} /> 
      </Route>
    </Routes>
  );
}