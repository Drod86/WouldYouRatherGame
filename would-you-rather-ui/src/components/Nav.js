import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';

const Nav = () => {
	return (
		<ul className='Nav'>
			<Link to='/' className='navBtn'><li>How To</li></Link>
			<Link to='/polls' className='navBtn'><li>Polls</li></Link>
			<Link to='/add' className='navBtn'><li>Add</li></Link>
			<Link to='/leaderboard' className='navBtn'><li>Leaders</li></Link>
		</ul>
	)
}

export default Nav;
