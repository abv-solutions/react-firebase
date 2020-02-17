import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const intialState = {
    project: {
      projects: [],
      isListening: false,
      isLoading: false,
      percentage: 0
    },
    auth: {
      user: null,
      isListening: false,
      isLoading: false
    },
    error: {
      msg: null,
      code: null,
      type: null
    },
    log: {
      logs: [],
      isListening: false,
      isLoading: false
    }
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
