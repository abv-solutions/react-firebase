import moment from 'moment'
import firebase from '../config/firebaseConfig'
import { returnErrors } from './errorActions'
import { createLog } from './logActions'

const storage = firebase.storage()
const auth = firebase.auth()
const db = firebase.firestore()

export const uploadFile = async (file, id, dispatch) => {
	try {
		let found = false
		const time = moment().format('DD-MM-YY_H-mm-ss')
		// Check for file names
		const doc = await db.collection('projects').doc(id).get()
		const { files } = doc.data()
		files &&
			files.forEach(({ fileName }) => {
				if (fileName === file.name) {
					found = true
				}
			})
		// If not found, add to storage
		found
			? dispatch(
					returnErrors(
						'This project already has a file with that name.',
						'storage/duplicate'
					)
			  )
			: storage
					.ref(`projects/${time}_${file.name}`)
					.put(file)
					.on(
						'state_changed',
						(snap) => {
							let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
							dispatch({
								type: 'UPLOAD_FILE',
								payload: percentage,
							})
						},

						(err) => {
							dispatch({
								type: 'UPLOAD_FILE',
								payload: 0,
							})
							dispatch(returnErrors(err.message, err.code))
						},

						async () => {
							const { displayName } = auth.currentUser
							// Get file url
							const url = await storage
								.ref('projects')
								.child(`${time}_${file.name}`)
								.getDownloadURL()
							// Add file to project
							await db
								.collection('projects')
								.doc(id)
								.update({
									files: firebase.firestore.FieldValue.arrayUnion({
										fileName: file.name,
										storageName: `${time}_${file.name}`,
										url: url,
									}),
								})
							// File was uploaded
							dispatch({
								type: 'UPLOAD_COMPLETE',
								payload: url,
							})
							// Reset percentage
							dispatch({
								type: 'UPLOAD_FILE',
								payload: 0,
							})
							// Create log
							dispatch(createLog(displayName, 'Uploaded a new file', dispatch))
						}
					)
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}
