import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import '../index.css';

class LeaderBoard extends Component {
	leaders(users) {
		return this.props.userIds.reduce((acc, user) => {
			const score = Object.keys(users[user].answers).length + Object.keys(users[user].questions).length;
			return [...acc, {id: user, score: score}]
		}, []).sort(function(a, b){return a.score - b.score }).reverse()
	}
	render(){
		const { users } = this.props
		return (
			<div className='Leaderboard'>
			<h2 style={{textDecoration: 'underline'}}>Leaderboard</h2>
            <ul>
            {this.leaders(users).map(user => <UserInfo key={user.id} id={user.id} score/>)}
            </ul>
            </div>
		)
	}
}

function mapStateToProps({ users }){
    return {
    	users,
        userIds: Object.keys(users),
    }
}

export default connect(mapStateToProps)(LeaderBoard);
