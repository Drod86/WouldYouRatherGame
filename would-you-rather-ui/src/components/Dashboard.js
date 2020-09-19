import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Route, Link } from 'react-router-dom'
import Nav from './Nav'
import ListQuestions from './ListQuestions'
import HowTo from './HowTo'
import LeaderBoard from './LeaderBoard'
import AddQuestion from './AddQuestion'

class Dashboard extends Component {
	render() {
		console.log(this.props)
	  return (
	    <div className="Dashboard">
	    <Nav />
	    { this.props.user && (
	    <h3>Welcome {this.props.user.name}! Your score: {Object.keys(this.props.user.answers).length + this.props.user.questions.length}</h3>
	    )}
	    <div>
	    	<Route exact path='/' component={HowTo} />
	    	<Route path='/polls' component={ListQuestions} />
	    	<Route path='/add' component={AddQuestion} />
		    <Route path='/question/:questionId' render={() => <Question />} />
		    <Route path='/leaders' component={LeaderBoard} />
	    </div>
	    </div>
	  )
	}
}

function mapStateToProps ({questions, users, authedUser}) {
	return {
		questionIds: Object.keys(questions),
		user: users[authedUser]
	}
}

export default connect(mapStateToProps)(Dashboard)