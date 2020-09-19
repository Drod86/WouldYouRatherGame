import React, { Component } from 'react'
import { connect } from 'react-redux'

class ListQuestions extends Component {
	render() {
		console.log(this.props)
		return (
			<div>
			<h4>Pick a poll to play</h4>
			<ul>

			</ul>
			<h4>Completed polls</h4>
			<ul>
			</ul>
			</div>
		)
	}
}

function mapStateToProps({questions, authedUser, users}) {
	return {
		questions: Object.values(questions),
		user: users[authedUser]
	}
}
export default connect(mapStateToProps)(ListQuestions)