import { getTokenFromStorage } from '../../helpers/utils/utilFunctions';

export const initialState = {
  token: getTokenFromStorage(),
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
};
