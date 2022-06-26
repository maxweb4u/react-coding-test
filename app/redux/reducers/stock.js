/**
 * Created by Max Gornostayev on 06/26/22
 *
 * stock reducers, that process next actions: DATA_LOAD, DATA_CLEAN, SET_CONNECTION_STATUS
 *
 */

import types from '../types/stock';

// initial state with default values
const initialState = {
    connectionStatus: false,
    data: [],
    beforeLastObj: {}
};

// stock ticker reduce
const stockTicker = (state = initialState, action) => {
    switch (action.type) {
        case types.DATA_LOAD: return  {...state, data: [action.payload].concat(state.data), beforeLastObj: state.data.length ? state.data[0] : {} };
        case types.DATA_CLEAR: return  {...state, data: [], beforeLastObj: {} };
        case types.SET_CONNECTION_STATUS: return  {...state, connectionStatus: action.payload };
        default: return state;
    }
};

export default stockTicker;
