import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addUserAnswer } from '../actions/users'

class Question extends Component {
	state = {
		choice: ''
	}

	setChoice = (choice) => {
		this.setState({
			choice: choice
		})
	}

	componentDidMount(){

	}

	render() {
		const quesryString = window.location
		console.log('test', this.props)
		return(
			<div className='page'>
				<h2>Would You Rather...</h2>
				{this.props.authedUser === null
 					? this.props.questionIds.length === 0
 						? <div>Loading...</div>
 						: <div>
						    <button id='Opt1' onClick={e => this.setChoice(e.target.value)}>{this.props.questions[this.props.questionIds[this.props.num]].optionOne.text}?</button>
						    <h3>--or--</h3>
						    <button id='Opt2' onClick={e => this.setChoice(e.target.value)}>{this.props.questions[this.props.questionIds[this.props.num]].optionTwo.text}?</button>
						    <Link to='/'>
						    <button>Final Answer</button>
						    </Link>
						  </div>
					: this.props.questions[`${quesryString.pathname.substr(11)}`] === undefined
						? null
						: <div>
							<button id='Opt1' onClick={e => this.setChoice(e.target.value)}>{this.props.questions[`${quesryString.pathname.substr(11)}`].optionOne.text}</button>
							<h3>--or--</h3>
							<button id='Opt2' onClick={e => this.setChoice(e.target.value)}>{this.props.questions[`${quesryString.pathname.substr(11)}`].optionTwo.text}</button>
						  	<Link to='/polls' onClick={e => this.props.dispatch(addUserAnswer(this.props.authedUser, `${quesryString.pathname.substr(11)}`, this.state.choice))}>
						  	<button>Final Answer</button>
						  	</Link>
						  </div>
				}
			</div>
		)
	}
}

function mapStateToProps ({ questions, authedUser }) {
	return {
		questions: questions,
		questionIds: Object.keys(questions),
		authedUser: authedUser,
	}
}

export default connect(mapStateToProps)(Question)