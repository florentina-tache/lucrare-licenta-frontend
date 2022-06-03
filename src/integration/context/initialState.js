import { getTokenFromStorage, getUserIdFromToken } from "../../helpers/utils/utilFunctions";

export const initialState = {
  token: getTokenFromStorage(),
  userId: getUserIdFromToken(),
  login: () => { },
  logout: () => { },
};
