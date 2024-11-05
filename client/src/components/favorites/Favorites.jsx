import "./Favorites.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards, getFav } from "../../redux/actions.js";
import Card from "../card/Card.jsx";
import { v4 as uuidv4 } from "uuid";

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

	//* filling "allCharacters" and "myFavorites" with the favorites using the "userId"
	useEffect(() => {
		const value = userId || JSON.parse(localStorage.getItem("savedUserId")).id;
		dispatch(getFav(value));
	}, []);

	//**************************************** FAVORITES COMPONENT
	return (
		<>
			{/* filtros y ordenamientos, siempre se muestran mientras haya favoritos en 'allCharacters' */}
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
			{/* Grid de favoritos, ya sean todos o filtrados*/}
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
					myFavorites.map((item) => {
						return (
							<Card
								key={uuidv4()}
								id={item.id}
								name={item.name}
								image={item.image}
								onClose={onClose}
								character={item}
							/>
						);
					})
				)}
			</div>
		</>
	);
}
