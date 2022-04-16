import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import SignUp from './components/AuthComponents/SignUp';
import Login from './components/AuthComponents/Login';
import Places from './components/Places/Places';
import NewLocation from './components/Places/NewPlace';
import UserPlaces from './components/Places/UserPlaces';
import UsersList from './components/AdminDashboard/UsersList';

import './App.css';
import AppProvider from './integration/context/appProviderContext';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/places/new' element={<NewLocation />} />
        <Route path='/places/myplaces' element={<UserPlaces />} />
        <Route path='/admin/users' element={<UsersList />} />
        <Route path='/' element={<Places />} />
      </Routes>
    </Router>
  );
};

export default App;
