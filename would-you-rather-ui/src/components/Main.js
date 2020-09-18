import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import HowTo from './HowTo'
import ListQuestions from './ListQuestions'
import Question from './Question'

class Main extends Component {
	render() {
		return (
			<div>
			test
			    < Route
			    	path='/'
			    	component={HowTo}
			    />
			    < Route
			    	path='/questions'
			    	render={() => <ListQuestions />}
			    />
			    < Route
		    		path={`/question:${this.props.questionIds[0]}`}
		    		render={() => <Question id={this.props.questionIds[0]} />}
			    />
			</div>
		)
	}
}

function mapStateToProps ({questions}) {
	return {
		questionIds: Object.keys(questions)
	}
}

export default connect(mapStateToProps)(Main);