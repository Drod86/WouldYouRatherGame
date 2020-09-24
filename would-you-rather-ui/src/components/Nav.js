import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';

const Nav = () => {
	return (
		<ul className='nav'>
			<li><Link to='/' className='navBtn'>How To</Link></li>
			<li><Link to='/polls' className='navBtn'>Polls List</Link></li>
			<li><Link to='/add' className='navBtn'>Add Question</Link></li>
			<li><Link to='/leaders' className='navBtn'>Leader Board</Link></li>
		</ul>
	)
}

export default Nav;