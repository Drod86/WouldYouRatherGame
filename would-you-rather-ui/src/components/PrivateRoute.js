import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest }) => {
	return(
		<Route {...rest} render={(props) => (
			props.authedUser !== null
				? <Component {...props} />
				: <Redirect to='/login' />
		)}/>
	)
}

export default PrivateRoute;