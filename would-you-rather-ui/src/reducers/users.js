import { RECEIVE_USERS, ADD_USER_ANSWER } from '../actions/users'

export default function users (state = {}, action) {
	switch(action.type) {
		case RECEIVE_USERS :
			return {
				...state,
				...action.users
			}
		case ADD_USER_ANSWER :
			return {
				...state,
				[action.uId]: {
					...state.[action.uId],
					answers: {
						...state.[action.uId].answers,
						[action.qId]: action.opt
					}
				}
			}
		default :
			return state
	}
}
