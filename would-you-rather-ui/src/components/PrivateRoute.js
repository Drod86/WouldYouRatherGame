import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from './Login'

const PrivateRoute = ({ component: Component, ...rest }) => {
	return(
		<Route {...rest} render={(props) => (
			{...rest}.isAuthenticated !== null
			 ? <Component {...props} />
			 : <Login to={{
			 	pathname: '/login',
			 	state: { from: props.location }
			 }} />
		)} />
	)
}

export default PrivateRoute;