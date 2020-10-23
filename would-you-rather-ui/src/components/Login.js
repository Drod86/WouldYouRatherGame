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
		confirmPassword: '',
		showPassword: false
	}

	toggleShowPassword = (state) => {
		this.setState({
				showPassword: !state
		})
	}

	resetFields = (fields) => {
		switch (fields) {
			case 'password' :
				this.setState((curState) => ({
						newUser: {...curState.newUser,
							...{password: ''}
						},
						confirmPassword: ''
					}));
				alert('Password entries do not match. Please try again.')
				break;
			default :
				this.setState((curState) => ({
						newUser: {
							firstName: '',
							lastName: '',
							password: '',
							avatarUrl: ''
						},
						confirmPassword: '',
						showPassword: false
					}));
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
		this.resetFields()
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
					: this.resetFields('password')
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
		const { display, displayRegister, newUser, showPassword } = this.state
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
		                <input placeholder='First Name' type='text' value={this.state.newUser.firstName} onChange={e => this.collectInput('firstName', e.target.value)} name='firstName' required/>
		                <input placeholder='Last Name' type='text' value={this.state.newUser.lastName} onChange={e => this.collectInput('lastName', e.target.value)} name='LastName' required/>
		                <input placeholder='Avatar URL (optional)' type='text' value={this.state.newUser.avatarUrl} onChange={e => this.collectInput('avatarUrl', e.target.value)} name='avatarUrl' style={{display: displayRegister}}/>
		                <input placeholder='Password' type={showPassword ? 'text' : 'password'} value={this.state.newUser.password} onChange={e => this.collectInput('password', e.target.value)} name='password' required/>
		                <input placeholder='Confirm Password' type={showPassword ? 'text' : 'password'} value={this.state.confirmPassword} onChange={e => this.collectInput('confirmPassword', e.target.value)} name='confirmPassword' style={{display: displayRegister}} required/>
						<button className='passwordBtn' onClick={() => this.toggleShowPassword(showPassword)}>{this.state.showPassword === true ? 'hide password' : 'show password'}</button>
						{paths.includes(from.pathname)
							? <button className='loginBtn' onClick={e => this.authedUser(authedUser, 'login')} style={{display: displayRegister === '' ? 'none' : '', backgroundColor: '#ff4181'}}><Link to={from}>Login</Link></button>
							: <button className='loginBtn' onClick={e => this.authedUser(authedUser, 'login')} style={{display: displayRegister === '' ? 'none' : '', backgroundColor: '#ff4181'}}><Redirect to='/'>Login</Redirect></button>
						}
						<Link to='/howto'>
		                <button className='loginBtn' onClick={() => this.authedUser(newUser, 'register')} style={{display: displayRegister, backgroundColor: '#0090f0'}}>Register</button></Link>
					</div>
				<h1 className='or' style={{ display: display }} >--or--</h1>
            	<button className='loginBtn' onClick={() => this.changeDisplayTwo()} style={{backgroundColor: display === 'none' ? '#ff4181' : displayRegister === 'none' ? '#0090f0' : '#ff4181'}}>{display === 'none' ? 'Login?' : displayRegister === 'none' ? 'Register' : 'Login'}</button>
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