// Return function for each action type
export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return {
        ...state,
        project: {
          projects: action.payload,
          isListening: true
        }
      };

    case 'CREATE_PROJECT':
    case 'DELETE_PROJECT':
      return {
        ...state
      };

    default:
      return state;
  }
};
