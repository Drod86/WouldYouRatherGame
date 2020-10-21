import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { generatePassword } from '../utils/_DATA'
import { handleAuthedUser } from '../actions/authedUser'
import { handleNewUser } from '../actions/users'
import '../index.css';

class Login extends Component {
	state = {
		display: 'none',
		displayRegister: 'none',
		newUser: {
			firstName: '',
			lastName: '',
			password: '',
			avatarUrl: ''
		},
		confirmPassword: ''
	}

	changeDisplay = (field, display) => {
		switch(field) {
			case 'display':
				return display === ''
				? this.setState(prevState => ({
					display: 'none',
					displayRegister: ''
					}))
				: this.setState(prevState => ({
					display: '',
					displayRegister: 'none'
					}))
			case 'displayRegister':
				return display === ''
				? this.setState(prevState => ({
					display: '',
					displayRegister: 'none'
					}))
				: this.setState(prevState => ({
					display: 'none',
					displayRegister: ''
					}))
			default :
				return this.setState(prevState => ({
					display: '',
					displayRegister: 'none'
				}))
		}
	}

	changeDisplayTwo = () => {
		this.state.display === 'none'
			? this.setState(prevState => ({
				display: '',
				displayRegister: 'none'
			  }))
			: this.state.displayRegister === 'none'
				? this.setState(prevState => ({
					display: '',
					displayRegister: ''
				  }))
				: this.setState(prevState => ({
					display: '',
					displayRegister: 'none'
				}))
	}

	authedUser = (authedUser, form) => {
		let username = authedUser.firstName.toLowerCase().concat(authedUser.lastName.toLowerCase())
		let user = { username: username, password: generatePassword(authedUser.password)}
		const { firstName, lastName, password } = this.state.newUser

		 firstName !== '' || lastName !== '' || password !== ''
			? form === 'login'
				? this.props.dispatch(handleAuthedUser(user))
				: password === this.state.confirmPassword
					? this.props.dispatch(handleNewUser(authedUser))
					: alert('Password entries do not match. Please try again.')
			: alert('Please complete required fields.')

	}

	collectInput = (field, text) => {
		switch(field) {
			case 'firstName':
				this.setState((curState) => ({
					newUser: {...curState.newUser,
						...{firstName: text}
					}
				}))
				break;
			case 'lastName':
				this.setState((curState) => ({
					newUser: {...curState.newUser,
						...{lastName: text}
					}
				}))
				break;
			case 'avatarUrl':
				this.setState((curState) => ({
					newUser: {...curState.newUser,
						...{avatarUrl: text}
					}
				}))
				break;
			case 'password':
				this.setState((curState) => ({
					newUser: {...curState.newUser,
						...{password: text}
					}
				}))
				break;
			case 'confirmPassword':
				this.setState((curState) => (
				 {...curState,
						...{confirmPassword: text}
					}
				))
				break;
			default:
				this.setState((curState) => ({
					curState
				}))
		}
	}

	render(){
		const { display, displayRegister, newUser } = this.state
		const { to } = this.props
		const paths = ['/', '/polls', '/add', '/leaderboard', '/question', '/register']
		const { from } = to.state || { from : { pathname: '/' } }
		const authedUser = {firstName: newUser.firstName, lastName: newUser.lastName, password: newUser.password}
		return(
			<div className='Login'>
				<h1 className='wouldYouRather' style={{display: display === 'none' && displayRegister === 'none' ? '' : 'none', marginTop: '10vh'}}>Would You Rather...</h1>
					<div className='loginForm' style={{display: display}}>
						<h1 className='wouldYouRather'>Would You Rather...</h1>
						<h3>{displayRegister === 'none' ? 'Login' : 'Register'}</h3>
		                <input placeholder='First Name' type='text' onChange={e => this.collectInput('firstName', e.target.value)} name='firstName' required/>
		                <input placeholder='Last Name' type='text' onChange={e => this.collectInput('lastName', e.target.value)} name='LastName' required/>
		                <input placeholder='Avatar URL (optional)' type='text' onChange={e => this.collectInput('avatarUrl', e.target.value)} name='avatarUrl' style={{display: displayRegister}}/>
		                <input placeholder='Password' type='text' onChange={e => this.collectInput('password', e.target.value)} name='password' required/>
		                <input placeholder='Confirm Password' type='text' onChange={e => this.collectInput('confirmPassword', e.target.value)} name='confirmPassword' style={{display: displayRegister}} required/>
						{paths.includes(from.pathname)
							? <button className='loginBtn' onClick={e => this.authedUser(authedUser, 'login')} style={{display: displayRegister === '' ? 'none' : ''}}><Link to={from}>Login</Link></button>
							: <button className='loginBtn' onClick={e => this.authedUser(authedUser, 'login')} style={{display: displayRegister === '' ? 'none' : ''}}><Redirect to='/'>Login</Redirect></button>
						}
						<Link to='/howto'>
		                <button className='loginBtn' onClick={() => this.authedUser(newUser, 'register')} style={{display: displayRegister}}>Register</button></Link>
					</div>
				<h1 className='or' style={{ display: display }} >--or--</h1>
            	<button className='loginBtn' onClick={() => this.changeDisplayTwo()}>{display === 'none' ? 'Login?' : displayRegister === 'none' ? 'Register' : 'Login'}</button>
			</div>
		)
	}
}

function mapStateToProps({ users }){
	return {
		users: users,
		userIds: Object.keys(users)
	}
}

export default connect(mapStateToProps)(Login)