import "./Favorites.css"
import React from "react"
import { useSelector } from "react-redux"
import Card from "../card/Card.jsx"

export default function Favorites(props) {
	const { onClose } = props

	const myFavorites = useSelector(state => state.myFavorites)

	return (
		<div className="Favorites">
			{myFavorites.map(favCharacter => {
				return (
					<Card
						key={favCharacter.id}
						name={favCharacter.name}
						id={favCharacter.id}
						status={favCharacter.status}
						species={favCharacter.species}
						gender={favCharacter.gender}
						origin={favCharacter.origin.name}
						image={favCharacter.image}
						onClose={onClose}
						character={favCharacter}
					/>
				)
			})}
		</div>
	)
}
