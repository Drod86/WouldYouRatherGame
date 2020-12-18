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

	clearOptions(){
		this.setState({
			optionOne: '',
			optionTwo: ''
		})
	}

	submitQuestion(optionOne, optionTwo){
		optionOne.toLowerCase() !== optionTwo.toLowerCase()
			? this.props.dispatch(handleAddQuestion(optionOne, optionTwo)) && this.clearOptions()
			: alert("Options must be different please submit again")
	}

	disable(){
		return 'disabled'
	}

	render() {
		const { optionOne, optionTwo } = this.state
		return(
			<div id='Add'>
                <h3 style={{textDecoration: 'underline'}}>AddQuestion</h3>
                <h3>Would you rather...?</h3>
                <input className='opt' placeholder='Option One' type='text' onChange={e => this.addOptionOne(e.target.value)} value={optionOne} />
                <p>--or--</p>
                <input className='opt' placeholder='Option Two' type='text' onChange={e => this.addOptionTwo(e.target.value)} value={optionTwo} />
                {optionOne === '' || optionTwo === ''
                	? <button className='add' disabled style={{color: 'grey'}}>Add</button>
                	: <button className='add' onClick={() => this.submitQuestion(optionOne, optionTwo)}>Add</button>
            	}
            	<Link to='/'><button className='add'>{optionOne === '' && optionTwo === '' ? 'Done' : 'Back'}</button></Link>
            </div>
		)
	}
}

export default connect()(AddQuestion)