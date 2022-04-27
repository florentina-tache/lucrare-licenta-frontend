import * as actionTypes from './types';
import { server } from '../../helpers/utils/constants';

export const fetchPlaceById = async (dispatch, placeId) => {
  try {
    const response = await fetch(
      `${server}api/places/${placeId}`,
      {
        method: 'GET',
      }
    );

    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }
    dispatch({
      type: actionTypes.GET_PLACE_BY_ID,
      payload: { userId: responseData.userId, token: responseData.token },
    });
    // console.log('ceva', responseData);
    return { place: responseData.place };
  } catch (err) {}
};

export const fetchUserPlaces = async (dispatch, userId) => {
  try {
    const response = await fetch(
      `${server}api/places/user/${userId}`,
      {
        method: 'GET',
      }
    );

    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }
    dispatch({
      type: actionTypes.GET_PLACES_BY_USER_ID,
      payload: { userId: responseData.userId, token: responseData.token },
    });
    return { places: responseData.places };
  } catch (err) {}
};

export const fetchRandomPlace = async (dispatch) => {
  try {
    const response = await fetch(`${server}api/places/random`, {
      method: 'GET',
    });

    const responseData = await response.json();

    // if (response.status !== 200) {
    //   return { ...responseData, success: false };
    // }
    dispatch({
      type: actionTypes.GET_PLACES_BY_USER_ID,
      // payload: { userId: responseData.userId, token: responseData.token },
    });
    return { place: responseData.place };
  } catch (err) {}
};

export const addNewPlace = async (dispatch, newPlaceDetails, userId) => {
  const { title, description, address, image } = newPlaceDetails;
  try {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('image', image);
    formData.append('creator', userId);
    const response = await fetch(`${server}api/places`, {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();
    if (response.status !== 201) {
      return { ...responseData, success: false };
    }

    dispatch({
      type: actionTypes.ADD_NEW_PLACE,
    });
    return { message: 'Successfully added place', success: true };
  } catch (err) {}
};
