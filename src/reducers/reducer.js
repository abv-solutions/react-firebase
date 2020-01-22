// Return function for each action type
export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return {
        ...state,
        project: {
          projects: action.payload
        }
      };

    case 'CREATE_PROJECT':
      return {
        ...state
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        project: {
          projects: state.project.projects.filter(
            project => project.id !== action.payload
          )
        }
      };

    default:
      return state;
  }
};
