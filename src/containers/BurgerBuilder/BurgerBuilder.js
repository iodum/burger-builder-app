import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
     state = {
         purchasing: false,
         loading: false,
         error: false
     }

     // componentDidMount() {
     // axios.get('/ingredients.json')
     //    .then(response => {
     //        this.setState({ingredients: response.data});
     //        this.updatePurchaseState(response.data);
     //    })
     //    .catch(error => {
     //        this.setState({error: true})
     //    });
     // }

     updatePurchaseState (ingredients) {
         const sum = Object.values(ingredients)
                .reduce((sum, el) => sum + el, 0);
         return sum > 0
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
         this.props.history.push('/checkout');
     }

     render () {
         const disableInfo = {
             ...this.props.ingr
         };
         for (let key in disableInfo) {
             disableInfo[key] = disableInfo[key] <= 0;
         }
         let orderSummary = null;
         if ( this.state.loading ) {
             orderSummary = <Spinner />
         }
         let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
         if ( this.props.ingr ) {
             burger = (
                 <Fragment>
                     <Burger ingredients={this.props.ingr} />
                     <BuildControls
                         ingredientAdd={this.props.onIngredientAdd}
                         ingredientRemove={this.props.onIngredientRemove}
                         disabled={disableInfo}
                         purchasable={this.updatePurchaseState(this.props.ingr)}
                         ordered={this.purchaseHandler}
                         price={this.props.price}
                         />
                 </Fragment>
             );
             orderSummary = <OrderSummary
                 ingredients={this.props.ingr}
                 purchaseCancel={this.purchaseCancelHandler}
                 purchaseContinue={this.purchaseContinueHandler}
                 price={this.props.price}/>;
         }
         return (
             <Fragment>
                <Modal  show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
             </Fragment>
         );
     }
 }

const mapStateToProps = state => {
    return {
        ingr: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch({type: actionTypes.ADD_INGRIDIENT, ingredientName: ingredientName}),
        onIngredientRemove: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGRIDIENT, ingredientName: ingredientName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
