import React, { createContext, useReducer } from "react";
import { appProviderReducer } from "../reducers/appProvider";
import { appProviderActions } from "../actions/appProvider";
import { initialState } from "./initialState";

export const AppProviderContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appProviderReducer, initialState);
  const actions = appProviderActions(dispatch, state.token, state.userId);

  return (
    <AppProviderContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppProviderContext.Provider>
  );
};

export default AppProvider;
