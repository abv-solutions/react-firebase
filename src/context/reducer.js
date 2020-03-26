export default (state, action) => {
  switch (action.type) {
    // Project reducer

    case 'GET_PROJECTS':
      return {
        ...state,
        project: {
          projects: action.payload,
          isListening: true,
          isLoading: false,
          percentage: state.project.percentage
        }
      };

    case 'CREATE_PROJECT':
    case 'EDIT_PROJECT':
    case 'DELETE_PROJECT':
      // Managed by listener
      return {
        ...state
      };

    case 'PROJECTS_LOADING':
      return {
        ...state,
        project: {
          projects: state.project.projects,
          isListening: state.project.isListening,
          isLoading: true,
          percentage: state.project.percentage
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

    case 'AUTH_FAIL':
      return {
        ...state,
        auth: {
          user: null,
          isListening: true,
          isLoading: false
        }
      };

    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        auth: {
          user: state.auth.user,
          isListening: state.auth.isListening,
          isLoading: false
        }
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'LOGOUT_SUCCESS':
    case 'LOGOUT_FAIL':
    case 'DELETE_SUCCESS':
    case 'DELETE_FAIL':
      // Managed by listener
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

    // Logs reducer

    case 'GET_LOGS':
      return {
        ...state,
        log: {
          logs: action.payload,
          isListening: true,
          isLoading: false
        }
      };

    case 'LOGS_LOADING':
      return {
        ...state,
        log: {
          logs: state.log.logs,
          isListening: state.log.logs,
          isLoading: true
        }
      };

    // File reducer

    case 'UPLOAD_FILE':
      return {
        ...state,
        project: {
          projects: state.project.projects,
          isListening: state.project.isListening,
          isLoading: state.project.isLoading,
          percentage: action.payload
        }
      };

    case 'UPLOAD_COMPLETE':
      return {
        ...state
      };

    default:
      return state;
  }
};
