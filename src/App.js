import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import FoglalasList from './components/FoglalasList';
import UjFoglalas from './components/UjFoglalas';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foglalasok" element={<FoglalasList />} />
          <Route path="/ujfoglalas" element={<UjFoglalas />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
