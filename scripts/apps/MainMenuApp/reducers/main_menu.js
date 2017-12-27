import {
	REQUESTING_PAGE_LIST,
	RECEIVING_PAGE_LIST
} from './../actions/actionTypes'

export const main_menu = (state = {
	fetching_page_list: false,
	pages_received: false
}, action) => {
	
	switch(action.type){

		case REQUESTING_PAGE_LIST:

			return Object.assign({}, state, {
				fetching_page_list: action.fetching_page_list
			});

		break;

		case RECEIVING_PAGE_LIST:

			return Object.assign({}, state, {
				fetching_page_list: action.fetching_page_list,
				pages_received: true
			});

		break;

		default:

			return state;

		break;

	}

}