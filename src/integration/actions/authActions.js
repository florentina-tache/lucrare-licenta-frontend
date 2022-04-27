import * as actionTypes from './types';
import {
  saveTokenInLocalStorage,
  removeTokenFromLocalStorage,
  autoLogout,
} from '../../helpers/utils/utilFunctions';
import { server } from '../../helpers/utils/constants';

export const logout = (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT, payload: { token: null } });
  removeTokenFromLocalStorage();
};

export const signUp = async (dispatch, userSignUpDetails) => {
  const { firstName, lastName, email, password, image } = userSignUpDetails;
  try {
    let formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    const response = await fetch(`${server}api/auth/signup`, {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();
    if (response.status !== 201) {
      return { ...responseData, success: false };
    }

    dispatch({
      type: actionTypes.SIGNUP,
      payload: {
        userId: responseData.userId,
        token: responseData.token,
      },
    });
    saveTokenInLocalStorage(
      responseData.token,
      1000 * 1000,
      responseData.userId
    );
    autoLogout(() => logout(dispatch));

    return { message: 'Successfully created account', success: true };
  } catch (err) {}
};

export const login = async (dispatch, userLoginDetails) => {
  const { email, password } = userLoginDetails;
  try {
    const response = await fetch(`${server}api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
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
      type: actionTypes.LOGIN,
      payload: {
        userId: responseData.userId,
        token: responseData.token,
      },
    });
    saveTokenInLocalStorage(
      responseData.token,
      1000 * 1000,
      responseData.userId
    );
    autoLogout(() => logout(dispatch));
    return { message: 'Successfully logged in', success: true };
  } catch (err) {}
};
