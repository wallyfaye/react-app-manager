import { 
	SHOWING_MOBILE_MENU, 
	HIDING_MOBILE_MENU, 
} from './actionTypes'

function hideMobileMenu(){

	return {
		type: HIDING_MOBILE_MENU,
		isVisible: false
	}

}

function showMobileMenu(){

	return {
		type: SHOWING_MOBILE_MENU,
		isVisible: true
	}

}

export function toggleMobileMenu(current_menu_visible){
	return (dispatch) => {
		if(current_menu_visible){
			dispatch(hideMobileMenu());
		} else {
			dispatch(showMobileMenu());
		}
	}
}