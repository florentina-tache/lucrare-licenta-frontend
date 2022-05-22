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
  } catch (err) {}
};
