import firebase from '../config/firebaseConfig';
const db = firebase.firestore();

// Clear errors - used from components
export const getData = dispatch => {
  db.collection('projects')
    .get()
    .then(snapshot => {
      const projects = snapshot.docs.map(doc => doc.data());
      dispatch({
        type: 'GET_DATA',
        payload: projects
      });
    });
};
