import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleAnswer, addUserAnswer } from '../actions/users'

class Question extends Component {
	state = {
		choice: ''
	}

	setChoice = (choice) => {

		this.setState({
			choice: choice
		})
		console.log(choice);
	}

	render() {
		const quesryString = window.location

		return(
			<div className='page'>
				<Link to='/polls'><button>back</button></Link>
				<h2>Would You Rather...</h2>
				{this.props.authedUser === null
 					? this.props.questionIds.length === 0
 						? <div>Loading...</div>
 						: <div>
						    <button id='Opt1' onClick={e => this.setChoice('optionOne')}>{this.props.questions[this.props.questionIds[this.props.num]].optionOne.text}?</button>
						    <h3>--or--</h3>
						    <button id='Opt2' onClick={e => this.setChoice('optionTwo')}>{this.props.questions[this.props.questionIds[this.props.num]].optionTwo.text}?</button>
						    <Link to='/'>
						    <button>Final Answer</button>
						    </Link>
						  </div>
					: this.props.questions[`${quesryString.pathname.substr(11)}`] === undefined
						? null
						: <div>
							<button id='Opt1' onClick={e => this.setChoice('optionOne')}>{this.props.questions[`${quesryString.pathname.substr(11)}`].optionOne.text}</button>
							<h3>--or--</h3>
							<button id='Opt2' onClick={e => this.setChoice('optionTwo')}>{this.props.questions[`${quesryString.pathname.substr(11)}`].optionTwo.text}</button>
						  	<Link to='/polls' >
						  	{Object.keys(this.props.users[this.props.authedUser].answers).includes(`${quesryString.pathname.substr(11)}`)
						  		? <span><button disabled >Final Answer</button> already answered!</span>
						  		: <button onClick={e => this.props.dispatch(addUserAnswer(this.props.authedUser, `${quesryString.pathname.substr(11)}`, this.state.choice))}>Final Answer</button>
						  	}
						  	</Link>
						  </div>
				}
			</div>
		)
	}
}

function mapStateToProps ({ questions, authedUser, users }) {
	return {
		users,
		questions,
		questionIds: Object.keys(questions),
		authedUser,
	}
}

export default connect(mapStateToProps)(Question)
