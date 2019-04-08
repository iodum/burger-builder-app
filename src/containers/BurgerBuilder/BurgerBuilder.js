import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
     state = {
         purchasing: false
     }

     componentDidMount() {
         this.props.onInitIngredients();
     }

     updatePurchaseState (ingredients) {
         const sum = Object.values(ingredients)
                .reduce((sum, el) => sum + el, 0);
         return sum > 0
     }

     purchaseHandler = () => {
         if ( this.props.isAuth ) {
             this.setState({ purchasing: true });
         } else {
             this.props.onSetAuthRedirectPath('checkout');
             this.props.history.push('/auth');
         }
     }

     purchaseCancelHandler = () => {
         this.setState({
             purchasing: false
         })
     }

     purchaseContinueHandler = () => {
         this.props.onInitPurchase();
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
         let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
                         isAuth={this.props.isAuth}
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
