import firebase from '../config/firebaseConfig';
const auth = firebase.auth();

export const loadUser = dispatch => {
  try {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { uid, email } = user;
        dispatch({
          type: 'USER_LOADED',
          payload: { uid, email }
        });
      } else {
        dispatch({
          type: 'AUTH_ERROR'
        });
      }
    });
    unsubscribe();
  } catch (err) {
    console.log(err.message);
  }
};

export const register = (user, dispatch) => {
  const { email, password } = user;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const { uid, email } = cred.user;
      dispatch({
        type: 'REGISTER',
        payload: { uid, email }
      });
    })
    .catch(err => console.log(err.message));
};

export const login = (user, dispatch) => {
  const { email, password } = user;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      const { uid, email } = cred.user;
      dispatch({
        type: 'LOGIN',
        payload: { uid, email }
      });
    })
    .catch(err => console.log(err.message));
};

export const logout = dispatch => {
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: 'LOGOUT'
      });
    })
    .catch(err => console.log(err.message));
};
