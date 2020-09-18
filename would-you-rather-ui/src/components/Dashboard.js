import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
	render() {
	  return (
	    <div className="Dashboard">
	    {this.props.questionIds === undefined
	    	? <p>Loading</p>
	    	: <Question id={this.props.questionIds[0]} />
	    }
	    </div>
	  )
	}
}

function mapStateToProps ({questions}) {
	return {
		questionIds: Object.keys(questions)
	}
}

export default connect(mapStateToProps)(Dashboard)