import firebase from '../config/firebaseConfig'
import { returnErrors } from './errorActions'
import { createLog } from './logActions'

const storage = firebase.storage()
const auth = firebase.auth()
const db = firebase.firestore()
//const functions = firebase.functions();

export const getUser = (dispatch) => {
	// User loading
	dispatch(userLoading())
	auth.onAuthStateChanged(async (user) => {
		try {
			if (user) {
				const { uid, email } = user
				const doc = await db.collection('users').doc(uid).get()
				const { initials, firstName, lastName } = doc.data()
				dispatch({
					type: 'AUTH_SUCCESS',
					payload: {
						uid,
						email,
						name: firstName ? `${firstName} ${lastName}` : 'J. Doe',
						initials: initials ? initials : 'JD',
					},
				})
			} else {
				dispatch({ type: 'AUTH_FAIL' })
			}
		} catch (err) {
			dispatch(returnErrors(err.message, err.code))
			dispatch({ type: 'AUTH_FAIL' })
		}
	})
}

export const register = async (user, dispatch) => {
	try {
		// User loading
		dispatch(userLoading())
		const { name, email, password } = user
		const cred = await auth.createUserWithEmailAndPassword(email, password)
		await db
			.collection('users')
			.doc(cred.user.uid)
			.set({
				firstName: name.split(' ')[0],
				lastName: name.split(' ')[name.split(' ').length - 1],
				initials: name
					.split(' ')
					.map((w, i, n) => (i === 0 || i + 1 === n.length ? w[0] : null))
					.join(''),
			})
		await cred.user.updateProfile({ displayName: name })
		dispatch({ type: 'REGISTER_SUCCESS' })
		// Create log
		dispatch(createLog(name, 'Joined the club', dispatch))
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
		dispatch({ type: 'REGISTER_FAIL' })
	}
}

export const login = async (user, dispatch) => {
	try {
		// User loading
		dispatch(userLoading())
		const { email, password } = user
		//const userLoggedIn = functions.httpsCallable('userLoggedIn');
		const cred = await auth.signInWithEmailAndPassword(email, password)
		//userLoggedIn();
		dispatch({ type: 'LOGIN_SUCCESS' })
		// Create log
		dispatch(createLog(cred.user.displayName, 'Is back', dispatch))
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
		dispatch({ type: 'LOGIN_FAIL' })
	}
}

export const logout = async (dispatch) => {
	try {
		await auth.signOut()
		dispatch({ type: 'LOGOUT_SUCCESS' })
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
		dispatch({ type: 'LOGOUT_FAIL' })
	}
}

export const deleteUser = async (dispatch) => {
	try {
		const batch = db.batch()
		const { displayName, uid } = auth.currentUser
		const projects = await db
			.collection('projects')
			.where('authorID', '==', uid)
			.get()
		projects.forEach((doc) => {
			batch.delete(doc.ref)

			const { files } = doc.data()
			files &&
				files.forEach(
					async ({ storageName }) =>
						await storage.ref(`projects/${storageName}`).delete()
				)
			// Create log
			dispatch(createLog(displayName, 'Deleted a project', dispatch))
		})
		await batch.commit()
		await db.collection('users').doc(uid).delete()
		// Create log
		dispatch(createLog(displayName, 'Left the party', dispatch))

		await auth.currentUser.delete()
		dispatch({ type: 'DELETE_SUCCESS' })
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
		dispatch({ type: 'DELETE_FAIL' })
	}
}

// Set loading flag - used locally
export const userLoading = () => {
	return { type: 'AUTH_LOADING' }
}
