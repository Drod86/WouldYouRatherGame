import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAuthedUser, handleAuthedUser } from '../actions/authedUser'
import { handleNewUser } from '../actions/users'

class Login extends Component {
	state = {
		display: 'none',
		displayRegister: 'none',
		newUser: {
			firstName: '',
			lastName: '',
			password: '',
			avatarUrl: ''
		}
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

	authedUser = (authedUser) => {
		let username = authedUser.firstName.concat(authedUser.lastName)
		let user = { username: username, password: authedUser.password}

		this.props.dispatch(handleAuthedUser(user))
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
			default:
				this.setState((curState) => ({
					curState
				}))
		}
	}

	render(){
		const { display, displayRegister, newUser } = this.state
		const { to, users, userIds, dispatch } = this.props
		const paths = ['/', '/polls', '/add', '/leaderboard', '/question', '/register']
		const { from } = to.state || { from : { pathname: '/' } }
		const authedUser = {firstName: newUser.firstName, lastName: newUser.lastName, password: newUser.password}
		console.log(display)
		return(
			<div className='page' >
				<h1>Would You Rather...</h1>
				<div>
				<div className='Login' style={{display: display}}>
				<h4>First Name</h4>
	                <input placeholder='First Name' type='text' onChange={e => this.collectInput('firstName', e.target.value)} name='firstName' required/>
	                <h4>Last Name</h4>
	                <input placeholder='Last Name' type='text' onChange={e => this.collectInput('lastName', e.target.value)} name='LastName' required/>
	                <h4>Password</h4>
	                <input placeholder='Password' type='text' onChange={e => this.collectInput('password', e.target.value)} name='password' required/>
				{paths.includes(from.pathname)
					? <button onClick={e => this.authedUser(authedUser)}><Link to={from}>Login</Link></button>
					: <button onClick={e => this.authedUser(authedUser)}><Redirect to='/'>Login</Redirect></button>
				}
				</div>
				</div>
				<div className='Register' style={{display: displayRegister}}>
	                <h3>Register</h3>
	                <h4>First Name</h4>
	                <input placeholder='First Name' type='text' onChange={e => this.collectInput('firstName', e.target.value)} name='firstName' required/>
	                <h4>Last Name</h4>
	                <input placeholder='Last Name' type='text' onChange={e => this.collectInput('lastName', e.target.value)} name='LastName' required/>
	                <h4>Avatar URL</h4>
	                <input placeholder='Optional' type='text' onChange={e => this.collectInput('avatarUrl', e.target.value)} name='avatarUrl'/>
	                <h4>Password</h4>
	                <input placeholder='Password' type='text' onChange={e => this.collectInput('password', e.target.value)} name='password' required/>
	                <Link to='/howto'>
	                <button onClick={() => dispatch(handleNewUser(newUser))}>Register</button></Link>
            	</div>
            	<button onClick={() => this.changeDisplay('display', display)}>{displayRegister === '' ? 'Login' : display === 'none' ? 'Login?' : 'Register'}</button>
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