import {saveAnswer} from '../utils/api'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function receiveUsers (users) {
	return {
		type: RECEIVE_USERS,
		users,
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
                alert(`Answer not saved, submit again. ${e}`)
            })
    }
}
