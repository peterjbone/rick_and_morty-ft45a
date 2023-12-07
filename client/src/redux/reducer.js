import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types"
import axios from "axios"

const initialState = {
	myFavorites: [],
	allCharacters: []
}

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		/* 		case ADD_FAV: {
			return {
				...state,
				allCharacters: [...state.myFavorites, payload],
				myFavorites: [...state.myFavorites, payload]
			}
		} */
		case ADD_FAV:
			return {
				...state,
				myFavorites: payload,
				allCharacters: payload
			}

		/* 	case REMOVE_FAV: {
			const removedCharacters = state.allCharacters.filter(
				char => char.id !== Number(payload)
			)
			return {
				...state,
				allCharacters: removedCharacters,
				myFavorites: removedCharacters
			}
		} */

		case REMOVE_FAV:
			return { ...state, myFavorites: payload }

		case FILTER: {
			if (payload === "All")
				return {
					...state,
					myFavorites: [...state.allCharacters]
				}
			const filteredFavs = state.allCharacters.filter(
				char => char.gender === payload
			)
			return {
				...state,
				myFavorites: filteredFavs
			}
		}

		case ORDER: {
			const favsCopy = [...structuredClone(state.myFavorites)]
			if (payload === "A") {
				favsCopy.sort((a, b) => a.id - b.id)
			}
			if (payload === "D") {
				favsCopy.sort((a, b) => b.id - a.id)
			}

			return {
				...state,
				myFavorites: favsCopy
			}
		}

		default:
			return { ...state }
	}
}
