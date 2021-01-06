import * as actionTypes from '../actions/actionsTypes';

const initialState = {
	ingredients: {},
	totalPrice: 0,
	error: false
};

const INGREDIENTS_PRICE = {
	salad: 0.1,
	cheese: 1,
	bacon: 2.3,
	meat: 2.5
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients
			}
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			}
		default:
			return state;
	}
};

export default reducer;
