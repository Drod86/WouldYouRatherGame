import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewUser } from '../actions/users'
import { Link } from 'react-router-dom'
import '../index.css';

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		password: '',
		avatarUrl: ''
	}

	addFirstName(text){
		this.setState({
			firstName: text
		})
	}

	addLastName(text){
		this.setState({
			lastName: text
		})
	}

	addPassword(text){
		this.setState({
			password: text
		})
	}

	addAvatarUrl(text){
		this.setState({
			avatarUrl: text
		})
	}

	render() {
		const newUser = this.state
		const { display, dispatch } = this.props
		console.log(newUser)
		return(
			<div className='pages' style={{display: display}}>
                <h3>Register</h3>
                <h4>First Name</h4>
                <input placeholder='First Name' type='text' onChange={e => this.addFirstName(e.target.value)} />
                <h4>Last Name</h4>
                <input placeholder='Last Name' type='text' onChange={e => this.addLastName(e.target.value)} />
                <h4>Avatar URL</h4>
                <input placeholder='optional' type='text' onChange={e => this.addAvatarUrl(e.target.value)} />
                <h4>Password</h4>
                <input placeholder='Last Name' type='text' onChange={e => this.addPassword(e.target.value)} />
                <Link to='/'>
                <button onClick={() => dispatch(handleNewUser(newUser))}>Register</button></Link>
            </div>
		)
	}
}

export default connect()(Register)
