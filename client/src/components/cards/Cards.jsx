import "./Cards.css";
import React from "react";
import Card from "../card/Card.jsx";
import { v4 as uuidv4 } from "uuid";

export default function Cards({ characters, onClose }) {
	return (
		<div className="cards">
			{!characters.length ? (
				<div className="no-cards-message">
					<h2>NO CHARACTERS ADDED TO SHOW</h2>
					<img src="https://www.icegif.com/wp-content/uploads/2023/04/icegif-1320.gif"></img>
					<p>
						You can add characters randomly or by their {""}
						<a href="https://rickandmortyapi.com/api/character" target="_blank">
							ID number
						</a>
					</p>
				</div>
			) : (
				characters.map((character) => {
					return (
						<Card
							key={uuidv4()}
							id={character.id}
							name={character.name}
							image={character.image}
							onClose={onClose}
							character={character}
						/>
					);
				})
			)}
		</div>
	);
}
