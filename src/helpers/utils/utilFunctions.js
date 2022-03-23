import * as _ from 'lodash';

export const updateState = (state, newState) => {
  return _.merge(state, newState);
};

export const saveTokenInLocalStorage = (token, expiresIn) => {
  localStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      expirationDate: new Date(new Date().getTime() + expiresIn),
    })
  );
};

// export const runLogotTimer = (dispatch, logoutFn, timer) => {
//   setTimeout(() => {
//     dispatch(authActions.logout());
//     logoutFn();
//   }, timer);
// };

export const getTokenFromStorage = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return null;
  }
  const tokenDetails = JSON.parse(userData);
  const currentDate = new Date();
  if (currentDate > new Date(tokenDetails.expirationDate)) {
    return null;
  }
  console.log('localstorage', tokenDetails.token);

  return tokenDetails.token;
};

// export const checkAutoLogin = (dispatch, logoutFn) => {
//   const userData = localStorage.getItem('userData');
//   if (!userData) {
//     return;
//   }
//   const expirationDate = JSON.parse(userData).expirationDate;
//   const currentDate = new Date();
//   const timer = new Date(expirationDate).getTime() - currentDate.getTime();
//   runLogotTimer(dispatch, logoutFn, timer);
// };
