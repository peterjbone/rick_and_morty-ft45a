import { ADD_FAV, FILTER, ORDER, REMOVE_FAV, GET_FAV } from "./action-types.js";

const initialState = {
	myFavorites: [], //? los favoritos filtrados
	allCharacters: [] //? todos los favoritos
};

function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case ADD_FAV:
			return {
				...state,
				myFavorites: payload,
				allCharacters: payload
			};

		case REMOVE_FAV:
			return {
				...state,
				myFavorites: payload,
				allCharacters: payload
			};

		case GET_FAV:
			return {
				...state,
				myFavorites: payload,
				allCharacters: payload
			};

		case FILTER: {
			if (payload === "All") {
				return {
					...state,
					myFavorites: [...state.allCharacters]
				};
			} else {
				const filteredFavs = state.allCharacters.filter(
					(char) => char.gender === payload
				);

				return {
					...state,
					myFavorites: filteredFavs
				};
			}
		}

		case ORDER: {
			const favsCopy = [...structuredClone(state.myFavorites)];

			if (payload === "A") {
				favsCopy.sort((a, b) => a.id - b.id);
			}
			if (payload === "D") {
				favsCopy.sort((a, b) => b.id - a.id);
			}

			return {
				...state,
				myFavorites: favsCopy
			};
		}

		default:
			return { ...state };
	}
}

export default reducer;
