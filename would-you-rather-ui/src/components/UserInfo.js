import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../index.css';

class UserInfo extends Component {
    display(aside){
        return aside ? 'none' : ''
    }
    render(){
        const { name, avatarURL, answers, questions } = this.props.user
        const answered = Object.keys(answers).length
        const added = Object.keys(questions).length
        const score = answered + added
        const displayScore = this.props.score
        const display = this.display(this.props.aside)
        return(
            <div id='User_Info'style={{backgroundColor: displayScore !== true && 'inherit', color: displayScore !== true && 'white' }}>
                    <img className='avatar' alt='avatar' src={avatarURL} />
                    <h4 className='name'>{name}</h4>
                    {displayScore && (
                        <span className='scores'>
                            <h5 className='answered' style={{display: display}}>Answered: {answered}</h5>
                            <h5 className='added'style={{display: display}}>Added: {added}</h5>
                            <h5 className='score'>Score: {score}</h5>
                        </span>)
                    }
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
