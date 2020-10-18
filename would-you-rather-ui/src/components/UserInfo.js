import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../index.css';

class UserInfo extends Component {
    render(){
        const { name, avatarURL, answers, questions } = this.props.user
        const answered = Object.keys(answers).length
        const added = Object.keys(questions).length
        const score = answered + added
        return(
            <div className='User_Info'>
                <span>
                    <img alt='avatar' src={avatarURL} />
                    <h4 className='name'>{name}</h4>
                    {this.props.score && (
                        <span className='scores'>
                            <h5 className='answered'>Answered: {answered}</h5>
                            <h5 className='added'>Added: {added}</h5>
                            <h5 className='score'>Score: {score}</h5>
                        </span>)
                    }
                </span>
            </div>
        )
    }
}

function mapStateToProps({ users }, { id }){
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(UserInfo)
