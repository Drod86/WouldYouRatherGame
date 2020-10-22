import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import Dashboard from './Dashboard'
import Question from './Question'
import PrivateRoute from './PrivateRoute'
import '../index.css';
import {
	BrowserRouter as Router,
	Switch,
	Link
} from 'react-router-dom'

class App extends Component {
	state = {
		display: '',
		size: true
	}

	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}

	changeDisplay (arg) {
		return arg === 'none'
		? this.setState({display: ''})
		: this.setState({display: 'none'})
	}
	changSize () {
		this.setState((curState) => ({
			size: false
		}))
	}

	render(){
		const { display, size } = this.state
		const { authedUser, dispatch } = this.props
		return(
			<Router >
				<div className='App'>
					<div style={{display: display}} className='center' onClick={() => this.changSize()}>
						<Switch>
							<PrivateRoute path='/' component={Dashboard} isAuthenticated={authedUser} />
						</Switch>
						<Link to='/'><button onClick={() => dispatch(setAuthedUser(null))} style={{display: authedUser === null && 'none'}}>Sign Out</button></Link>
					</div>
					<div className='App2' style={{height: size && '35vh'}}>
						<h3 className='or' style={{display: authedUser === null ? display : 'none'}}>--or--</h3>
						<Question className='question' display={!display} />
						<button className='loginBtn' onClick={() => this.changeDisplay(display)} style={{display: authedUser === null ? display : 'none', backgroundColor: '#fbae00'}}>Quick Play?</button>
						<button className='loginBtn' onClick={() => this.changeDisplay(display)} style={{display: display === 'none' ? '' : 'none'}}>Final Answer</button>
					</div>
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