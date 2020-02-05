export const reducer = (state, action) => {
  switch (action.type) {
    // Project reducer

    case 'GET_PROJECTS':
      return {
        ...state,
        project: {
          projects: action.payload,
          isListening: true,
          isLoading: false
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
          isListening: state.project.isListening,
          isLoading: state.project.isLoading
        }
      };

    case 'CREATE_PROJECT':
    case 'DELETE_PROJECT':
      return {
        ...state
      };

    case 'PROJECTS_LOADING':
      return {
        ...state,
        project: {
          projects: state.project.projects,
          isListening: state.project.isListening,
          isLoading: true
        }
      };

    // Auth reducer

    case 'AUTH_SUCCESS':
      return {
        ...state,
        auth: {
          user: action.payload,
          isListening: true,
          isLoading: false
        }
      };

    case 'AUTH_ERROR':
    case 'LOGOUT':
    case 'LOGOUT_FAIL':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        auth: {
          user: null,
          isListening: true,
          isLoading: false
        }
      };

    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state
      };

    case 'AUTH_LOADING':
      return {
        ...state,
        auth: {
          user: state.auth.user,
          isListening: state.auth.isListening,
          isLoading: true
        }
      };

    // Error reducer

    case 'GET_ERRORS':
      return {
        ...state,
        error: {
          msg: action.payload.msg,
          code: action.payload.code,
          type: action.payload.type
        }
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: {
          msg: null,
          code: null,
          type: null
        }
      };

    default:
      return state;
  }
};
