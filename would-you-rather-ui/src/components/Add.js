import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Link } from 'react-router-dom'
import '../index.css';

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
		const { optionOne, optionTwo } = this.state
		const { dispatch } = this.props
		return(
			<div className='pages'>
                <h3>AddQuestion</h3>
                <h4>Would you rather...?</h4>
                <input placeholder='Option One' type='text' onChange={e => this.addOptionOne(e.target.value)} />
                <p>--or--</p>
                <input placeholder='Option Two' type='text' onChange={e => this.addOptionTwo(e.target.value)} />
                <Link to='/'>
                <button onClick={() => dispatch(handleAddQuestion(optionOne, optionTwo))}>Add</button></Link>
            </div>
		)
	}
}

export default connect()(AddQuestion)
