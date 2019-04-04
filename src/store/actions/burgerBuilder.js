import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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
    return dispatch => {
        axios.get('/ingredients.json')
           .then(response => {
               dispatch(setIngredients(response.data));
           })
           .catch(error => {
               dispatch(fetchIngredientsFaild());
           });
    }
}
