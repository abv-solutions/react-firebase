import firebase from '../config/firebaseConfig';
const db = firebase.firestore();

export const getLogs = (logs, dispatch) => {
  try {
    // Logs loading
    dispatch(logsLoading());
    db.collection('logs')
      .orderBy('time')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          // Add change
          if (change.type === 'added') {
            let log = change.doc.data();
            log.id = change.doc.id;
            logs.unshift(log);
          }
        });
        logs = logs.slice(0, 5);
        dispatch({
          type: 'GET_LOGS',
          payload: logs
        });
      });
  } catch (err) {
    console.log(err.message);
  }
};

// Set loading flag - used locally
export const logsLoading = () => {
  return { type: 'LOGS_LOADING' };
};
