import "./Detail.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detail() {
	const apiBackUrl = import.meta.env.VITE_BACK_URL;
	const { id } = useParams();
	const [character, setCharacter] = useState({});

	useEffect(() => {
		//prettier-ignore
		axios(`${apiBackUrl}/character/${id}`)
        .then(({ data }) => {
					setCharacter(data)
        })
        .catch((error) => {
          console.error(error.message)
          alert("There are no characters with that ID")
        })

		return setCharacter({});
	}, [id]);

	return (
		<div className="Detail">
			<div className="img-container">
				<img src={character.image} alt={character.name}></img>
			</div>
			<div className="info-container">
				<div>
					<p className="character-name">{character.name}</p>
					<p> 🔎 Status: {character.status}</p>
					<p> ❓ Species: {character.species}</p>
					<p> 👫 Gender: {character.gender}</p>
					{<p> 👀 Origin: {character.origin}</p>}
				</div>
			</div>
		</div>
	);
}
