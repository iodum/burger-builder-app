import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    if (props.ingr && !props.purchased) {
        summary = (
            <div>
                <CheckoutSummary
                    ingredients={props.ingr}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route
                    path={props.match.url + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(checkout);
