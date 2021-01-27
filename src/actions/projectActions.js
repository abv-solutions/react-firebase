import firebase from '../config/firebaseConfig'
import { returnErrors } from './errorActions'
import { createLog } from './logActions'

const storage = firebase.storage()
const auth = firebase.auth()
const db = firebase.firestore()

export const getProjects = (projects, dispatch) => {
	try {
		// Projects loading
		dispatch(projectsLoading())
		db.collection('projects')
			.orderBy('createdAt')
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					// Add change
					if (change.type === 'added') {
						let project = change.doc.data()
						project.id = change.doc.id
						projects.unshift(project)
					}
					// Edit change
					else if (change.type === 'modified') {
						let payload = change.doc.data()
						projects = projects.map((project) =>
							project.id === change.doc.id
								? {
										...project,
										title: payload.title,
										content: payload.content,
										files: payload.files,
								  }
								: project
						)
					}
					// Remove change
					else if (change.type === 'removed') {
						projects = projects.filter(
							(project) => project.id !== change.doc.id
						)
					}
				})
				dispatch({
					type: 'GET_PROJECTS',
					payload: projects,
				})
			})
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}

export const createProject = async (project, dispatch) => {
	try {
		const { displayName } = auth.currentUser
		await db.collection('projects').add({
			...project,
			createdAt: new Date(),
		})
		dispatch({ type: 'CREATE_PROJECT' })
		// Create log
		dispatch(createLog(displayName, 'Added a new project', dispatch))
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}

export const editProject = async (project, dispatch) => {
	try {
		const { id, title, content } = project
		await db.collection('projects').doc(id).update({
			title,
			content,
		})
		dispatch({
			type: 'EDIT_PROJECT',
			payload: project,
		})
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}

export const deleteProject = async (id, dispatch) => {
	try {
		const { displayName } = auth.currentUser
		const project = db.collection('projects').doc(id)
		const doc = await project.get()
		const { files } = doc.data()
		files &&
			files.forEach(
				async ({ storageName }) =>
					await storage.ref(`projects/${storageName}`).delete()
			)

		await project.delete()
		dispatch({ type: 'DELETE_PROJECT' })
		// Create log
		dispatch(createLog(displayName, 'Deleted a project', dispatch))
	} catch (err) {
		dispatch(returnErrors(err.message, err.code))
	}
}

// Set loading flag - used locally
export const projectsLoading = () => {
	return { type: 'PROJECTS_LOADING' }
}
