import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from '../../redux/configureStore';
import HomePage from '../../pages/HomePage';
import * as stockActions from '../../redux/actions/stock';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://test.com'});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };

describe('Pages components - HomePage', () => {
    let store;
    let wrapper;

    const obj = {
        ticker: 'AAPL',
        exchange: 'NASDAQ',
        price: '112.88',
        change: '74.03',
        change_percent: '0.52',
        last_trade_time: '2022-06-26T16:24:31.000Z',
        dividend: '0.98',
        yield: '0.85',
    };

    before(() => {
        store = configureStore({}, routerMiddleware(createBrowserHistory()));
        wrapper = mount(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );
    });

    it('should be rendered', () => {
        expect(wrapper.find(HomePage).length).to.be.eql(1);
    });

    it('should render the list when item is added through store', () => {
        store.dispatch(stockActions.loadData(obj));
        const el = wrapper.find(HomePage).find('.item .item-time');
        expect(el.text()).to.be.eql(obj.last_trade_time);
    });

    it('should render disconnect button', () => {
        store.dispatch(stockActions.setConnectionStatus(true));
        const el = wrapper.find(HomePage).find('.container-form .red');
        expect(el.length).to.be.eql(1);
    });
});
