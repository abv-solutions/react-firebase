const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createLog = log => {
  admin
    .firestore()
    .collection('logs')
    .add(log)
    .then(() => console.log('Log added'))
    .catch(err => console.log(err));
};

exports.projectCreated = functions.firestore
  .document('projects/{projectID}')
  .onCreate(doc => {
    const project = doc.data();
    const log = {
      content: 'Added a new project',
      user: project.author,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    createLog(log);
    return true;
  });

exports.userRegistered = functions.firestore
  .document('users/{userID}')
  .onCreate(doc => {
    const newUser = doc.data();
    const log = {
      content: 'Joined the club',
      user: newUser.name,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    createLog(log);
    return true;
  });
