import {createStore,applyMiddleware} from 'redux';
import {newsReducer} from './rootReducer'
import thunk from 'redux-thunk';

const store = createStore(newsReducer,applyMiddleware(thunk));

export default store;