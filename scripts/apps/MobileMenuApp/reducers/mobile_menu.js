import { 
	SHOWING_MOBILE_MENU, 
	HIDING_MOBILE_MENU, 
} from './../actions/actionTypes'

export const mobile_menu = (state = {
	isVisible: false
}, action) => {

	switch(action.type){

		case SHOWING_MOBILE_MENU:
			return Object.assign({}, state, {
				isVisible: true
			})
		break;

		case HIDING_MOBILE_MENU:
			return Object.assign({}, state, {
				isVisible: false
			})
		break;

		default:
			return state;
		break;

	}

}