// Return function for each action type
export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      console.log(action.payload);
      return {
        ...state,
        projects: action.payload
      };

    default:
      return state;
  }
};
