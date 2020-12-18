import React from 'react'
import HowTo from './HowTo'
import Polls from './Polls'
import Add from './Add'
import Nav from './Nav'
import Leaders from './Leaders'
import Question from './Question'
import Welcome from './Welcome'
import '../index.css';
import {
	Switch,
	Route
} from 'react-router-dom'

const Dashboard2 = ({ match }) => {
	return(
		<div>
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
							<Route path={`${match.path}`}  exact component={HowTo} />
							<Route path={`${match.path}polls`} component={Polls} />
							<Route path={`${match.path}add`} component={Add} />
							<Route path={`${match.path}leaderboard`} component={Leaders} />
							<Route path={`${match.path}question/:questionId`} component={Question} />
						}</Switch>
					</section>
				</div>
				<div className='nonMobile leaders'>
					<Leaders aside/>
				</div>
			</div>
		</div>
	)

}
export default Dashboard2