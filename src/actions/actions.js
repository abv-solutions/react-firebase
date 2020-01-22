import firebase from '../config/firebaseConfig';
const db = firebase.firestore();

export const getProjects = (projects, dispatch) => {
  try {
    db.collection('projects').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let project = change.doc.data();
          project.id = change.doc.id;
          projects.push(project);
        } else if (change.type === 'removed') {
          projects = projects.filter(project => project.id !== change.doc.id);
        }
      });
      dispatch({
        type: 'GET_PROJECTS',
        payload: projects
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const createProject = (project, dispatch) => {
  db.collection('projects')
    .add({
      ...project
    })
    .then(() => {
      dispatch({
        type: 'CREATE_PROJECT'
      });
    })
    .catch(err => console.log(err.message));
};

export const deleteProject = (id, dispatch) => {
  db.collection('projects')
    .doc(id)
    .delete()
    .then(() => {
      dispatch({
        type: 'DELETE_PROJECT'
      });
    })
    .catch(err => console.log(err.message));
};
