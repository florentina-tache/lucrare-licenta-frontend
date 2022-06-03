import * as actionTypes from "./types";
import { signUp, login, logout } from "./authActions";
import {
  fetchPlaceById,
  fetchUserPlaces,
  addNewPlace,
  fetchRandomPlace,
  fetchSearchedPlace,
  fetchLatestPlaces,
  fetchLikedPlaces,
  updatePlace,
  deletePlace,
} from "./placesActions";
import { fetchUsers, deleteUser, updatePlaceToNotDisplay } from "./usersActions";

export const appProviderActions = (dispatch, token, userId) => {
  return {
    signUp: (userSignUpDetails) => signUp(dispatch, userSignUpDetails),
    login: (userLoginDetails) => login(dispatch, userLoginDetails),
    fetchPlaceById: (placeId) => fetchPlaceById(dispatch, placeId, token),
    fetchRandomPlace: (placeId) => fetchRandomPlace(placeId, userId, token),
    fetchUserPlaces: (userId, placeType) =>
      fetchUserPlaces(dispatch, userId, token, placeType),
    fetchSearchedPlace: (tag) => fetchSearchedPlace(tag, token),
    fetchLatestPlaces: () => fetchLatestPlaces(token),
    fetchLikedPlaces: () => fetchLikedPlaces(token),
    addNewPlace: (newPlaceDetails, placeType, placeId = "") =>
      addNewPlace(newPlaceDetails, placeType, placeId, userId, token),
    logout: () => logout(dispatch),
    updatePlace: (placeDetails, placeId) =>
      updatePlace(dispatch, placeDetails, placeId, token),
    deletePlace: (placeId) => deletePlace(dispatch, placeId, token),
    fetchUsers: () => fetchUsers(token),
    deleteUser: (userId) => deleteUser(userId, token),
    updatePlaceToNotDisplay: (placeId) => updatePlaceToNotDisplay(userId, placeId, token)
  };
};
