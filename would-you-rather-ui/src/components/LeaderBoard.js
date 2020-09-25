import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'

class LeaderBoard extends Component {
	leaders(users) {
		return this.props.usersIds.reduce((acc, user) => {
			const score = Object.keys(users[user].answers).length + Object.keys(users[user].questions).length;
			return [...acc, {id: user, score: score}]
		}, []).sort(function(a, b){return a.score - b.score }).reverse().reduce((acc, leader) => {
			return [...acc, leader.id]
		}, [])
	}
	render(){

		return (
			<div>
			{Object.keys(this.props.users).length > 0 && console.log('leaders', this.leaders(this.props.users))}
			<h3>LeaderBoard </h3>
            <ul>
            {Object.keys(this.props.users).length > 0 && this.props.usersIds === undefined
                ? <p>Loading...</p>
                : this.leaders(this.props.users).map(user => <UserInfo key={user} id={user} score/>)
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
