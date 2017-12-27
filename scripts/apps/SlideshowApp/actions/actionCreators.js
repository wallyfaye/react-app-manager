import { 
	ADD_SLIDESHOW, 
	PLAYING_SLIDESHOW, 
	STOPPING_SLIDESHOW,
	GOING_TO_NEXT_SLIDE,
	GOING_TO_PREV_SLIDE,
	GOING_TO_SLIDE,
	OPENING_POPUP,
	CLOSING_POPUP
} from './actionTypes'

let slideshow_intervals = {};

function addSlideshow(id, slide_items){

	return {
		type: ADD_SLIDESHOW,
		slides: slide_items,
		id: id
	}

}

function playingSlideshow(id){

	return {
		type: PLAYING_SLIDESHOW,
		isPlaying: true,
		id: id
	}

}

function stoppingSlideshow(id){

	return {
		type: STOPPING_SLIDESHOW,
		isPlaying: false,
		id: id
	}

}

function goingToNextSlide(id){

	return {
		type: GOING_TO_NEXT_SLIDE,
		id: id
	}

}

function goingToPrevSlide(id){

	return {
		type: GOING_TO_PREV_SLIDE,
		id: id
	}

}

function goingToSlide(id, index){

	return {
		type: GOING_TO_SLIDE,
		id: id,
		index: index
	}

}

function openingPopup(id){
	return {
		type: OPENING_POPUP,
		id: id
	}
}

function closingPopup(id){
	return {
		type: CLOSING_POPUP,
		id: id
	}
}

export function openPopup(id){
	return (dispatch) => {
		dispatch(openingPopup(id));
	}
}

export function closePopup(id){
	return (dispatch) => {
		dispatch(closingPopup(id));
	}
}

export function goToNextSlide(id){

	return (dispatch) => {
		dispatch(goingToNextSlide(id));
	}

}

export function goToPrevSlide(id){

	return (dispatch) => {
		dispatch(goingToPrevSlide(id));
	}

}

export function goToSlide(id, index){

	return (dispatch) => {
		dispatch(goingToSlide(id, index));
	}

}

export function playSlideshow(id, slide_items = [], slide_time = 1000){

	return (dispatch) => {

		if(typeof slideshow_intervals[id] !== "undefined" || slideshow_intervals[id] != null){
			dispatch(stopSlideshow(id));
		}

		if(slide_items.length > 1){
			slideshow_intervals[id] = setInterval(function(){
				dispatch(goToNextSlide(id))
			}, slide_time);
		}

		dispatch(playingSlideshow(id));
	}

}

export function stopSlideshow(id){

	return (dispatch) => {

		clearInterval(slideshow_intervals[id]);
		slideshow_intervals[id] = null;
		dispatch(stoppingSlideshow(id))

	}

}

export function renderSlideshow(id, slide_items, slide_time){
	return (dispatch) => {
		if(slide_items.length > 0){
			dispatch(addSlideshow(id, slide_items));
			if(id != 'main_slider' || true){
				dispatch(playSlideshow(id, slide_items, slide_time));
			}
		}
	}
}
