import firebase from '../config/firebaseConfig';
import { returnErrors } from './errorActions';

const auth = firebase.auth();
const db = firebase.firestore();

export const getUser = dispatch => {
  // User loading
  dispatch(userLoading());
  auth.onAuthStateChanged(user => {
    if (user) {
      const { uid, email } = user;
      db.collection('users')
        .doc(uid)
        .get()
        .then(user => {
          const { name, initials } = user.data();
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { uid, email, name, initials }
          });
        })
        .catch(err => {
          dispatch(returnErrors(err.message, err.code, 'AUTH_FAIL'));
          dispatch({
            type: 'AUTH_FAIL'
          });
        });
    } else {
      dispatch({
        type: 'AUTH_FAIL'
      });
    }
  });
};

export const register = (user, dispatch) => {
  const { name, email, password } = user;
  // User loading
  dispatch(userLoading());
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db
        .collection('users')
        .doc(cred.user.uid)
        .set({
          name: name,
          initials: name
            .split(' ')
            .map((w, i, n) => (i === 0 || i + 1 === n.length ? w[0] : null))
            .join('')
        });
    })
    .then(() => {
      dispatch({
        type: 'REGISTER_SUCCESS'
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
    .then(() => {
      dispatch({
        type: 'LOGIN_SUCCESS'
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
