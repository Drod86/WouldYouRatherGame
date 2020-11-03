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

	disable(){
		return 'disabled'
	}

	render() {
		const { optionOne, optionTwo } = this.state
		const { dispatch } = this.props
		return(
			<div id='Add'>
                <h3 style={{textDecoration: 'underline'}}>AddQuestion</h3>
                <h3>Would you rather...?</h3>
                <input className='opt' placeholder='Option One' type='text' onChange={e => this.addOptionOne(e.target.value)} />
                <p>--or--</p>
                <input className='opt' placeholder='Option Two' type='text' onChange={e => this.addOptionTwo(e.target.value)} />
                {optionOne === '' || optionTwo === ''
                	? <button className='add' disabled style={{color: 'grey'}}>Add</button>
                	: <Link to='/'><button className='add' onClick={() => dispatch(handleAddQuestion(optionOne, optionTwo))}>Add</button></Link>
            	}
            </div>
		)
	}
}

export default connect()(AddQuestion)
