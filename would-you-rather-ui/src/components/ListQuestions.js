import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ListQuestions extends Component {
	render() {
		return (
			<div>
			<h4>Pick a poll to play</h4>
			<ul>
				{this.props.questions.map((question) =>
					<Link to={`/question/:${question.id}`} key={question.id} ><button className='questionBtn'>{question.optionOne.text}</button></Link>
					)
				}
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