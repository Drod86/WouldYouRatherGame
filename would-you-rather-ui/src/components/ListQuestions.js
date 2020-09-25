import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ListQuestions extends Component {
	answeredIds() {
		return Object.keys(this.props.users[this.props.authedUser].answers)
	}

	unAnswered(){
		return this.props.questions.filter(question => !this.answeredIds().includes(question.id))
	}

	answered(){
		return this.props.questions.filter(question => this.answeredIds().includes(question.id))
	}

	opt(question){
		return this.props.users[this.props.authedUser].answers[question.id]
		? this.props.users[this.props.authedUser].answers[question.id]
		: 'optionOne'

	}

	display(polls){
		return polls.map((question) =>
					<Link to={`/question/:${question.id}`} key={question.id} ><button className='questionBtn'>{question[this.opt(question)].text}</button></Link>
					)
	}
	render() {
		return (
			<div>
			<h4>Pick a poll to play</h4>
			<ul className='pollList'>
				{this.props.authedUser != null && this.display(this.unAnswered())}
			</ul>
			<h4>Completed polls</h4>
			<ul className='pollList'>
				{this.props.authedUser != null && this.display(this.answered())}
			</ul>
			</div>
		)
	}
}

function mapStateToProps({questions, authedUser, users}) {
	return {
		loading: authedUser === undefined,
		questions: Object.values(questions),
		authedUser,
		users,
	}
}
export default connect(mapStateToProps)(ListQuestions)