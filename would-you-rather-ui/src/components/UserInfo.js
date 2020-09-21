import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserInfo extends Component {
    render(){
        return(
            <div>
            {this.props.users === undefined
                ? <p>Loading...</p>
                : <img alt='avatar' src='' />
            }
            </div>
        )
    }
}

function mapStateToProps({users}, id){
    return {
        users: users,
        id: id
    }
}

export default connect(mapStateToProps)(UserInfo)
