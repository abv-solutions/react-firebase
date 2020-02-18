const functions = require('firebase-functions');
var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-abv-solutions.firebaseio.com'
});

const createLog = async log => {
  try {
    await admin
      .firestore()
      .collection('logs')
      .add(log);
    console.log('Log added');
  } catch (err) {
    console.log(err);
  }
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
    return null;
  });

exports.projectDeleted = functions.firestore
  .document('projects/{projectID}')
  .onDelete(doc => {
    const project = doc.data();
    const log = {
      content: 'Deleted a project',
      user: project.author,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    createLog(log);
    return null;
  });

exports.userRegistered = functions.firestore
  .document('users/{userID}')
  .onCreate(doc => {
    const user = doc.data();
    const log = {
      content: 'Joined the club',
      user: `${user.firstName} ${user.lastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    createLog(log);
    return null;
  });

exports.userLoggedIn = functions.https.onCall((data, context) => {
  const name = context.auth.token.name || null;
  if (name) {
    const log = {
      content: 'Is back',
      user: name,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    createLog(log);
  }
  return null;
});

exports.fileAdded = functions.storage.object().onFinalize(object => {
  const log = {
    content: 'Was added',
    user: 'New file',
    time: admin.firestore.FieldValue.serverTimestamp()
  };
  createLog(log);
  return null;
});
