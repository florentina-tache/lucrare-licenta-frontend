import * as actionTypes from '../actions/types';

export const appProviderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP:
      return { ...state, token: payload.token };
    case actionTypes.LOGIN:
      return { ...state, token: payload.token };
    case actionTypes.LOGOUT:
      return { ...state, token: payload.token };
    case actionTypes.GET_PLACE_BY_ID:
      return { ...state, payload };
    case actionTypes.GET_PLACES_BY_USER_ID:
      return { ...state, payload };
    case actionTypes.UPDATE_PLACE:
      return { ...state, payload };
    default:
      return state;
  }
};
