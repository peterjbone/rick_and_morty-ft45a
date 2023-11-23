import React from "react"
import { useParams } from "react-router-dom"
import Nav from "../nav/Nav.jsx"
import "./Detail.css"

export default function Deatil(props) {
	const { characters, logout, onSearch } = props,
		params = useParams()
	//console.log(params)

	let character = characters.filter(char => char.id === Number(params.id))[0]

	return (
		<div className="Detail">
			{/* <h1>Detail</h1> */}
			<div className="img-container">
				<img src={character.image} alt={character.name}></img>
			</div>
			<div className="info-container">
				<div>
					<p className="character-name">{character.name}</p>
					<p> 🔎 Status | {character.status}</p>
					<p> ❓ Species | {character.species}</p>
					<p> 👫 Gender | {character.gender}</p>
					<p> 👀 Origin | {character.origin.name}</p>
				</div>
			</div>
		</div>
	)
}

/*
<Nav onSearch={onSearch} characters={characters} logout={logout} />
*/
