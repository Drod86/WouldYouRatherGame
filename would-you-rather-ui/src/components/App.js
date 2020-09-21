import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import Question from './Question'
import { Route } from 'react-router-dom'

class App extends Component {
	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}
	render() {
		const ranNum = () => {
			return Math.floor(Math.random() * this.props.questionIds.length)
		}
	  return (
	    <div className="App">
	    <Route path='/question' render={() => <Question num={ranNum()} />} />
		<Route exact path='/' render={() => (
		    	this.props.loading === true
		    		? <LandingPage />
		    		: <Dashboard user={this.props.authedUser} />
		 )} />
		<Route path='/polls' component={Dashboard} />
		<Route path='/add' component={Dashboard} />
		<Route path='/leaders' component={Dashboard} />
	    </div>
	  )
	}
}

function mapStateToProps ({ authedUser, questions }) {
	return {
		loading: authedUser === null,
		questionIds: Object.keys(questions)
	}
}

export default connect(mapStateToProps)(App)
