import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Link } from 'react-router-dom'

class AddQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: ''
	}

	addOptionOne(text){
		this.setState({
			optionOne: text
		})
	}

	addOptionTwo(text){
		this.setState({
			optionTwo: text
		})
	}

	render() {
		return(
			<div className='page'>
                <h3>AddQuestion</h3>
                <h4>Would you rather...?</h4>
                <input placeholder='Option One' type='text' onChange={e => this.addOptionOne(e.target.value)} />
                <p>--or--</p>
                <input placeholder='Option Two' type='text' onChange={e => this.addOptionTwo(e.target.value)} />
                <Link to='/polls'>
                <button onClick={() => this.props.dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo))}>Add</button></Link>
            </div>
		)
	}
}

export default connect()(AddQuestion)
