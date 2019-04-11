import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders = <Spinner />
    if ( !props.loading ) {
        orders = (
            <div>
                {props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        removed={() => props.onOrderRemove(order.id, props.token)} />
                ))}
            </div>
        );
    }
    return orders;
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId)),
        onOrderRemove: (id, token) => dispatch(actions.removeOrder(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
