import React from 'react'
import Card from '../card/Card.jsx'
import './Cards.css'

export default function Cards({ characters, onClose }) {
	return (
		<div className="cards">
			{characters.map(character => {
				return (
					<Card
						key={character.id}
						name={character.name}
						id={character.id}
						status={character.status}
						species={character.species}
						gender={character.gender}
						origin={character.origin.name}
						image={character.image}
						onClose={onClose}
					/>
				)
			})}
		</div>
	)
}
