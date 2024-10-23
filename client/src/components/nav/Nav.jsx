import "./Nav.css"
import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import SearchBar from "../searchBar/SearchBar.jsx"

export default function Nav(props) {
	//* Add random character function
	const randomCharacter = () => {
		let randomNum = Math.floor(Math.random() * 826) + 1
		const charactersId = props.characters.map((char) => {
			return char.id
		})
		if (charactersId.includes(randomNum)) return
		props.onSearch(randomNum)
	}

	//* Responsive navbar function
	const navRef = useRef()
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive-nav")
	}

	return (
		<nav className="navbar">
			<Link to="/home">
				<img
					/* src="../../../public/logo_proto.webp" */
					src="https://i.postimg.cc/cHH4JcWv/logo-proto.webp"
					alt="Logo"
					className="logo"
				/>
			</Link>
			<ul ref={navRef}>
				<li>
					<Link to="/home">
						<button>Home</button>
					</Link>
				</li>

				<li>
					<Link to="/favorites">
						<button className="navbar__favorites-btn">Favorites</button>
					</Link>
				</li>

				<li>
					<button onClick={randomCharacter}>Add ramdonly</button>
				</li>

				<li>
					<SearchBar onSearch={props.onSearch} />
				</li>

				<li>
					<Link to="/about">
						<button>About</button>
					</Link>
				</li>

				<li>
					<button onClick={props.logout}>Log out 🔙</button>
				</li>

				<li>
					<button className="nav-btn nav-close-btn" onClick={showNavbar}>
						<FaTimes />
					</button>
				</li>
			</ul>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</nav>
	)
}
