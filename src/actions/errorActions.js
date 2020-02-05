// Return errors - used from actions
export const returnErrors = (msg, code, type = null) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, code, type }
  };
};

// Clear errors - used from components
export const clearErrors = dispatch => {
  dispatch({
    type: 'CLEAR_ERRORS'
  });
};
