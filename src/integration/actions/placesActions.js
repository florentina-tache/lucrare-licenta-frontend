import * as actionTypes from "./types";
import { server } from "../../helpers/utils/constants";

const includeAuthorization = (token) => ({ Authorization: "Bearer " + token });
const BASE_REQUEST_HEADERS = {
  "Content-type": "application/json",
};
const HTTP_VERBS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
};

const handleError = (err) => {
  console.log(err);
}

export const fetchPlaceById = async (dispatch, placeId, token) => {
  try {
    const response = await fetch(`${server}api/places/${placeId}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }
    dispatch({
      type: actionTypes.GET_PLACE_BY_ID,
      payload: { userId: responseData.userId, token: responseData.token },
    });
    return { place: responseData.place };
  } catch (err) { }
};

export const fetchUserPlaces = async (dispatch, userId, token, placeType) => {
  try {
    const response = await fetch(
      `${server}api/places/user/${placeType}/${userId}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
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
  } catch (err) { }
};

export const fetchRandomPlace = async (placeId, userId, token) => {
  try {
    const response = await fetch(`${server}api/places/random/${userId}/${placeId}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const responseData = await response.json();

    if (response.status === 404) {
      return { ...responseData, success: false };
    }
    return { place: responseData.place };
  } catch (err) { }
};

export const fetchSearchedPlace = async (tag, token) => {
  // console.log("tag", JSON.stringify({ tag }));
  try {
    const response = await fetch(`${server}api/places/search`, {
      method: "POST",
      body: JSON.stringify({ tag }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    const responseData = await response.json();

    // if (response.status !== 200) {
    //   return { ...responseData, success: false };
    // }
    // dispatch({
    //   type: actionTypes.GET_PLACES_BY_USER_ID,
    //   // payload: { userId: responseData.userId, token: responseData.token },
    // });

    return { place: responseData.places };
  } catch (err) {
    console.log(err);
  }
};

// export const fetchLatestPlaces = async (token) => {
//   try {
//     const response = await fetch(`${server}api/places/latest`, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-type": "application/json",
//       },
//     });

//     const responseData = await response.json();

//     if (response.status !== 200) return;

//     return { places: responseData.places };
//   } catch (err) {
//     console.log(err);
//   }
// };

export const fetchLatestPlaces = async (token) => {
  try {
    const requestHeaders = {
      ...BASE_REQUEST_HEADERS,
      ...includeAuthorization(token),
    };
    const requestConfiguration = {
      method: HTTP_VERBS.GET,
      headers: { ...requestHeaders },
    };
    const url = `${server}api/places/latest`;

    const response = await fetch(url, { ...requestConfiguration });

    if (response.status !== 200) {
      const technicalError = await response.text();
      return technicalError;
    }
    const responseData = await response.json();
    return { places: responseData.places };
  } catch (err) {
    console.log(err);
  }
};

export const fetchLikedPlaces = async (token) => {
  try {
    const requestHeaders = {
      ...BASE_REQUEST_HEADERS,
      ...includeAuthorization(token)
    }
    const requestConfiguration = {
      method: HTTP_VERBS.GET,
      headers: { ...requestHeaders },
    }
    const url = `${server}api/places/liked`;
    const response = await fetch(url, { ...requestConfiguration });

    if (response.status !== 200) {
      const technicalError = await response.text();
      return technicalError;
    }

    const responseData = await response.json();

    return { places: responseData.places };
  } catch (err) {
    console.log(err);
  }
};

// export const fetchLikedPlaces = async (token) => {
//   try {
//     const response = await fetch(`${server}api/places/liked`, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-type": "application/json",
//       },
//     });

//     const responseData = await response.json();

//     return { places: responseData.places };
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addNewPlace = async (
  newPlaceDetails,
  placeType,
  placeId,
  userId,
  token,
) => {
  const { title, description, address, image } = newPlaceDetails;
  try {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("image", image);
    formData.append("placeId", placeId);
    formData.append("creator", userId);
    const response = await fetch(`${server}api/places/${placeType}`, {
      method: "POST",
      body: formData,
      headers: { Authorization: "Bearer " + token },
    });

    const responseData = await response.json();
    if (response.status !== 201) {
      return { ...responseData, success: false };
    }

    return { message: "Successfully added place", success: true };
  } catch (err) { }
};

export const updatePlace = async (dispatch, placeDetails, placeId, token) => {
  const { title, description, address } = placeDetails;
  try {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);

    const response = await fetch(`${server}api/places/${placeId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, description, address }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }

    dispatch({
      type: actionTypes.ADD_NEW_PLACE,
    });
    return { message: "Successfully updated place", success: true };
  } catch (error) {
    handleError(error);
  }
};

export const deletePlace = async (placeId, token) => {
  try {
    const response = await fetch(`${server}api/places/${placeId}`, {
      method: "DELETE",
      body: null,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();
    // console.log("responseData", responseData);

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }

    return { message: "Successfully deleted place", success: true };
  } catch (err) { }
};