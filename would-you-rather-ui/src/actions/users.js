import { saveUser, saveAnswer } from '../utils/api'
import { setAuthedUser } from './authedUser'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_NEW_USER = 'ADD_NEW_USER'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function receiveUsers (users) {
	return {
		type: RECEIVE_USERS,
		users,
	}
}

function addNewUser (user) {
    return {
        type: ADD_NEW_USER,
        user
    }
}

export function handleNewUser ({firstName, lastName, password, avatarUrl}) {
    return (dispatch, getState) => {
        const { users } = getState()
        const info = { firstName: firstName, lastName: lastName, password: password, avatarUrl: avatarUrl === '' ? 'https://flyclipart.com/thumb2/user-profile-avatar-login-account-png-icon-free-download-935697.png' : avatarUrl }
        return saveUser(info)
            .then((user) => {
                Object.keys(users).includes(user.id)
                    ? alert('A User by this name already exists. Please try logging in or add a number to your last name to register a new user.')
                    : password.length >= 8
                        ? dispatch(addNewUser(user)) && dispatch(setAuthedUser(user.id))
                        : alert('password must be 8 characters long. Please try again.')
            })
            .catch((e) => {
                alert(`User not saved, please submit again. ${e}`)
            })
    }
}

export function addUserAnswer (authedUser, qid, answer) {
	return {
		type: ADD_USER_ANSWER,
		authedUser,
		qid,
		answer
	}
}

export function handleAnswer (qid, answer) {
    return (dispatch, getState) => {
    	const { authedUser } = getState()
        return saveAnswer({
        	authedUser: authedUser,
        	qid: qid,
        	answer: answer
        	})
        	.then(() => {
                dispatch(addUserAnswer(authedUser, qid, answer))
            })
            .catch((e) => {
                alert(`Answer not saved, please submit again. ${e}`)
            })
    }
}
