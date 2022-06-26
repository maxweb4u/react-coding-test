/**
 * Created by Max Gornostayev on 06/26/22
 *
 * actions of the stock
 *
 */

import types from '../types/stock';

export const loadData = (data) => (dispatch) => {
    return dispatch({
        type: types.DATA_LOAD,
        payload: data,
    });
};

export const clearData = () => (dispatch) => {
    return dispatch({
        type: types.DATA_CLEAR,
    });
};

export const setConnectionStatus = (value) => (dispatch) => {
    return dispatch({
        type: types.SET_CONNECTION_STATUS,
        payload: value,
    });
};
