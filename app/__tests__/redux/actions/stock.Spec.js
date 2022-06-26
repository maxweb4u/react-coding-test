import chai, { expect } from 'chai';
import chaiReduxMockStore from 'chai-redux-mock-store';
import configureStore from 'redux-mock-store';
import types from '../../../redux/types/stock';

chai.use(chaiReduxMockStore);

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Redux logic - stock actions', () => {
    it('DATA_LOAD action', () => {
        const store = mockStore();
        const payload = {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            price: '112.88',
            change: '74.03',
            change_percent: '0.52',
            last_trade_time: '2022-06-26T16:24:31.000Z',
            dividend: '0.98',
            yield: '0.85',
        };
        store.dispatch({ type: types.DATA_LOAD, payload });
        const action = store.getActions();
        expect(action[0].payload.price).to.eq('112.88');
        expect(action[0].type).to.eq(types.DATA_LOAD);
    });

    it('DATA_CLEAR action', () => {
        const store = mockStore();
        store.dispatch({ type: types.DATA_LOAD, payload: {} });
        store.dispatch({ type: types.DATA_CLEAR });
        const action = store.getActions();
        expect(action[1].type).to.eq(types.DATA_CLEAR);
    });

    it('SET_CONNECTION_STATUS action', () => {
        const store = mockStore();
        store.dispatch({ type: types.SET_CONNECTION_STATUS, payload: true });
        const action = store.getActions();
        expect(action[0].payload).to.true;
        expect(action[0].type).to.eq(types.SET_CONNECTION_STATUS);
    });
});
