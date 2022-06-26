/**
 * Created by Max Gornostayev on 06/26/22
 *
 * main function for creating the store, if env = dev that include devtools instrument
 *
 */

import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from '../containers/DevTools';
import config from '../config';

export function configureStore(initialState, middleware) {
    if (!config.isProduction) {
        return createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(thunkMiddleware, middleware),
                DevTools.instrument()
            )
        );
    }
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, middleware)
    );
}
