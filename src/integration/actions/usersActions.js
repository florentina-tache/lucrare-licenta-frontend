//getUsers
import * as actionTypes from "./types";
import { server } from "../../helpers/utils/constants";

export const fetchUsers = async (token) => {
  try {
    const response = await fetch(`${server}api/users`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }
    return responseData.users;
  } catch (err) { }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${server}api/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }
    return { message: "Successfully deleted user", success: true };
  } catch (err) { }
};

export const updatePlaceToNotDisplay = async (userId, placeId, token) => {
  try {
    const response = await fetch(`${server}api/users/places`, {
      method: "PATCH",
      body: JSON.stringify({ userId, placeId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    });
    const responseData = await response.json();

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }

    if (response.status === 404) {
      alert()
    }

    return { message: "Successfully updated user places", success: true };
  } catch (err) { }
};

export const deletePlaceFromFavourites = async (placeId, token) => {
  try {
    const response = await fetch(`${server}api/users/favourites/${placeId}`, {
      method: "DELETE",
      body: null,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    console.log("responseData", responseData);

    if (response.status !== 200) {
      return { ...responseData, success: false };
    }

    return { message: "Successfully deleted place in favourites", success: true };
  } catch (err) { }
};
