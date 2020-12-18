import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import Dashboard from './Dashboard'
import Login from './Login'
import '../index.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'

class App extends Component {

	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	signOut() {
		this.props.dispatch(setAuthedUser(null));
	}


	render(){
		const { authedUser } = this.props
		return(
			<Router>
				<div className='App'>
					<Switch>
						{authedUser === null ? <Route component={Login} /> : <Route component={Dashboard} />}
					</Switch>
					<button onClick={() => this.signOut()} id='signOut' style={{display: authedUser === null ? 'none' : ''}}>Sign Out</button>
				</div>
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