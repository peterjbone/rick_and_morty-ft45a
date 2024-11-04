import "./Favorites.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards, getFav } from "../../redux/actions.js";
import Card from "../card/Card.jsx";

export default function Favorites({ onClose }) {
	const dispatch = useDispatch();

	//* sort and filter handlers
	function handleOrder(e) {
		dispatch(orderCards(e.target.value));
	}
	function handleFilter(e) {
		dispatch(filterCards(e.target.value));
	}

	//* global state "myFavorites"
	const myFavorites = useSelector((state) => state.myFavorites);
	const allCharacters = useSelector((state) => state.allCharacters);
	const userId = useSelector((state) => state.userId);

	//* upload all favs at the beginning
	useEffect(() => {
		dispatch(getFav(userId));
	}, []);

	//**************************************** FAVORITES COMPONENT
	return (
		<>
			{/* SOLO SE MUESTRA ESTOS FILTROS Y ORDENAMIENTOS SI HAY FAVORITOS */}
			{!allCharacters.length ? null : (
				<div className="fav-selects">
					{/* ORDER */}
					<div className="order-container">
						<h3 htmlFor="order">Sort by order</h3>
						<select name="order" id="order" onChange={handleOrder}>
							<option value="" disabled readOnly selected>
								&#40;Select an option &#41;
							</option>
							<option value="A">Ascendent</option>
							<option value="D">Descendent</option>
						</select>
					</div>
					{/* FILTER */}
					<div className="gender-container">
						<h3 htmlFor="gender">Filter by gender</h3>
						<select name="gender" id="gender" onChange={handleFilter}>
							<option value="" disabled readOnly selected>
								&#40;Select an option &#41;
							</option>
							<option value="All">All</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Genderless">Genderless</option>
							<option value="unknown">unknown</option>
						</select>
					</div>
				</div>
			)}
			{/* LOS FAVORITOS SIEMPRE SE MOSTRARAN, YA SEA Q NO HAYA O SI HAYA */}
			<div className="favorites">
				{!myFavorites.length ? (
					<div className="no-favorites">
						<h2>NO FAVORITES CHARACTERS TO SHOW</h2>
						<span className="no-favorites__blackHeart">🖤</span>
						<p>
							You can add favorites <br /> by clicking on the{" "}
							<span className="no-favorites__redHeart">❤️</span> of the character
							card
						</p>
					</div>
				) : (
					myFavorites.map((favCharacter) => {
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
						);
					})
				)}
			</div>
		</>
	);
}
