import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserInfo extends Component {
    render(){
        const user = this.props.users[this.props.id.id]
        const url = user.avatarURL
        return(
            <div>
            {this.props.users === undefined
                ? <p>Loading...</p>
                : <span>
                    <img alt='avatar' src={url} />
                    <h4>{user.name}</h4>
                    {this.props.score && (<span>
                    <h4>Answered: {Object.keys(user.answers).length}</h4>
                    <h4>Added: {Object.keys(user.questions).length}</h4>
                    </span>)}
                  </span>
            }
            </div>
        )
    }
}

function mapStateToProps({users}, id){
    return {
        users,
        id,
    }
}

export default connect(mapStateToProps)(UserInfo)
