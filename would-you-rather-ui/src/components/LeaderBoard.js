import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'

class LeaderBoard extends Component {
	render(){
		return (
			<div>
            <h3>LeaderBoard</h3>
            <ul>
            {this.props.usersIds === undefined
                ? <p>Loading...</p>
                : this.props.usersIds.map(user => <UserInfo id={user}/>)
            }
            </ul>
            </div>
		)
	}
}

function mapStateToProps({ users }){
    return {
        usersIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(LeaderBoard);
