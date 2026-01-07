import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import MovieDetails from './MovieDetails';

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* Updated route to handle both movie and TV series details dynamically */}
      <Route path="/details/:type/:id" element={<MovieDetails />} />
      {/* Keep the old route for /movie/:id for backward compatibility if needed,
          or remove it if all links in App.js are updated to /details/:type/:id */}
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </Router>
);

export default Root;
