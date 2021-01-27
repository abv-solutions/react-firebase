const functions = require('firebase-functions')
var admin = require('firebase-admin')

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	storageBucket: 'react-abv-solutions.appspot.com',
	databaseURL: 'https://react-abv-solutions.firebaseio.com',
})

const createLog = async (log) => {
	try {
		doc = await admin.firestore().collection('logs').add(log)
		console.log(`Log added - ${log.user}`)
		return doc
	} catch (err) {
		console.log(err)
		return null
	}
}

exports.projectCreated = functions.firestore
	.document('projects/{projectID}')
	.onCreate(async (doc) => {
		const project = doc.data()
		const log = {
			content: 'Added a new project',
			user: project.author,
			time: admin.firestore.FieldValue.serverTimestamp(),
		}
		return await createLog(log)
	})

exports.projectDeleted = functions.firestore
	.document('projects/{projectID}')
	.onDelete(async (doc) => {
		const project = doc.data()
		project.files &&
			project.files.forEach(async ({ storageName }) => {
				try {
					await admin
						.storage()
						.bucket()
						.file(`projects/${storageName}`)
						.delete()
				} catch (err) {
					console.log(err)
				}
			})
		const log = {
			content: 'Deleted a project',
			user: project.author,
			time: admin.firestore.FieldValue.serverTimestamp(),
		}
		return await createLog(log)
	})

exports.userRegistered = functions.firestore
	.document('users/{userID}')
	.onCreate(async (doc) => {
		const user = doc.data()
		const log = {
			content: 'Joined the club',
			user: `${user.firstName} ${user.lastName}`,
			time: admin.firestore.FieldValue.serverTimestamp(),
		}
		return await createLog(log)
	})

exports.userLoggedIn = functions.https.onCall(async (data, context) => {
	const name = context.auth.token.name || null
	if (name) {
		const log = {
			content: 'Is back',
			user: name,
			time: admin.firestore.FieldValue.serverTimestamp(),
		}
		return await createLog(log)
	}
	return null
})

exports.userDeleted = functions.auth.user().onDelete(async (user) => {
	const batch = admin.firestore().batch()
	try {
		await admin.firestore().collection('users').doc(user.uid).delete()
		const projects = await admin
			.firestore()
			.collection('projects')
			.where('authorID', '==', user.uid)
			.get()
		projects.forEach((doc) => batch.delete(doc.ref))
		await batch.commit()
	} catch (err) {
		console.log(err)
	}
	const log = {
		content: 'Left the party',
		user: user.displayName,
		time: admin.firestore.FieldValue.serverTimestamp(),
	}
	return await createLog(log)
})

exports.fileAdded = functions.storage.object().onFinalize(async (object) => {
	const log = {
		content: 'Was added',
		user: 'New file',
		time: admin.firestore.FieldValue.serverTimestamp(),
	}
	return await createLog(log)
})
