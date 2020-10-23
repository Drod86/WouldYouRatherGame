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
		size: true,
		loginOpen: false
	}

	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}

	changeDisplay (button) {
		console.log(button)
		switch (button) {
			case 'quick':
				this.state.loginOpen === false
					? this.setState({
						display: 'none',
						loginOpen: false,
						size: false
						})
					: this.setState({
						display: 'none',
						loginOpen: true,
						size: false
						})
				break;
			case 'final' :
				this.state.loginOpen === false
					? this.setState({
						display: '',
						loginOpen: false,
						size: true
						})
					: this.setState({
						display: '',
						loginOpen: true,
						size: false
					})
				break;
			case 'login' :
				this.setState({
					display: '',
					loginOpen: true,
					size: false
				})
				break;
			default :
				this.setState({
					display: '',
					loginOpen: false,
					size: true
					})
		}
	}

	signOut(){
		this.props.dispatch(setAuthedUser(null));
		this.changeDisplay()
	}


	render(){
		const { display, size } = this.state
		const { authedUser, dispatch } = this.props
		return(
			<Router >
				<div className='App' style={{width: authedUser !== null && '90vw'}}>
					<div style={{display: display}} className='center' onClick={() => this.changeDisplay('login')}>
						<Switch>
							<PrivateRoute path='/' component={Dashboard} isAuthenticated={authedUser} />
						</Switch>

					</div>
					<Link to='/'><button onClick={() => this.signOut()} style={{display: authedUser === null && 'none'}}>Sign Out</button></Link>
					<div className='App2' style={{height: size && '35vh'}}>
						<h3 className='or' style={{display: authedUser === null ? display : 'none'}}>--or--</h3>
						<Question className='question' display={!display} />
						<button className='loginBtn' onClick={() => this.changeDisplay('quick')} style={{display: authedUser === null ? display : 'none', backgroundColor: '#fbae00'}}>Quick Play?</button>
						<button className='loginBtn' onClick={() => this.changeDisplay('final')} style={{display: display === 'none' ? '' : 'none', backgroundColor: '#fbae00'}}>Final Answer</button>
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