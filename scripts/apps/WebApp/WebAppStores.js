import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import WebAppReducers from './WebAppReducers.js'
import DevTools from './WebAppDevTools'

var configureStore;
const router_middleware = routerMiddleware(browserHistory);

if(js_dev_mode == "true"){
	const loggerMiddleware = createLogger();

	configureStore = preloadedState => createStore(
		WebAppReducers,
		preloadedState,
		compose(
			applyMiddleware(thunkMiddleware, loggerMiddleware, router_middleware),
			DevTools.instrument()
			)
		)

} else {

	configureStore = preloadedState => createStore(
		WebAppReducers,
		preloadedState,
		compose(applyMiddleware(thunkMiddleware, router_middleware))
	)
}

export default configureStore
