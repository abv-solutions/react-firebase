import firebase from '../config/firebaseConfig';
import { returnErrors } from './errorActions';

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

export const getUser = dispatch => {
  // User loading
  dispatch(userLoading());
  auth.onAuthStateChanged(async user => {
    try {
      if (user) {
        const { uid, email } = user;
        const doc = await db
          .collection('users')
          .doc(uid)
          .get();
        const { initials, firstName, lastName } = doc.data();
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            uid,
            email,
            name: `${firstName} ${lastName}`,
            initials
          }
        });
      } else {
        dispatch({
          type: 'AUTH_FAIL'
        });
      }
    } catch (err) {
      dispatch(returnErrors(err.message, err.code, 'AUTH_FAIL'));
      dispatch({
        type: 'AUTH_FAIL'
      });
    }
  });
};

export const register = async (user, dispatch) => {
  try {
    // User loading
    dispatch(userLoading());
    const { name, email, password } = user;
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    await db
      .collection('users')
      .doc(cred.user.uid)
      .set({
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[name.split(' ').length - 1],
        initials: name
          .split(' ')
          .map((w, i, n) => (i === 0 || i + 1 === n.length ? w[0] : null))
          .join('')
      });
    dispatch({
      type: 'REGISTER_SUCCESS'
    });
  } catch (err) {
    dispatch(returnErrors(err.message, err.code, 'REGISTER_FAIL'));
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

export const login = async (user, dispatch) => {
  try {
    // User loading
    dispatch(userLoading());
    const { email, password } = user;
    const callFunction = functions.httpsCallable('userLoggedIn');
    const cred = await auth.signInWithEmailAndPassword(email, password);
    cred.user.displayName && callFunction(cred.user.displayName);
    dispatch({
      type: 'LOGIN_SUCCESS'
    });
  } catch (err) {
    dispatch(returnErrors(err.message, err.code, 'LOGIN_FAIL'));
    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

export const logout = async dispatch => {
  try {
    await auth.signOut();
    dispatch({
      type: 'LOGOUT_SUCCESS'
    });
  } catch (err) {
    dispatch(returnErrors(err.message, err.code, 'LOGOUT_FAIL'));
    dispatch({
      type: 'LOGOUT_FAIL'
    });
  }
};

// Set loading flag - used locally
export const userLoading = () => {
  return {
    type: 'AUTH_LOADING'
  };
};
