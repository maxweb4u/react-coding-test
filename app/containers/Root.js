/**
 * Created by Max Gornostayev on 06/26/22
 *
 * root container for application
 * it depends on environment, if env is not production, then we show dev tool for better developing
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import HomePage from '../pages/HomePage';
import DevTools from './DevTools';
import config from '../config';
import '../styles/app.scss';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <Route path="/" component={HomePage}/>
                </ConnectedRouter>
                {!config.isProduction && <DevTools />}
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
