import React, { Component } from 'react'
import { connect } from 'react-redux'
import Polls from './Polls'
import HowTo from './HowTo'
import Add from './Add'
import Leaders from './Leaders'
import Question from './Question'
import Welcome from './Welcome'
import Nav from './Nav'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
	Redirect
} from 'react-router-dom'

const Dashboard = () => {
	let match = useRouteMatch();
	return(
		<Router>
			<div>
				<aside>
					<Polls />
				</aside>
				<nav>
					<Nav />
				</nav>
				<header>
					<Welcome />
				</header>
				<section>
				<h3>main</h3>
					<Switch>
						<Route exact path={match.path} component={HowTo} />
						<Route path={`${match.path}polls`} component={Polls} />
						<Route path={`${match.path}add`} component={Add} />
						<Route path={`${match.path}leaderboard`} component={Leaders} />
						<Route path={`${match.path}question`} component={Question} />
					</Switch>
				</section>
				<aside>
					<Leaders />
				</aside>
			</div>
		</Router>
	)

}

export default Dashboard