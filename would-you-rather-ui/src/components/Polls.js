import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ListQuestions extends Component {
	state={display: ''}
	changeDisplay() {
		return this.state.display === ''
		? this.setState({ display: 'none'})
		: this.setState({ display: ''})
	}
	answeredIds() {
		return Object.keys(this.props.users[this.props.authedUser].answers)
	}

	timestamps() {
		return this.props.questions.map(question => question.timestamp).sort().reverse()
	}

	timeSortedQestions() {
		return this.timestamps().reduce((acc, timestamp) => {
			return [...acc, ...this.props.questions.filter(question => question.timestamp === timestamp)]
		}, [])
	}

	unAnswered(){
		return this.timeSortedQestions().filter(question => !this.answeredIds().includes(question.id))
	}

	answered(){
		return this.timeSortedQestions().filter(question => this.answeredIds().includes(question.id))
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
			<nav>
				<ul>
					<li onClick={() => this.changeDisplay()}>Unanswered</li>
					<li onClick={() => this.changeDisplay()}>Answered</li>
				</ul>
			</nav>
			<section style={{display: this.state.display}}>
			<h4>Pick a poll to play</h4>
			<ul className='pollList'>
				{this.props.authedUser != null && this.display(this.unAnswered())}
			</ul>
			</section>
			<section style={{display: this.state.display === '' ? 'none' : ''}}>
			<h4>Completed polls</h4>
			<ul className='pollList'>
				{this.props.authedUser != null && this.display(this.answered())}
			</ul>
			</section>
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