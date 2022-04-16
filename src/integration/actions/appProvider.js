import * as actionTypes from './types';
import { signUp, login } from './authActions';
import {
  fetchPlaceById,
  fetchUserPlaces,
  addNewPlace,
  fetchRandomPlace,
} from './placesActions';

export const appProviderActions = (dispatch) => {
  return {
    signUp: (userSignUpDetails) => signUp(dispatch, userSignUpDetails),
    login: (userLoginDetails) => login(dispatch, userLoginDetails),
    fetchPlaceById: (placeId) => fetchPlaceById(dispatch, placeId),
    fetchRandomPlace: () => fetchRandomPlace(dispatch),
    fetchUserPlaces: (userId) => fetchUserPlaces(dispatch, userId),
    addNewPlace: (newPlaceDetails, userId) =>
      addNewPlace(dispatch, newPlaceDetails, userId),
  };
};
