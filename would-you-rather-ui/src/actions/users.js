export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function receiveUsers (users) {
	return {
		type: RECEIVE_USERS,
		users,
	}
}

export function addUserAnswer (uId, qId, opt) {
	return {
		type: ADD_USER_ANSWER,
		uId,
		qId,
		opt
	}
}