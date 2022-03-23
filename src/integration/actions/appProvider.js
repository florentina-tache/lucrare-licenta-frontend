import * as actionTypes from './types';
import { signUp, login } from './authActions';

export const appProviderActions = (dispatch) => {
  return {
    signUp: (userSignUpDetails) => signUp(dispatch, userSignUpDetails),
    login: (userLoginDetails) => login(dispatch, userLoginDetails),
  };
};
