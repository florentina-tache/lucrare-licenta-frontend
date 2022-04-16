import { getTokenFromStorage } from '../../helpers/utils/utilFunctions';

export const initialState = {
  token: getTokenFromStorage(),
  userId: null,
  login: () => {},
  logout: () => {},
};
