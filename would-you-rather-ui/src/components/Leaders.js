import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import '../index.css';

class LeaderBoard extends Component {
	render(){
		const { leaders } = this.props
		return (
			<div className='Leaderboard'>
			<h2 style={{textDecoration: 'underline'}}>Leaderboard</h2>
            <ul>
            {leaders.map(user => <UserInfo key={user.id} id={user.id} score aside={this.props.aside}/>)}
            </ul>
            </div>
		)
	}
}

function mapStateToProps({ users }){
    return {
        leaders:
        	Object.keys(users).reduce((acc, user) => {
				const score = Object.keys(users[user].answers).length + Object.keys(users[user].questions).length;
				return [...acc, {id: user, score: score}]
			}, []).sort(function(a, b){return a.score - b.score }).reverse()
    }
}

export default connect(mapStateToProps)(LeaderBoard);
