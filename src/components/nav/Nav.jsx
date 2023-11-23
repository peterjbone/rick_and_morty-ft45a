import "./Nav.css"
import React from "react"
import SearchBar from "../searchBar/SearchBar.jsx"
import { Link } from "react-router-dom"

export default function Nav(props) {
	const randomCharacter = () => {
		let randomNum = Math.floor(Math.random() * 826) + 1
		const charactersId = props.characters.map(char => {
			return char.id
		})
		if (charactersId.includes(randomNum)) return
		props.onSearch(randomNum)
	}

	return (
		<nav className="navbar" data-dark>
			<Link to="/home">
				<img
					src="../../../public/logo_proto.webp"
					alt="Logo"
					className="logo"
				/>
			</Link>
			<ul>
				<li>
					<Link to="/home">
						<button>Home</button>
					</Link>
				</li>
				<li>
					<Link to="/about">
						<button>About</button>
					</Link>
				</li>

				<li>
					<button onClick={randomCharacter} data-dark>
						Agregar Random
					</button>
				</li>

				<li>
					<SearchBar onSearch={props.onSearch} />
				</li>

				<li>
					<button onClick={props.logout}>Log out ❌</button>
				</li>
			</ul>
		</nav>
	)
}
