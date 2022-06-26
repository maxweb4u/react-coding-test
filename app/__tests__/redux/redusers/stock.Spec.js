import { expect } from 'chai';
import reducer from '../../../redux/reducers/stock';
import types from '../../../redux/types/stock';

describe('Redux logic - stock reducer', () => {
    const firstObj = {
        ticker: 'AAPL',
        exchange: 'NASDAQ',
        price: '112.88',
        change: '74.03',
        change_percent: '0.52',
        last_trade_time: '2022-06-26T16:24:31.000Z',
        dividend: '0.98',
        yield: '0.85',
    };

    const secondObj = {
        ticker: 'AAPL',
        exchange: 'NASDAQ',
        price: '283.63',
        change: '195.34',
        change_percent: '0.09',
        last_trade_time: '2022-06-26T16:24:26.000Z',
        dividend: '0.12',
        yield: '1.26',
    };

    it('should process DATA_LOAD', () => {
        const initialState = reducer(undefined, {});
        const firstState = reducer(initialState, {type: types.DATA_LOAD, payload: firstObj});
        const secondState = reducer(firstState, {type: types.DATA_LOAD, payload: secondObj});

        expect(secondState.data).to.be.eql([secondObj, firstObj]);
    });

    it('should process DATA_CLEAR', () => {
        const initialState = reducer(undefined, {});
        const firstState = reducer(initialState, {type: types.DATA_LOAD, payload: firstObj});
        const secondState = reducer(firstState, {type: types.DATA_LOAD, payload: secondObj});
        const clearState = reducer(secondState, {type: types.DATA_CLEAR});

        expect(clearState.data).to.be.eql([]);
    });

    it('should process SET_CONNECTION_STATUS', () => {
        const initialState = reducer(undefined, {});
        expect(initialState.connectionStatus).to.be.false;

        const state = reducer(initialState, {type: types.SET_CONNECTION_STATUS, payload: true});
        expect(state.connectionStatus).to.be.true;
    });

    it('should get initial state', () => {
        const state = reducer(undefined, {});
        expect(state.connectionStatus).to.be.false;
        expect(state.data.length).to.be.eq(0);
        expect(state.beforeLastObj).to.be.eql({});
    });
});
