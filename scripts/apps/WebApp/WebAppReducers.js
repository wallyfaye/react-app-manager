import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { each } from './../../helpers'

import { main_menu } from './../MainMenuApp/reducers/main_menu.js'
import { mobile_menu } from './../MobileMenuApp/reducers/mobile_menu.js'
import { model_requests } from './reducers/model_requests.js'
import { slideshows } from './../SlideshowApp/reducers/slideshows.js'

import { RECEIVING_PAGE_LIST } from './../MainMenuApp/actions/actionTypes'

import { REQUESTING_MODEL_DATA, RECEIVING_MODEL_DATA } from './actions/actionTypes'

const feed_data = (state = {
	menu_pages: []
}, action) => {
	
	switch(action.type){

		case RECEIVING_MODEL_DATA:
			const this_accessor = {};

			each(action.data, function (value_data, index_data) {
				var this_id = (typeof value_data.ID !== 'undefined') ? value_data.ID : value_data.id;
				this_accessor[this_id] = value_data;
			})
			
			return Object.assign({}, state, {
				[action.model]: action.data,
				[action.model + '_ids']: this_accessor
			});
		break;

		case RECEIVING_PAGE_LIST:

			return Object.assign({}, state, {
				menu_pages: action.menu_pages
			});

		break;

		default:

			return state;

		break;

	}

}

const WebAppReducers = combineReducers({
	feed_data,
	routing,
	main_menu,
	mobile_menu,
	model_requests,
	slideshows
})

export default WebAppReducers