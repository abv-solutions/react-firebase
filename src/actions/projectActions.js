import firebase from '../config/firebaseConfig';
const db = firebase.firestore();

export const getProjects = (projects, dispatch) => {
  try {
    // Projects loading
    dispatch(projectsLoading());
    db.collection('projects')
      .orderBy('title')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          // Add change
          if (change.type === 'added') {
            let project = change.doc.data();
            project.id = change.doc.id;
            projects.push(project);
          }
          // Edit change
          else if (change.type === 'modified') {
            let payload = change.doc.data();
            projects = projects.map(project =>
              project.id === change.doc.id
                ? {
                    ...project,
                    title: payload.title,
                    content: payload.content
                  }
                : project
            );
          }
          // Remove change
          else if (change.type === 'removed') {
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

export const createProject = async (project, dispatch) => {
  try {
    await db.collection('projects').add({
      ...project,
      createdAt: new Date()
    });
    dispatch({
      type: 'CREATE_PROJECT'
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const editProject = async (project, dispatch) => {
  try {
    const { id, title, content } = project;
    await db
      .collection('projects')
      .doc(id)
      .update({
        title,
        content
      });
    dispatch({
      type: 'EDIT_PROJECT',
      payload: project
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteProject = async (id, dispatch) => {
  try {
    await db
      .collection('projects')
      .doc(id)
      .delete();
    dispatch({
      type: 'DELETE_PROJECT'
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Set loading flag - used locally
export const projectsLoading = () => {
  return {
    type: 'PROJECTS_LOADING'
  };
};
