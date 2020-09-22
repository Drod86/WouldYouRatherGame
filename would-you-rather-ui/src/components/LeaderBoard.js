import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'

class LeaderBoard extends Component {
	render(){

		return (
			<div>
			<h3>LeaderBoard </h3>
            <ul>
            {Object.keys(this.props.users).length > 0 && console.log(Object.keys(this.props.users['sarahedo'].answers).length + Object.keys(this.props.users['sarahedo'].questions).length)&& this.props.usersIds === undefined
                ? <p>Loading...</p>
                : this.props.usersIds.map(user => <UserInfo key={user} id={user}/>)
            }
            </ul>
            </div>
		)
	}
}

function mapStateToProps({ users }){
    return {
    	users,
        usersIds: Object.keys(users),
    }
}

export default connect(mapStateToProps)(LeaderBoard);
