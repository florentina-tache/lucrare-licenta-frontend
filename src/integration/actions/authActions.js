import * as actionTypes from './types';

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
    return { message: 'Successfully signed in', success: true };
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

    return dispatch({
      type: actionTypes.LOGIN,
      payload: { userId: responseData.userId, token: responseData.token },
    });
  } catch (err) {
    console.log('!!!!!!!!!!!!', err);
    throw err;
  }
};
