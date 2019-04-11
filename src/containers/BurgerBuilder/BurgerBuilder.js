import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

     const updatePurchaseState = (ingredients) => {
         const sum = Object.values(ingredients)
                .reduce((sum, el) => sum + el, 0);
         return sum > 0
     }

     const purchaseHandler = () => {
         if ( props.isAuth ) {
             setPurchasing(true );
         } else {
             props.onSetAuthRedirectPath('checkout');
             props.history.push('/auth');
         }
     }

     const purchaseCancelHandler = () => setPurchasing(false)

     const purchaseContinueHandler = () => {
         props.onInitPurchase();
         props.history.push('/checkout');
     }

     const disableInfo = {
         ...props.ingr
     };
     for (let key in disableInfo) {
         disableInfo[key] = disableInfo[key] <= 0;
     }
     let orderSummary = null;
     let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

     if ( props.ingr ) {
         burger = (
             <Fragment>
                 <Burger ingredients={props.ingr} />
                 <BuildControls
                     ingredientAdd={props.onIngredientAdd}
                     ingredientRemove={props.onIngredientRemove}
                     disabled={disableInfo}
                     purchasable={updatePurchaseState(props.ingr)}
                     ordered={purchaseHandler}
                     price={props.price}
                     isAuth={props.isAuth}
                     />
             </Fragment>
         );
         orderSummary = <OrderSummary
             ingredients={props.ingr}
             purchaseCancel={purchaseCancelHandler}
             purchaseContinue={purchaseContinueHandler}
             price={props.price}/>;
     }
     return (
         <Fragment>
            <Modal  show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
         </Fragment>
     );
 }

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onFetchIngredientsFaild: () => dispatch(actions.fetchIngredientsFaild()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
