import * as actionTypes from './types';

export const fetchPlaceById = async (dispatch, placeId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/places/${placeId}`,
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
      `http://localhost:5000/api/places/user/${userId}`,
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
    // console.log(responseData);
    return { message: 'Successfully found place', success: true };
  } catch (err) {}
};

export const fetchRandomPlace = async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/api/places/random`, {
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
    console.log(responseData);
    return { place: responseData.place };
  } catch (err) {}
};

export const addNewPlace = async (dispatch, newPlaceDetails, userId) => {
  const { title, description, address } = newPlaceDetails;
  try {
    const response = await fetch('http://localhost:5000/api/places', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        address,
        creator: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
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
