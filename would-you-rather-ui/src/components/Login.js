import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { handleNewUser } from '../actions/users'

class Login extends Component {
	state = {
		display: 'none',
		authedUser: '',
		newUser: {
			firstName: '',
			lastName: '',
			password: '',
			avatarUrl: ''
		}
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
		const { display, newUser } = this.state
		const { to, users, userIds, dispatch } = this.props
		const paths = ['/', '/polls', '/add', '/leaderboard', '/question', '/register']
		const { from } = to.state || { from : { pathname: '/' } }
		return(
			<div className='page' >
				<h1>Would You Rather...</h1>
				<div>
				<button onClick={() => this.display(display)}>Login?</button>
				<ul className='userDropDown' style={{display: display}}>
					{userIds.map(user => (
						paths.includes(from.pathname)
						? <li key={user} onClick={e => this.authedUser(user)}><Link to={from}>{users[user].name}</Link></li>
						: <li key={user} onClick={e => this.authedUser(user)}><Redirect to='/'>{users[user].name}</Redirect></li>
						)
					)}
				</ul>
				</div>
					<div className='pages' style={{display: display}}>
	                <h3>Register</h3>
	                <h4>First Name</h4>
	                <input placeholder='First Name' type='text' onChange={e => this.collectInput('firstName', e.target.value)} name='firstName'/>
	                <h4>Last Name</h4>
	                <input placeholder='Last Name' type='text' onChange={e => this.collectInput('lastName', e.target.value)} name='LastName'/>
	                <h4>Avatar URL</h4>
	                <input placeholder='optional' type='text' onChange={e => this.collectInput('avatarUrl', e.target.value)} name='avatarUrl'/>
	                <h4>Password</h4>
	                <input placeholder='Last Name' type='text' onChange={e => this.collectInput('password', e.target.value)} name='password'/>
	                <Link to='/howto'>
	                <button onClick={() => dispatch(handleNewUser(newUser))}>Register</button></Link>
            	</div>
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