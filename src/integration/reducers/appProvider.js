import * as actionTypes from "../actions/types";

export const appProviderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP:
      return { ...state, token: payload.token };
    case actionTypes.LOGIN:
      return { ...state, token: payload.token };
    case actionTypes.LOGOUT:
      return { ...state, token: payload.token };
    default:
      return state;
  }
};
