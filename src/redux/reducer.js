import { ADD_FAV, REMOVE_FAV } from "./action-types"

const initialState = {
	myFavorites: []
}

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case ADD_FAV: {
			return {
				...state,
				myFavorites: [...state.myFavorites, payload]
			}
		}

		case REMOVE_FAV: {
			const filteredCharacters = state.myFavorites.filter(
				char => char.id !== Number(payload)
			)
			return {
				...state,
				myFavorites: filteredCharacters
			}
		}

		default:
			return { ...state }
	}
}
