import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../index.css';

class Polls extends Component {

	state={
		unAnswered: '',
		answered: 'none'
	}

	showUnanswered() {
		return this.setState({unAnswered: '', answered: 'none'})
	}

	showAnswered() {
		return this.setState({unAnswered: 'none', answered: ''})
	}

	answeredIds() {
		return Object.keys(this.props.answers)
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

	displayOption(question){
		return this.props.answers[question.id]
		? this.props.answers[question.id]
		: 'optionOne'

	}

	display(polls){
		return polls.map((question) =>
					<Link to={`/question/:${question.id}`} key={question.id} ><button className='questionBtn'>{question[this.displayOption(question)].text}</button></Link>
				)
	}

	render() {
		const { loading } = this.props
		const { unAnswered, answered } =  this.state
		return (
			<div id='Polls'>
			<nav className='nav'>
				<ul>
					<li onClick={() => this.showUnanswered()}>Unanswered</li>
					<li onClick={() => this.showAnswered()}>Answered</li>
				</ul>
			</nav>
			{loading
				? <h3>loading...</h3>
				: <div className='pollLists'>
					<section style={{display: unAnswered}}>
						<h4>Pick a poll to play</h4>
						<ul className='pollList'>
							{this.display(this.unAnswered())}
						</ul>
					</section>
					<section style={{display: answered}}>
						<h4>Completed polls</h4>
						<ul className='pollList'>
							{this.display(this.answered())}
						</ul>
				  	</section>
				  </div>
			}
			</div>
		)
	}
}

function mapStateToProps({questions, authedUser, users}) {
	return {
		loading: authedUser === undefined,
		questions: Object.values(questions),
		answers: users[authedUser].answers
	}
}
export default connect(mapStateToProps)(Polls)