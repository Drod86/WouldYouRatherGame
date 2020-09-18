import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'

class App extends Component {
	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}
	render() {
	  return (
	    <div className="App">
	    	{this.props.loading === true
	    		? <LandingPage />
	    		: <Dashboard />
	    	}
	    </div>
	  )
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)
