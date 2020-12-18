import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../index.css';

class Welcome extends Component {
	render(){
		const { user } = this.props
		return(
			<header className='Welcome'>
	    		{ user && (
	    		<h2>Welcome {user.name}! Your score: {Object.keys(user.answers).length + user.questions.length}</h2>
	    		)}
	    	</header>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	return {
		user: users[authedUser]
	}
}

export default connect(mapStateToProps)(Welcome);