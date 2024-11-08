//* LAS ACTIONS SE ENCARGAN DE GUARDAR EN REDUX ESTADO GLOBAL Y MONGODB

import axios from "axios";
import {
	FILTER,
	ORDER,
	ADD_FAV,
	REMOVE_FAV,
	GET_FAV,
	SAVE_USER
} from "./action-types";
//const apiBackUrl = import.meta.env.VITE_BACK_URL;
const apiBackUrl = process.env.VITE_BACK_URL;

export const addFav = (info) => {
	const endpoint = `${apiBackUrl}/fav`;
	return async (dispatch) => {
		const { data } = await axios.post(endpoint, info);

		return dispatch({
			type: ADD_FAV,
			payload: data
		});
	};
};

export const removeFav = (favId, userId) => {
	const endpoint = `${apiBackUrl}/fav?favid=${favId}&userid=${userId}`;
	return async (dispatch) => {
		const { data } = await axios.delete(endpoint);

		return dispatch({
			type: REMOVE_FAV,
			payload: data
		});
	};
};

export const getFav = (userId) => {
	const endpoint = `${apiBackUrl}/fav?id=${userId}`;
	return async (dispatch) => {
		const { data } = await axios.get(endpoint);
		return dispatch({
			type: GET_FAV,
			payload: data
		});
	};
};

export const saveUser = (userId) => {
	return {
		type: SAVE_USER,
		payload: userId
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
