import "./Cards.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "../card/Card.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function Cards({ characters, onSearch, onClose }) {
	//* Add a random character function
	const randomCharacter = () => {
		let randomNum = Math.floor(Math.random() * 826) + 1;
		const charactersId = characters.map((char) => {
			return char.id;
		});
		// si el 'id' ya se encuentra en el array, se detiene la función
		if (charactersId.includes(randomNum)) return;
		onSearch(randomNum);
	};

	//********************************* CARDS COMPONENT
	return (
		<div className="cards">
			{!characters.length ? null : (
				<div className="addBtns">
					<button onClick={randomCharacter}>Add randomly</button>
					<SearchBar onSearch={onSearch} />
				</div>
			)}
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
