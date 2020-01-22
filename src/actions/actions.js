import firebase from '../config/firebaseConfig';
const db = firebase.firestore();
let unsubscribe;

export const startListener = (projects, dispatch) => {
  unsubscribe = db.collection('projects').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      if (change.type === 'added') {
        let project = change.doc.data();
        project.id = change.doc.id;
        projects.push(project);
      } else if (change.type === 'removed') {
        projects.filter(prj => {
          if (prj.id.toString() !== change.doc.id.toString())
            console.log('different');
          return prj.id.toString() !== change.doc.id.toString();
        });
      }
    });

    console.log(projects);
    dispatch({
      type: 'GET_PROJECTS',
      payload: projects
    });
  });
};

export const stopListener = () => {
  if (unsubscribe) unsubscribe();
};

export const getProjects = dispatch => {
  db.collection('projects')
    .get()
    .then(snapshot => {
      const projects = snapshot.docs.map(doc => {
        let project = doc.data();
        project.id = doc.id;
        return project;
      });
    })
    .catch(err => console.log(err.message));
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
        type: 'DELETE_PROJECT',
        payload: id
      });
    })
    .catch(err => console.log(err.message));
};
