import firebase from '../config/firebaseConfig';
const db = firebase.firestore();

export const getData = dispatch => {
  db.collection('projects')
    .get()
    .then(snapshot => {
      const projects = snapshot.docs.map(doc => {
        let project = doc.data();
        project.id = doc.id;
        return project;
      });
      dispatch({
        type: 'GET_DATA',
        payload: projects
      });
    })
    .catch(err => console.log(err.message));
};
