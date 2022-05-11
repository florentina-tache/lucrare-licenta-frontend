import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppProvider, {
  AppProviderContext,
} from './integration/context/appProviderContext';

import Navbar from './components/Navigation/Navbar';
import SignUp from './components/AuthComponents/SignUp';
import Login from './components/AuthComponents/Login';
import Places from './components/Places/Places';
import NewLocation from './components/Places/NewPlace';
import EditPlace from './components/Places/EditPlace';
import AddedPlaces from './components/Places/AddedPlaces';
import FavouritePlaces from './components/Places/FavouritePlaces';
import UsersList from './components/AdminDashboard/UsersList';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/places/new' element={<NewLocation />} />
        <Route path='/places/edit/:placeId' element={<EditPlace />} />
        <Route path='/places/myplaces' element={<AddedPlaces />} />
        <Route path='/places/myfavourites' element={<FavouritePlaces />} />
        <Route path='/admin/users' element={<UsersList />} />
        <Route path='/' element={<Places />} />
      </Routes>
    </Router>
  );
};

export default App;
