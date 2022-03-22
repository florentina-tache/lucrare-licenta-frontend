import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import SignUp from './components/AuthComponents/SignUp';
import Login from './components/AuthComponents/Login';

import './App.css';
import AppProvider from './integration/context/appProviderContext';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
