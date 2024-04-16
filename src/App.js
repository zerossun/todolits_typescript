import React from 'react';
import PokemIndex from './components/PokemIndex'
import PokemonDetailsPage from './components/PokemonDetailsPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokemIndex />} />
        <Route path='/pokemon/:id' element={<PokemonDetailsPage/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
