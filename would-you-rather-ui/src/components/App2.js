import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import Question from './Question'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect
} from 'react-router-dom'

class App extends Component {

	state = {
		display: 'none',
		authedUser: ''
	}

	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}

	display = (display) => {
		switch(display) {
			case '' :
				return this.setState(prevState => ({
				display: 'none'
				}))
			default :
				return this.setState(prevState => ({
					display: ''
				}))
		}
	}

	authedUser = (user) => {
		this.setState({
			authedUser: user
		})
		this.display(this.state.display)
		this.props.dispatch(setAuthedUser(user))
	}

	render() {

		const ranNum = () => {
			return Math.floor(Math.random() * this.props.questionIds.length)
		}

	 	return (
		    <Router>
				<div className='page' >
				<h1>Would You Rather...</h1>
				<button onClick={() => this.display(this.state.display)}>Login?</button>
				<ul className='userDropDown' style={{display: this.state.display}}>
					{this.props.usersIds.map(user => <li key={user} onClick={e => this.authedUser(user)}>{this.props.users[user].name}</li>)}
				</ul>
				<h3 className="or">--or--</h3>
				<Link to='/question' className='quick-play'>
				<button>Quick Play?</button>
				</Link>
			</div>

		    </Router>
		)
	}
}

function mapStateToProps ({ authedUser, questions }) {
	return {
		loading: authedUser === null,
		questionIds: Object.keys(questions),
		users: users,
		usersIds: Object.keys(users)
	}
}

export default connect(mapStateToProps)(App)
