import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import Question from './Question'
import PrivateRoute from './PrivateRoute'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect
} from 'react-router-dom'

class App extends Component {

	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}

	render() {
		console.log('testing', this.props)
		const ranNum = () => {
			return Math.floor(Math.random() * this.props.questionIds.length)
		}

	 	return (
		    <Router>
		    	{this.props.loading
		    		? '...loading'
		    		: <div>
						<Route path='/login' component={LandingPage} />
					 	<PrivateRoute path='/' render={() => <Dashboard user={this.props.authedUser} />} />
					  </div>
				}
		    </Router>
		)
	}
}

function mapStateToProps ({ authedUser, users, questions }) {
	return {
		loading: Object.keys(questions).length === 0 || Object.keys(questions).length === 0 || authedUser !== null,
		authedUser,

	}
}

export default connect(mapStateToProps)(App)
