import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';

export default function HowTo() {
	return(
		<div className='HowTo'>
			<h3>How To Play</h3>
			<p>Increase your score by choosing and answering poll questions from the polls list or by adding a new question of your own.</p>
			<Link to='/polls' className='navBtn'><button>Polls List</button></Link>
			<h3>--or--</h3>
			<Link to='/add' className='navBtn'><button>Add New Poll</button></Link>
		</div>
	)
}