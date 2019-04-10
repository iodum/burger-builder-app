import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';


export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams )
        const fetchOrders = [];
        for (let key in response.data) {
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}

export function* removeOrderSaga(action) {
    yield put(actions.fetchOrdersStart());
    try {
        yield axios.delete('/orders/' + action.id + '.json?auth=' + action.token);
        yield put(actions.removeOrderSuccess(action.id));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}
