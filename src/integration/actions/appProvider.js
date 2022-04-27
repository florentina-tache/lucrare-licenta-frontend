import * as actionTypes from './types';
import { signUp, login, logout } from './authActions';
import {
  fetchPlaceById,
  fetchUserPlaces,
  addNewPlace,
  fetchRandomPlace,
} from './placesActions';

export const appProviderActions = (dispatch, token) => {
  return {
    signUp: (userSignUpDetails) => signUp(dispatch, userSignUpDetails),
    login: (userLoginDetails) => login(dispatch, userLoginDetails),
    fetchPlaceById: (placeId) => fetchPlaceById(dispatch, placeId),
    fetchRandomPlace: () => fetchRandomPlace(dispatch, token),
    fetchUserPlaces: (userId) => fetchUserPlaces(dispatch, userId, token),
    addNewPlace: (newPlaceDetails, userId) =>
      addNewPlace(dispatch, newPlaceDetails, userId, token),
    logout: () => logout(dispatch),
  };
};
