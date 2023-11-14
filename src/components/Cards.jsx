import React from 'react'
import Card from './Card'

export default function Cards({ characters }) {
	return (
		<div>
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
						onClose={() => alert('Emulando que se cierra la Card')}
					/>
				)
			})}
		</div>
	)
}
