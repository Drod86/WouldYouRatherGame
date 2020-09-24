import { RECEIVE_USERS, ADD_USER_ANSWER } from '../actions/users'
import { ADD_QUESTION } from '../actions/questions'
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
				[action.authedUser]: {
					...state[action.authedUser],
					answers: {
						...state[action.authedUser].answers,
						[action.qid]: action.answer
					}
				}
			}
		case ADD_QUESTION :
			const { question } = action
			return {
				...state,
				[question.author]: {
					...state[question.author],
					questions: [
						...state[question.author].questions,
						question.id
					]
				}
			}
		default :
			return state
	}
}
