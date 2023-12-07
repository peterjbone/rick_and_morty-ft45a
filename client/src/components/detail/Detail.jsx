import "./Detail.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Deatil(props) {
	/* 	const { characters } = props
	let character = characters.find(char => char.id === Number(id)) */

	const URL = "http://localhost:3001/rickandmorty/character"
	const { id } = useParams()
	const [character, setCharacter] = useState({})

	useEffect(() => {
		if (id) {
			axios(`${URL}/${id}`).then(({ data }) => {
				if (data.name) {
					//console.log("From the detail component :D ", data)
					setCharacter(data)
				} else {
					alert("There are no characters with that ID")
				}
			})
		}
		return setCharacter({})
	}, [id])

	return (
		<div className="Detail">
			<div className="img-container">
				<img src={character.image} alt={character.name}></img>
			</div>
			<div className="info-container">
				<div>
					<p className="character-name">{character.name}</p>
					<p> 🔎 Status | {character.status}</p>
					<p> ❓ Species | {character.species}</p>
					<p> 👫 Gender | {character.gender}</p>
					{<p> 👀 Origin | {character.origin?.name}</p>}
				</div>
			</div>
		</div>
	)
}

/*
<Nav onSearch={onSearch} characters={characters} logout={logout} />
*/
