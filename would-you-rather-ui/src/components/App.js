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
	Link,
	useRouteMatch,
	useParams,
	Redirect
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
		return(
			<Router>
				<div style={{display: this.state.display}}>
					<Switch>
						<PrivateRoute path='/' component={Dashboard} isAuthenticated={this.props.authedUser} />
						<Route exact path='/question'>
							<Question />
						</Route>
					</Switch>
					<Link to='/'><button onClick={() => this.props.dispatch(setAuthedUser(null))} style={{display: this.props.authedUser === null && 'none'}}>Sign Out</button></Link>

				</div>
				<Question display={!this.state.display} changeDisplay={this.changeDisplay} />
				<button onClick={() => this.changeDisplay(this.state.display)} style={{display: this.props.authedUser === null ? this.state.display : 'none'}}>Quick Play?</button>
				<button onClick={() => this.changeDisplay(this.state.display)} style={{display: this.state.display === 'none' ? '' : 'none'}}>Final Answer</button>
			</Router>
		)
	}
}

function mapStateToProps ({ authedUser, users, questions }) {
	return {
		loading: Object.keys(questions).length === 0 || Object.keys(questions).length === 0,
		authedUser,
	}
}

export default connect(mapStateToProps)(App)