import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Link } from 'react-router-dom'

class LandingPage extends Component {
	state = {
		display: 'none',
		authedUser: ''
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
		return(
			<div className='page' >
				<h1>Would You Rather...</h1>
				<button onClick={() => this.display(this.state.display)}>Login?</button>
				<ul className='userDropDown' style={{display: this.state.display}}>
					{this.props.usersIds.map(user => <li key={user} onClick={e => this.authedUser(user)}>{this.props.users[user].name}</li>)}
				</ul>
				<h3 className="or">--or--</h3>
				<Link
					to='/question'
					className='quick-play'
				>
				<button>Quick Play?</button>
				</Link>
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

export default connect(mapStateToProps)(LandingPage)
