import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGRIDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFaild = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGRIDIENTS
    }
}
