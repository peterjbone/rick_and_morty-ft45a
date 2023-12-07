import "./Favorites.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "../card/Card.jsx"
import { filterCards, orderCards } from "../../redux/actions.js"

export default function Favorites(props) {
	const { onClose } = props
	/* const [isOrder, setIsOrder] = useState("") */
	const myFavorites = useSelector(state => state.myFavorites)

	const dispatch = useDispatch()
	function handleOrder(e) {
		dispatch(orderCards(e.target.value))
		setIsOrder(e.target.value)
	}
	function handleFilter(e) {
		dispatch(filterCards(e.target.value))
	}

	/* 	useEffect(() => {
		if (isOrder === "A") {
			dispatch(orderCards("A"))
		} else if (isOrder === "D") {
			dispatch(orderCards("D"))
		}
	}, [isOrder]) */

	return (
		<>
			{!myFavorites.length ? null : (
				<div className="fav-selects">
					<div className="order-container">
						<h3 htmlFor="order">Sort by order</h3>
						<select name="order" id="order" onChange={handleOrder}>
							<option value="" disabled readOnly>
								&#40;Select an option &#41;
							</option>
							<option value="A">Ascendent</option>
							<option value="D">Descendent</option>
						</select>
					</div>
					<div className="gender-container">
						<h3 htmlFor="gender">Sort by gender</h3>
						<select name="gender" id="gender" onChange={handleFilter}>
							<option value="" disabled readOnly>
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
			<div className="Favorites">
				{!myFavorites.length ? (
					<div className="no-favorites">
						<h2>NO FAVORITES CHARACTERS TO SHOW</h2>
						<span className="no-favorites__blackHeart">🖤</span>
						<p>
							You can add favorites <br /> by clicking on the{" "}
							<span className="no-favorites__redHeart">❤️</span> of the
							character card
						</p>
					</div>
				) : (
					myFavorites.map(favCharacter => {
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
					})
				)}
			</div>
		</>
	)
}
