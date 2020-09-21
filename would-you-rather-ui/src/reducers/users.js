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
				users: {
					...state.users,
				[action.uId] : {
						...state.users.[action.uId],
						answers: {
							...state.users.[action.uId].answers, ...action.answers
						}
					}
				}
			}
		default :
			return state
	}
}
