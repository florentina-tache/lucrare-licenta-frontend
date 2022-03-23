import * as actionTypes from '../actions/types';
import { updateState } from '../../helpers/utils/utilFunctions';

export const appProviderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP:
      return updateState(state, payload);
    case actionTypes.LOGIN:
      return updateState(state, payload);
    default:
      return state;
  }
};
