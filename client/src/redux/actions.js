//* LAS ACTIONS SE ENCARGAN DE GUARDAR EN REDUX ESTADO GLOBAL Y POSTGRESQL BD

import axios from "axios";
import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types";

export const addFav = (character) => {
	console.log(character);
	const endpoint = "http://localhost:3001/rickandmorty/fav";
	return async (dispatch) => {
		const { data } = await axios.post(endpoint, character);
		console.log(data);
		return dispatch({
			type: ADD_FAV,
			payload: data
		});
	};
};

export const removeFav = (id) => {
	//console.log(id)
	const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
	return async (dispatch) => {
		const { data } = await axios.delete(endpoint);
		//console.log(data)
		return dispatch({
			type: REMOVE_FAV,
			payload: data
		});
	};
};

export function filterCards(gender) {
	return {
		type: FILTER,
		payload: gender
	};
}

export function orderCards(order) {
	return {
		type: ORDER,
		payload: order
	};
}
