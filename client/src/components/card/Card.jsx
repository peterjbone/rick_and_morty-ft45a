import "./Card.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addFav, removeFav } from "../../redux/actions"

export default function Card(props) {
	const { onClose, name, id, image, character } = props
	const redHeart = "❤️",
		blackHeart = "🖤"

	const dispatch = useDispatch()
	const [isFav, setIsFav] = useState(false)
	function handleFavorite() {
		if (isFav) {
			setIsFav(false)
			dispatch(removeFav(id))
		} else {
			setIsFav(true)
			dispatch(addFav(character))
		}
	}

	const myFavorites = useSelector(state => state.myFavorites)
	useEffect(() => {
		myFavorites.forEach(fav => {
			if (fav.id === id) {
				setIsFav(true)
			}
		})
	}, [myFavorites])

	return (
		<div className="card" data-dark>
			<button onClick={() => onClose(id)} id="closeBtn">
				X
			</button>

			{isFav ? (
				<button
					onClick={handleFavorite}
					id="favBtn"
					style={{ backgroundColor: "#000" }}>
					{redHeart}
				</button>
			) : (
				<button
					onClick={handleFavorite}
					id="favBtn"
					style={{ backgroundColor: "crimson" }}>
					{blackHeart}
				</button>
			)}

			<Link key={id} to={`/detail/${id}`}>
				<img src={image} alt={name} />
				<span className="card-id">ID: {id}</span>
				<div className="card-name-container">
					<span className="card-name-label">Name:</span>
					<span className="card-name">{name}</span>
				</div>
			</Link>
		</div>
	)
}
