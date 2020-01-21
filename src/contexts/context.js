import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const intialState = {
    projects: []
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;