import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppProviderContext } from "../../integration/context/appProviderContext";

import AlertMessage from "../shared/AlertMessage";
import UserPlaces from "./UserPlaces";

const FavouritePlaces = ({ userId }) => {
  // const classes = useStyles();
  const { actions } = useContext(AppProviderContext);

  const [favouritePlaces, setFavouritePlaces] = useState(null);

  const getFavouritePlaces = async () => {
    let places;
    try {
      places = await actions.fetchUserPlaces(userId, "favourites");
    } catch (err) { }
    setFavouritePlaces(places);
  };

  useEffect(() => {
    getFavouritePlaces();
  }, []);

  // useEffect(() => {
  //   console.log(favouritePlaces?.places);
  // }, [favouritePlaces]);

  return favouritePlaces?.places ? (
    <UserPlaces itemData={favouritePlaces.places} />
  ) : (
    <AlertMessage text="No places found!" />
  );
};

export default FavouritePlaces;
