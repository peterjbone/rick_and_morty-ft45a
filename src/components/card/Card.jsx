import React from "react"
import "./Card.css"
import { Link } from "react-router-dom"

export default function Card(props) {
	const { onClose, name, id, status, species, gender, origin, image } = props
	return (
		<div className="card" data-dark>
			<button onClick={() => onClose(id)}>X</button>
			<Link key={id} to={`/detail/${id}`}>
				<img src={image} alt={name} />
				<div className="card-name-container">
					<span className="card-name-label">Name:</span>
					<span className="card-name">{name}</span>
				</div>
			</Link>
		</div>
	)
}
