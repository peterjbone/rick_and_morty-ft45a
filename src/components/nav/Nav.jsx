import './Nav.css'
import React from 'react'
import SearchBar from '../searchBar/SearchBar.jsx'
import { Link } from 'react-router-dom'

export default function Nav(props) {
	const randomCharacter = () => {
		//prettier-ignore
		let randomNum = Math.floor(Math.random() * 826) + 1
		props.onSearch(randomNum)
	}

	return (
		<nav className="navbar">
			<span className="logo">Rick and Morty App</span>
			<ul>
				<li>
					<Link to="/">
						<button>Home</button>
					</Link>
				</li>
				<li>
					<Link to="/about">
						<button>About</button>
					</Link>
				</li>

				<li>
					<button onClick={randomCharacter}>Agregar Random</button>
				</li>

				<li>
					<SearchBar onSearch={props.onSearch} />
				</li>
			</ul>
		</nav>
	)
}
