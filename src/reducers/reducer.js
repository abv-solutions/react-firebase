// Return function for each action type
export const reducer = (state, action) => {
  // Project reducer

  switch (action.type) {
    case 'GET_PROJECTS':
      return {
        ...state,
        project: {
          projects: action.payload,
          isListening: true
        }
      };

    case 'EDIT_PROJECT':
      return {
        ...state,
        project: {
          projects: state.project.projects.map(project =>
            project.id === action.payload.id
              ? {
                  // Update the project
                  ...project,
                  title: action.payload.title,
                  content: action.payload.content
                }
              : project
          ),
          isListening: state.project.isListening
        }
      };

    case 'CREATE_PROJECT':
    case 'DELETE_PROJECT':
      return {
        ...state
      };

    // Project reducer

    case 'AUTH_SUCCESS':
      return {
        ...state,
        auth: {
          user: action.payload,
          isListening: true
        }
      };

    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: {},
          isListening: true
        }
      };

    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state
      };

    default:
      return state;
  }
};
