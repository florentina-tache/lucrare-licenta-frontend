import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AppProviderContext } from '../../integration/context/appProviderContext';

import UserPlaces from './UserPlaces';
import AlertMessage from '../shared/AlertMessage';

const AddedPlaces = () => {
  const { actions, state } = useContext(AppProviderContext);
  let token = state.token;
  let decodedToken, userId;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const [addedPlaces, setAddedPlaces] = useState(null);

  const getAddedPlaces = async () => {
    let places;
    try {
      places = await actions.fetchUserPlaces(userId, 'added');
      console.log('err', places);
    } catch (err) {}
    setAddedPlaces(places);
  };

  useEffect(() => {
    getAddedPlaces();
  }, []);

  return addedPlaces?.places ? (
    <UserPlaces itemData={addedPlaces.places} />
  ) : (
    <AlertMessage text='No places found!' />
  );
};

export default AddedPlaces;
