import * as _ from 'lodash';

export const updateState = (state, newState) => {
  return _.merge(state, newState);
};

export const saveTokenInLocalStorage = (token, expiresIn, userId) => {
  localStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expirationDate: new Date(new Date().getTime() + expiresIn),
    })
  );
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('userData');
};

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

  return tokenDetails.token;
};

export const runLogoutTimer = (logoutFn, timer) => {
  setTimeout(() => {
    logoutFn();
  }, timer);
};

export const autoLogout = (logoutFn) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return;
  }
  const expirationDate = JSON.parse(userData).expirationDate;
  const currentDate = new Date();
  const timer = new Date(expirationDate).getTime() - currentDate.getTime();
  runLogoutTimer(logoutFn, timer);
};
