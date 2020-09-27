import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../actions/users'
import UserInfo from './UserInfo'

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

				<h2>Would You Rather...</h2>
				{this.props.authedUser === null
 					? this.props.questionIds.length === 0
 						? <div>Loading...</div>
 						: <div>
						    <button id='Opt1' onClick={e => this.setChoice('optionOne')}>{this.props.questions[this.props.questionIds[this.props.num]].optionOne.text}?</button>
						    <h3>--or--</h3>
						    <button id='Opt2' onClick={e => this.setChoice('optionTwo')}>{this.props.questions[this.props.questionIds[this.props.num]].optionTwo.text}?</button>
						    <Link to='/'>
						    <button className='submit'>Final Answer</button>
						    </Link>
                    <Link to='/'><button className='backBtn'>back</button></Link>

						  </div>
					: this.props.questions[`${quesryString.pathname.substr(11)}`] === undefined
						? null
						: <div>
							Added by: <UserInfo id={this.props.questions[`${quesryString.pathname.substr(11)}`].author} />
							<button id='Opt1' onClick={e => this.setChoice('optionOne')}>{this.props.questions[`${quesryString.pathname.substr(11)}`].optionOne.text}</button>
							<h3 className='or'>--or--</h3>
							<button id='Opt2' onClick={e => this.setChoice('optionTwo')}>{this.props.questions[`${quesryString.pathname.substr(11)}`].optionTwo.text}</button>
						  	<Link to='/polls' >
						  	{Object.keys(this.props.users[this.props.authedUser].answers).includes(`${quesryString.pathname.substr(11)}`)
						  		? <span><button className='submit' disabled >Final Answer</button> already answered!</span>
						  		: this.state.choice === ''
						  			? <button className='submit' disabled>Final Answer</button>
						  			: <button className='submit' onClick={e => this.props.dispatch(handleAnswer(`${quesryString.pathname.substr(11)}`, this.state.choice))}>Final Answer</button>
						  	}
						  	</Link>
                    <Link to='/polls'><button className='backBtn'>back</button></Link>

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
