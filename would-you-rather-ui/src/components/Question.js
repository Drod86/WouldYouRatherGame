import React, { Component } from 'react'
import { connect } from 'react-redux'

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
				<button id='Opt1'>{this.props.questions[this.props.questionIds[1]].optionOne.text}?</button>
				<h3>--or--</h3>
				<button id='Opt2'>{this.props.questions[this.props.questionIds[1]].optionTwo.text}?</button>
				<hr/>
				<button>Final Answer</button>
			</div>
		)
	}
}

function mapStateToProps ({ questions }, id) {
	return {
		questions: questions,
		questionIds: Object.keys(questions),
	}
}

export default connect(mapStateToProps)(Question)