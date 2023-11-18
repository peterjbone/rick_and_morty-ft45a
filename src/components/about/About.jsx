import React from 'react'
import Nav from '../nav/Nav.jsx'
import './About.css'

export default function About(props) {
	return (
		<>
			<Nav onsearch={props.onSearch} />
			<div className="About">
				<h1>About</h1>
				<h2>Created by Joao Bone</h2>
				<img src="../../public/pfp-blue-bg-1 dark.png" alt="fotito" />
			</div>
		</>
	)
}
