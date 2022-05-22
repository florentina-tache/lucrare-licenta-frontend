import * as actionTypes from "./types";
import { signUp, login, logout } from "./authActions";
import {
  fetchPlaceById,
  fetchUserPlaces,
  addNewPlace,
  fetchRandomPlace,
  fetchSearchedPlace,
  fetchLatestPlaces,
  updatePlace,
  deletePlace,
} from "./placesActions";
import { fetchUsers, deleteUser } from "./usersActions";

export const appProviderActions = (dispatch, token) => {
  return {
    signUp: (userSignUpDetails) => signUp(dispatch, userSignUpDetails),
    login: (userLoginDetails) => login(dispatch, userLoginDetails),
    fetchPlaceById: (placeId) => fetchPlaceById(dispatch, placeId, token),
    fetchRandomPlace: () => fetchRandomPlace(dispatch, token),
    fetchUserPlaces: (userId, placeType) =>
      fetchUserPlaces(dispatch, userId, token, placeType),
    fetchSearchedPlace: (tag) => fetchSearchedPlace(tag, token),
    fetchLatestPlaces: () => fetchLatestPlaces(token),
    addNewPlace: (newPlaceDetails, userId, placeType) =>
      addNewPlace(dispatch, newPlaceDetails, userId, token, placeType),
    logout: () => logout(dispatch),
    updatePlace: (placeDetails, placeId) =>
      updatePlace(dispatch, placeDetails, placeId, token),
    deletePlace: (placeId) => deletePlace(dispatch, placeId, token),
    fetchUsers: () => fetchUsers(token),
    deleteUser: (userId) => deleteUser(userId, token),
  };
};
