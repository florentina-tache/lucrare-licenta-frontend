import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import SignUp from './components/AuthComponents/SignUp';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
