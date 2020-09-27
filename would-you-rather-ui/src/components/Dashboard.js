import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Route, Link } from 'react-router-dom'
import Nav from './Nav'
import ListQuestions from './ListQuestions'
import HowTo from './HowTo'
import LeaderBoard from './LeaderBoard'
import AddQuestion from './AddQuestion'
import { setAuthedUser } from '../actions/authedUser'
import '../index.css';

class Dashboard extends Component {
	render() {
	  return (
	    <div className="Dashboard">
	    <aside className='polls'><ListQuestions /></aside>
	    <main>
	    <Nav />
	    <header>
	    { this.props.user && (
	    <h3>Welcome {this.props.user.name}! Your score: {Object.keys(this.props.user.answers).length + this.props.user.questions.length}</h3>
	    )}
	    </header>
	    <section className='pages'>
	    <div>
	    	<Route exact path='/' component={HowTo} />
	    	<Route path='/polls' component={ListQuestions} />
	    	<Route path='/add' component={AddQuestion} />
		    <Route path='/question/:questionId' render={() => <Question />} />
		    <Route path='/leaders' component={LeaderBoard} />
	    </div>
	    <Link to='/'>
	    <button onClick={() => this.props.dispatch(setAuthedUser(null))} className='signOut'>Sign Out</button></Link>
	    </section>
	    </main>
	    <aside className='leaders'><LeaderBoard /></aside>
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
