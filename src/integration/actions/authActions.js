import * as actionTypes from './types';
import { saveTokenInLocalStorage } from '../../helpers/utils/utilFunctions';

export const signUp = async (dispatch, userSignUpDetails) => {
  const { firstName, lastName, email, password } = userSignUpDetails;
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
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
      type: actionTypes.SIGNUP,
      payload: { userId: responseData.userId, token: responseData.token },
    });
    saveTokenInLocalStorage(responseData.token, 1000 * 1000);
    return { message: 'Successfully created account', success: true };
  } catch (err) {}
};

export const login = async (dispatch, userLoginDetails) => {
  const { email, password } = userLoginDetails;
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
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
      payload: { userId: responseData.userId, token: responseData.token },
    });
    saveTokenInLocalStorage(responseData.token, 10 * 1000);
    return { message: 'Successfully logged in', success: true };
  } catch (err) {}
};
