import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Route } from 'react-router-dom'
import Nav from './Nav'
import Main from './Main'

class Dashboard extends Component {
	render() {
	  return (
	    <div className="Dashboard">
	    <Nav />
	    <Main />
	    </div>
	  )
	}
}

export default Dashboard