import {compose, createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import rootReducer from '../utils/utils.redux.rootReducer';

const createAppStore = compose(
	applyMiddleware(thunkMiddleware),
)(createStore);

export default function configureStore(initialState){
	const store = createAppStore(rootReducer, initialState);

	return store;
};