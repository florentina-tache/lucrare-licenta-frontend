import { useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { AppProviderContext } from '../../integration/context/appProviderContext';

export function useUserDetails() {
  const { state } = useContext(AppProviderContext);

  let token = state.token;
  let decodedToken, userId, role;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
    role = decodedToken.role;
  }

  return [userId, role];
}
