import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AsteroidList from './screens/AsteroidList';
import Favourites from './screens/Favourites';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="nav-options-container">
          <Link to="/" className="nav-options-element">Asteroid List</Link>
          <Link to="/favourites" className="nav-options-element">Favourites</Link>
        </nav>

        <Routes>
          <Route path="/" element={<AsteroidList/>} />
          <Route path="/favourites" element={<Favourites/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
