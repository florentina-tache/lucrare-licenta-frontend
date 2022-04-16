import { getTokenFromStorage } from '../../helpers/utils/utilFunctions';

export const initialState = {
  token: getTokenFromStorage(),
  isLoggedIn: !!getTokenFromStorage(),
  userId: null,
  login: () => {},
  logout: () => {},
};
