import axios from "axios"
import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types"

/* export function addFav(character) {
	return {
		type: ADD_FAV,
		payload: character
	}
} */

export const addFav = character => {
	const endpoint = "http://localhost:3001/rickandmorty/fav"
	return async dispatch => {
		/*axios.post(endpoint, character)
       .then(({ data }) => {
			return dispatch({
				type: ADD_FAV,
				payload: data
			})
		}) */

		try {
			const { data } = await axios.post(endpoint, character)
			const charactersFav = data
			return dispatch({
				type: ADD_FAV,
				payload: charactersFav
			})
		} catch (error) {}
	}
}

/* export function removeFav(id) {
	return {
		type: REMOVE_FAV,
		payload: id
	}
} */

export const removeFav = id => {
	const endpoint = "http://localhost:3001/rickandmorty/fav/" + id
	return async dispatch => {
		// axios.delete(endpoint).then(({ data }) => {
		// 	return dispatch({
		// 		type: REMOVE_FAV,
		// 		payload: data
		// 	})
		// })
		try {
			const { data } = await axios.delete(endpoint)
			return dispatch({
				type: REMOVE_FAV,
				payload: data
			})
		} catch (error) {}
	}
}

export function filterCards(gender) {
	return {
		type: FILTER,
		payload: gender
	}
}

export function orderCards(order) {
	return {
		type: ORDER,
		payload: order
	}
}
