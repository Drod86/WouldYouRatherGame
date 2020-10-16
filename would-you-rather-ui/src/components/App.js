import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import Login from './Login'
import Dashboard from './Dashboard'
import Question from './Question'
import PrivateRoute from './PrivateRoute'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

class App extends Component {
	state = {
		display: ''
	}

	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}

	changeDisplay (arg) {
		return arg === 'none'
		? this.setState({display: ''})
		: this.setState({display: 'none'})
	}

	render(){
		const { display } = this.state
		const { authedUser, dispatch } = this.props
		return(
			<Router>
				<div style={{display: display}}>
					<Switch>
						<PrivateRoute path='/' component={Dashboard} isAuthenticated={authedUser} />
					</Switch>
					<Link to='/'><button onClick={() => dispatch(setAuthedUser(null))} style={{display: authedUser === null && 'none'}}>Sign Out</button></Link>
				</div>
				<Question display={!display} />
				<button onClick={() => this.changeDisplay(display)} style={{display: display}}>Quick Play?</button>
				<button onClick={() => this.changeDisplay(display)} style={{display: display === 'none' ? '' : 'none'}}>Final Answer</button>
			</Router>
		)
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser,
	}
}

export default connect(mapStateToProps)(App)