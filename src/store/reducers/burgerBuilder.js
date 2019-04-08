import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.3
};

const addIngredient = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat

        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientsFaild = (state, action) => {
    return updateObject( state, { error: true } )
}

const reducer = (state = initialState, action)  => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGRIDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGRIDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGRIDIENTS_FAILED: return fetchIngredientsFaild(state, action);
        default: return state;
    }
}

export default reducer;
