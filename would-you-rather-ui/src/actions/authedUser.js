export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
	return {
		type: SET_AUTHED_USER,
		id,
	}
}

export function handleAuthedUser ({username, password}) {
    return (dispatch, getState) => {
        const { users } = getState()
        const user = { username: username, password: password }
        Object.keys(users).includes(user.username)
            ? users[user.username].password === user.password
            	? dispatch(setAuthedUser(user.username))
            	: alert('User name or password is incorrect. Please try again or register.')
            : alert('User name or password is incorrect. Please try again or register.')

    }
}