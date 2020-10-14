import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
	state = {
		display: 'none',
		authedUser: '',
		redirectToReferrer: false
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
		this.setState(() => ({
			redirectToReferrer: true
		}))
	}

	render(){
		const { from } = this.props.to.state || { from : { pathname: '/' } }

		return(
			<div className='page' >
				<h1>Would You Rather...</h1>
				<button onClick={() => this.display(this.state.display)}>Login?</button>
				<ul className='userDropDown' style={{display: this.state.display}}>
					{this.props.usersIds.map(user => <li key={user} onClick={e => this.authedUser(user)}><Link to={from}>{this.props.users[user].name}</Link></li>)}
				</ul>
				<h3 className="or">--or--</h3>
			</div>
		)
	}
}

function mapStateToProps({ users }){
	return {
		users: users,
		usersIds: Object.keys(users)
	}
}

export default connect(mapStateToProps)(Login)