/**
 * Created by Max Gornostayev on 06/26/22
 *
 * root reduce that combine all reduces of the app
 *
 */

import { combineReducers } from 'redux';
import stock from './stock';

const rootReducer = combineReducers({
    stock,
});

export default rootReducer;
