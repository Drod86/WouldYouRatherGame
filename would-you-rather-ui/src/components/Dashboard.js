import React from 'react'
import Polls from './Polls'
import HowTo from './HowTo'
import Add from './Add'
import Leaders from './Leaders'
import Question from './Question'
import Welcome from './Welcome'
import Nav from './Nav'
import '../index.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom'

const Dashboard = () => {
	let match = useRouteMatch();
	return(
		<Router >
			<div className='Dashboard'>
				<div className='nonMobile polls'>
					<Polls />
				</div>
				<div className='main'>
					<nav className='nav'>
						<Nav />
					</nav>
					<header className='welcome'>
						<Welcome />
					</header>
					<section>
						<Switch>
							<Route exact path={match.path} component={HowTo} />
							<Route path={`${match.path}polls`} component={Polls} />
							<Route path={`${match.path}add`} component={Add} />
							<Route path={`${match.path}leaderboard`} component={Leaders} />
							<Route path={`${match.path}question`} component={Question} />
						</Switch>
					</section>
				</div>
				<div className='nonMobile leaders'>
					<Leaders />
				</div>
			</div>
		</Router>
	)

}

export default Dashboard