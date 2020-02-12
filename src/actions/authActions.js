import firebase from '../config/firebaseConfig';
import { returnErrors } from './errorActions';
const auth = firebase.auth();

export const getUser = dispatch => {
  try {
    // User loading
    dispatch(userLoading());
    auth.onAuthStateChanged(user => {
      if (user) {
        const { uid, email } = user;
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { uid, email }
        });
      } else {
        dispatch({
          type: 'AUTH_FAIL'
        });
      }
    });
  } catch (err) {
    dispatch(returnErrors(err.message, err.code, 'AUTH_FAIL'));
    dispatch({
      type: 'AUTH_FAIL'
    });
  }
};

export const register = (user, dispatch) => {
  const { email, password } = user;
  // User loading
  dispatch(userLoading());
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const { uid, email } = cred.user;
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { uid, email }
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.message, err.code, 'REGISTER_FAIL'));
      dispatch({
        type: 'REGISTER_FAIL'
      });
    });
};

export const login = (user, dispatch) => {
  const { email, password } = user;
  // User loading
  dispatch(userLoading());
  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      const { uid, email } = cred.user;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { uid, email }
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.message, err.code, 'LOGIN_FAIL'));
      dispatch({
        type: 'LOGIN_FAIL'
      });
    });
};

export const logout = dispatch => {
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: 'LOGOUT_SUCCESS'
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.message, err.code, 'LOGOUT_FAIL'));
      dispatch({
        type: 'LOGOUT_FAIL'
      });
    });
};

// Set loading flag - used locally
export const userLoading = () => {
  return {
    type: 'AUTH_LOADING'
  };
};
