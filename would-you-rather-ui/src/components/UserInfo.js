import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../index.css';

class UserInfo extends Component {
    render(){
        const user = this.props.users[this.props.id.id]
        const url = user.avatarURL
        return(
            <div className='user-info'>
            {this.props.users === undefined
                ? <p>Loading...</p>
                : <span>
                    <img alt='avatar' src={url} />
                    <h4 className='name'>{user.name}</h4>
                    {this.props.score && (<span className='scores'>

                    <h5 className='answered'>Answered: {Object.keys(user.answers).length}</h5>
                    <h5 className='added'>Added: {Object.keys(user.questions).length}</h5>
                    <h5 className='score'>Score: {Object.keys(user.questions).length + Object.keys(user.answers).length}</h5>
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
