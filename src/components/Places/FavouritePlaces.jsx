import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AppProviderContext } from '../../integration/context/appProviderContext';

import AlertMessage from '../shared/AlertMessage';
import UserPlaces from './UserPlaces';

const FavouritePlaces = () => {
  //   const classes = useStyles();
  const { actions, state } = useContext(AppProviderContext);
  let token = state.token;
  let decodedToken, userId;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const [favouritePlaces, setFavouritePlaces] = useState(null);

  const getFavouritePlaces = async () => {
    let places;
    try {
      places = await actions.fetchUserPlaces(userId, 'favourites');
    } catch (err) {}
    setFavouritePlaces(places);
  };

  useEffect(() => {
    getFavouritePlaces();
  }, []);

  // useEffect(() => {
  //   console.log(favouritePlaces);
  // }, [favouritePlaces]);

  return favouritePlaces?.places ? (
    <UserPlaces itemData={favouritePlaces.places} />
  ) : (
    <AlertMessage text='No places found!' />
  );
};

export default FavouritePlaces;
