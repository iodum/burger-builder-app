import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
     state = {
         ingredients: {
             salad: 0,
             bacon: 0,
             cheese: 0,
             meat: 0
         },
         totalPrice: 4,
         purchasable: false,
         purchasing: false,
         loading: false
     }

     updatePurchaseState (ingredients) {
         const sum = Object.values(ingredients)
                .reduce((sum, el) => sum + el, 0);
         this.setState({
             purchasable: sum > 0
         });
     }

     addIngredientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         const updatedCounted = oldCount + 1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCounted;
         const priceAddition = INGREDIENT_PRICES[type];
         const newPrice = this.state.totalPrice + priceAddition;
         this.setState({
             ingredients: updatedIngredients,
             totalPrice: newPrice
         });
         this.updatePurchaseState(updatedIngredients);
     }

     removeIngredientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         if ( oldCount <= 0 ) {
             return;
         }
         const updatedCounted = oldCount - 1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCounted;
         const priceDeduction= INGREDIENT_PRICES[type];
         const newPrice = this.state.totalPrice - priceDeduction;
         this.setState({
             ingredients: updatedIngredients,
             totalPrice: newPrice
         });
         this.updatePurchaseState(updatedIngredients);
     }

     purchaseHandler = () => {
         this.setState({
             purchasing: true
         })
     }

     purchaseCancelHandler = () => {
         this.setState({
             purchasing: false
         })
     }

     purchaseContinueHandler = () => {
         this.setState({loading: true});
         const order = {
             ingredients: this.state.ingredients,
             price: this.state.totalPrice,
             customer: {
                 name: 'Person',
                 adress: {
                     street: 'sdg',
                     zipCode: '213',
                     country: 'Germany'
                 },
                 email: 'test@test.com'
             },
             deliveryMethod: 'fasttest'
         }
         axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
     }

     render () {
         const disableInfo = {
             ...this.state.ingredients
         };
         for (let key in disableInfo) {
             disableInfo[key] = disableInfo[key] <= 0;
         }
         let orderSummary = <OrderSummary
                 ingredients={this.state.ingredients}
                 purchaseCancel={this.purchaseCancelHandler}
                 purchaseContinue={this.purchaseContinueHandler}
                 price={this.state.totalPrice}/>;
         if ( this.state.loading ) {
             orderSummary = <Spinner />
         }
         return (
             <Fragment>
                <Modal  show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdd={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    />
             </Fragment>
         );
     }
 }

export default withErrorHandler(BurgerBuilder, axios);
