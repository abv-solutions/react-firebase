import firebase from '../config/firebaseConfig'
import { returnErrors } from './errorActions'
const db = firebase.firestore()

export const getLogs = (logs, dispatch) => {
	try {
		// Logs loading
		dispatch(logsLoading())
		db.collection('logs')
			.orderBy('time')
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					let log = change.doc.data()
					// Add change
					if (change.type === 'added') {
						log.id = change.doc.id
						logs.unshift(log)
					}
				})
				logs = logs.slice(0, 5)
				dispatch({
					type: 'GET_LOGS',
					payload: logs,
				})
			})
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}

export const createLog = async (name, content, dispatch) => {
	try {
		const log = {
			content: content,
			user: name,
			time: firebase.firestore.Timestamp.now(),
		}
		await db.collection('logs').add(log)
		dispatch({ type: 'CREATE_LOG' })
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}

// Set loading flag - used locally
export const logsLoading = () => {
	return { type: 'LOGS_LOADING' }
}
