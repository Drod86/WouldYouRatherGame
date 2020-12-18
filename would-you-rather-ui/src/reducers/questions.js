import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
import { ADD_USER_ANSWER } from '../actions/users'

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION :
			const { question } = action
			return {
				...state,
				[question.id] : question
			}
		case ADD_USER_ANSWER :
			return {
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: [
							...state[action.qid][action.answer].votes,
							action.authedUser
						]
					}
				}

			}
		default :
			return state
	}
}