import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppProvider, {
  AppProviderContext,
} from "./integration/context/appProviderContext";
import { useUserDetails } from "./helpers/hooks/user-details-hook";

import Navbar from "./components/Navigation/Navbar";
import SignUp from "./components/AuthComponents/SignUp";
import Login from "./components/AuthComponents/Login";
import Places from "./components/Places/Places";
import NewLocation from "./components/Places/NewPlace";
import EditPlace from "./components/Places/EditPlace";
import AddedPlaces from "./components/Places/AddedPlaces";
import FavouritePlaces from "./components/Places/FavouritePlaces";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import SearchPage from "./components/Places/SearchPage";

import "./App.css";

const App = () => {
  const [userId, role] = useUserDetails();
  // console.log(userId, role);

  let routes;
  if (userId) {
    if (role === "user") {
      routes = (
        <Routes>
          <Route path="/places/new" element={<NewLocation />} />
          <Route path="/places/edit/:placeId" element={<EditPlace />} />
          <Route
            path="/places/myplaces"
            element={<AddedPlaces userId={userId} />}
          />
          <Route
            path="/places/myfavourites"
            element={<FavouritePlaces userId={userId} />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/" element={<Places />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    } else if (role === "admin") {
      routes = (
        <Routes>
          <Route path="/places/new" element={<NewLocation />} />
          <Route path="/places/edit/:placeId" element={<EditPlace />} />
          <Route path="/places/myplaces" element={<AddedPlaces />} />
          <Route path="/places/myfavourites" element={<FavouritePlaces />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Places />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Router>
      <Navbar />
      {routes}
    </Router>
  );
};

export default App;
