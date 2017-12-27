import { 
	ADD_SLIDESHOW,
	PLAYING_SLIDESHOW,
	STOPPING_SLIDESHOW,
	GOING_TO_NEXT_SLIDE,
	GOING_TO_PREV_SLIDE,
	GOING_TO_SLIDE,
	OPENING_POPUP,
	CLOSING_POPUP
} from './../actions/actionTypes'

const slideshow = (state = {
	isPlaying: false,
	index: 0,
	popupOpen: false
}, action) => {

	switch(action.type){

		case ADD_SLIDESHOW:

			return Object.assign({}, state, {
				id: action.id,
				slides: action.slides
			});

		break;

		default:

			return state;

		break;

	}

}

export const slideshows = (state = {}, action) => {

	switch(action.type){

		case ADD_SLIDESHOW:

			return Object.assign({}, state, {
				[action.id]: slideshow(undefined, action)
			});

		break;

		case PLAYING_SLIDESHOW:
		case STOPPING_SLIDESHOW:

			return Object.assign({}, state, {
				[action.id]: {
					...state[action.id],
					isPlaying: action.isPlaying
				}
			});

		break;

		case GOING_TO_NEXT_SLIDE:

			var this_slideshow = state[action.id];
			var current_index = this_slideshow.index;
			var next_index = (current_index + 1 > this_slideshow.slides.length - 1) ? 0 : current_index + 1;

			return Object.assign({}, state, {
				[action.id]: {
					...this_slideshow,
					index: next_index
				}
			});

		break;

		case GOING_TO_PREV_SLIDE:

			var this_slideshow = state[action.id];
			var current_index = this_slideshow.index;
			var prev_index = (current_index - 1 < 0) ? this_slideshow.slides.length - 1 : current_index - 1;

			return Object.assign({}, state, {
				[action.id]: {
					...this_slideshow,
					index: prev_index
				}
			});

		break;

		case GOING_TO_SLIDE:

			var this_slideshow = state[action.id];
			var current_index = this_slideshow.index;
			var goto_index = (typeof this_slideshow.slides[action.index] === "undefined") ? current_index : action.index;

			return Object.assign({}, state, {
				[action.id]: {
					...this_slideshow,
					index: goto_index
				}
			});

		break;

		case OPENING_POPUP:

			var this_slideshow = state[action.id];
			var current_index = this_slideshow.index;
			var goto_index = (typeof this_slideshow.slides[action.index] === "undefined") ? current_index : action.index;

			return Object.assign({}, state, {
				[action.id]: {
					...this_slideshow,
					popupOpen: true
				}
			});

		break;

		case CLOSING_POPUP:

			var this_slideshow = state[action.id];
			var current_index = this_slideshow.index;
			var goto_index = (typeof this_slideshow.slides[action.index] === "undefined") ? current_index : action.index;

			return Object.assign({}, state, {
				[action.id]: {
					...this_slideshow,
					popupOpen: false
				}
			});

		break;

		default:

			return state;

		break;

	}

}