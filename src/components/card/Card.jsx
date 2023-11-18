import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

export default function Card(props) {
	const { onClose, name, id, status, species, gender, origin, image } = props
	return (
		<div className="card">
			<button onClick={() => onClose(id)}>X</button>
			<Link key={id} to={`/detail/${id}`}>
				<img src={image} alt={name} />
			</Link>
			<span className="card-name">Name: {name}</span>
			<span>Status: {status}</span>
			<span>Species: {species}</span>
			<span>Gender: {gender}</span>
			<span>Origin: {origin}</span>
		</div>
	)
}
