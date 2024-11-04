import "./Card.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../redux/actions.js";

export default function Card({ character, id, name, image, onClose }) {
	//* add and remove favorites from redux
	//prettier-ignore
	const redHeart = "❤️", blackHeart = "🖤"
	const [isFav, setIsFav] = useState(false);
	const dispatch = useDispatch();

	function handleFavorite() {
		if (isFav) {
			setIsFav(false);
			dispatch(removeFav(id));
		} else {
			setIsFav(true);
			dispatch(addFav(character));
		}
	}

	//* MANTENER FAVORITOS AL MONTAR COMPONENTE
	const myFavorites = useSelector((state) => state.myFavorites);
	useEffect(() => {
		myFavorites.forEach((fav) => {
			if (fav.id === id) {
				setIsFav(true);
			}
		});
	}, [myFavorites]);

	//********************************** CARD COMPONENT
	return (
		<div className="card">
			{/* Boton de Cerrar */}
			<button onClick={() => onClose(id)} id="closeBtn">
				X
			</button>

			{/* Boton de Favorito */}
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

			{/* Resto de la card */}
			<Link key={id} to={`/detail/${id}`}>
				<img src={image} alt={name} />
				<span className="card-id">ID: {id}</span>
				<div className="card-name-container">
					<span className="card-name-label">Name:</span>
					<span className="card-name">{name}</span>
				</div>
			</Link>
		</div>
	);
}
