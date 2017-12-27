import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { 
	build_app_routes
} from './WebAppRoutes.js'

const WebAppRoot = ({ store, history, page_types = {}, elements = {}, api_root_url = null }) => {

	const these_app_routes = build_app_routes({
		page_types: page_types,
		elements: elements,
		api_root_url: api_root_url
	});

	return (
		<Provider store={store}>
			<div>
				<Router history={history} routes={these_app_routes} />
			</div>
		</Provider>
	)
}

WebAppRoot.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default WebAppRoot