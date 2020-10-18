import React, { Component } from 'react'
import { connect } from 'react-redux'

class Welcome extends Component {
	render(){
		return(
			<header class='Welcome'>
	    		{ this.props.user && (
	    		<h2>Welcome {this.props.user.name}! Your score: {Object.keys(this.props.user.answers).length + this.props.user.questions.length}</h2>
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