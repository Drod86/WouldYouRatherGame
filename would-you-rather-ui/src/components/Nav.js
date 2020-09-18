import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<ul>
			<Link to='/questions'><li>Questions</li></Link>
		</ul>
	)
}

export default Nav;