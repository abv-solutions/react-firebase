// Return function for each action type
export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        projects: action.payload
      };

    default:
      return state;
  }
};
