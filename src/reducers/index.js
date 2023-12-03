import { ADD_FAVOURITE, ADD_MOVIES, ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT, REMOVE_FAVOURITE, SET_SHOW_FAVOURITES } from "../actions";
import { combineReducers } from "redux";

const initialMovieState = {
    list: [],
    favourites: [],
    showFavourites: false,
}

export function movies(state = initialMovieState, action) {
    /*
    if (action.type === ADD_MOVIES) {
        return {
            ...state,
            list: action.movies,
        }
    }
    return state;
    */

    // react community prefers switch case over if else
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies,
            }

        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites]
            }

        case REMOVE_FAVOURITE:
            const filteredArray = state.favourites.filter(
                movie => movie.title != action.movie.title
            );
            return {
                ...state,
                favourites: filteredArray,
            }

        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val,
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list]
            }
        default:
            return state;

    }
}

const initialSearchState = {
    result: {},
    showSearchResults: false,
};

export function search(state = initialSearchState, action) {

    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true,
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false,
            }
        default:
            return state;
    }
}


const initialRootState = {
    movies: initialMovieState,
    search: initialSearchState,
}

/*
export default function rootReducer(state = initialRootState, action) {
    return {
        movies: movies(state.movies, action),
        search: search(state.search, action),
    }
}
*/


export default combineReducers({
    movies: movies,
    search: search,
})
