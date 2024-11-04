//* LAS ACTIONS SE ENCARGAN DE GUARDAR EN REDUX ESTADO GLOBAL Y MONGODB

import axios from "axios";
import { FILTER, ORDER, ADD_FAV, REMOVE_FAV, GET_FAV } from "./action-types";
const apiBackUrl = import.meta.env.VITE_BACK_URL;

export const addFav = (character) => {
	const endpoint = `${apiBackUrl}/fav`;
	return async (dispatch) => {
		const { data } = await axios.post(endpoint, character);

		return dispatch({
			type: ADD_FAV,
			payload: data.reverse()
		});
	};
};

export const removeFav = (id) => {
	const endpoint = `${apiBackUrl}/fav/${id}`;
	return async (dispatch) => {
		const { data } = await axios.delete(endpoint);

		return dispatch({
			type: REMOVE_FAV,
			payload: data
		});
	};
};

export const getFav = () => {
	const endpoint = `${apiBackUrl}/fav`;
	return async (dispatch) => {
		const { data } = await axios.get(endpoint);
		return dispatch({
			type: GET_FAV,
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
