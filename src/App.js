import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import SignUp from './components/AuthComponents/SignUp';
import Login from './components/AuthComponents/Login';
import Location from './components/Locations/Location';
import NewLocation from './components/Locations/NewLocation';

import './App.css';
import AppProvider from './integration/context/appProviderContext';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/location/new' element={<NewLocation />} />
        <Route path='/' element={<Location />} />
      </Routes>
    </Router>
  );
};

export default App;
