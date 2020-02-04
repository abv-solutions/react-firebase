import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const intialState = {
    auth: {
      user: {},
      isListening: false,
      isLoading: true
    },
    project: {
      projects: [],
      isListening: false,
      isLoading: true
    },
    error: {}
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
