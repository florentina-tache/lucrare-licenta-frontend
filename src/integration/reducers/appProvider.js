import * as actionTypes from '../actions/types';

export const appProviderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP:
      return state, { ...payload };
    default:
      return state;
  }
};
