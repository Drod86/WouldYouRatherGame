import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
		console.log(this.props.questions[this.props.questionIds[1]])
		return(

			<div className='page'>
				<h2>Would You Rather...</h2>
				{this.props.authedUser
					? <div>
						<button id='Opt1'>{this.props.questions[this.props.id].optionOne.text}?</button>
						<h3>--or--</h3>
						<button id='Opt2'>{this.props.questions[this.props.id].optionTwo.text}?</button>
						</div>
					: <div>
						<button id='Opt1'>{this.props.questions[this.props.questionIds[1]].optionOne.text}?</button>
						<h3>--or--</h3>
						<button id='Opt2'>{this.props.questions[this.props.questionIds[1]].optionTwo.text}?</button>
					</div>
				}
				<hr/>
				<Link to='/'>
				<button>Final Answer</button>
				</Link>
			</div>
		)
	}
}

function mapStateToProps ({ questions, authedUser }, id) {
	return {
		questions: questions,
		questionIds: Object.keys(questions),
		authedUser: authedUser,
	}
}

export default connect(mapStateToProps)(Question)