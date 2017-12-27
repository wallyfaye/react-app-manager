import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
	renderSlideshow, 
	playSlideshow, 
	stopSlideshow, 
	goToNextSlide, 
	goToPrevSlide, 
	goToSlide,
	openPopup,
	closePopup
} from './../actions/actionCreators'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import BasicSlider from './../components/BasicSlider'
import PopupSlider from './../components/PopupSlider'

class SlideshowContainer extends Component {

// REACT METHODS

	constructor(props) {
		super();
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.goto = this.goto.bind(this);
		this.build_goto = this.build_goto.bind(this);
		this.launchPopup = this.launchPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.renderPopupImage = this.renderPopupImage.bind(this);
	}

	componentDidMount() {

		const { dispatch, slide_items, id, slide_time } = this.props;
		dispatch(renderSlideshow(id, slide_items, slide_time));

	}

	componentDidUpdate(prevProps) {

		const { dispatch, slide_items, id, slide_time } = this.props;

		if(prevProps.slide_items.toString() != slide_items.toString()){
			dispatch(renderSlideshow(id, slide_items, slide_time));
		}

	}

	componentWillUnmount(){

		const { dispatch, id } = this.props;
		dispatch(stopSlideshow(id));

	}

// SLIDESHOW NAVIGATION METHODS

	play(e){
		e.stopPropagation();
		
		const { dispatch, id, slide_time } = this.props;
		dispatch(playSlideshow(id, slide_time));

	}

	stop(e){
		e.stopPropagation();
		
		const { dispatch, id } = this.props;
		dispatch(stopSlideshow(id));

	}

	next(e){
		e.stopPropagation();
		
		const { dispatch, id } = this.props;
		dispatch(stopSlideshow(id));
		dispatch(goToNextSlide(id));

	}

	prev(e){
		e.stopPropagation();
		
		const { dispatch, id } = this.props;
		dispatch(stopSlideshow(id));
		dispatch(goToPrevSlide(id));

	}

	goto(index){
		const { dispatch, id } = this.props;

		dispatch(stopSlideshow(id));
		dispatch(goToSlide(id, index));

	}

// SLIDESHOW DOM METHODS

	build_goto(slideshow, current_index, enable_thumbnails){

		const gotoArray = [];
		
		if(enable_thumbnails){

			slideshow.slides.forEach((value_slide, value_index) => {

				const image_styles = {
					backgroundPosition: value_slide.image_background_position,
					backgroundImage: 'url(' + value_slide.image_url + ')',
					backgroundSize: 'cover'
				}

				let active_thumbnail = (
					<div style={image_styles} className="thumb_active slideshow_thumb">
						<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg"></svg>
					</div>
				);

				let inactive_thumbnail = (
					<div style={image_styles} className="slideshow_thumb">
						<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg"></svg>
					</div>
				)

				let returnObject = (
					<div 
					key={value_index} 
					className={"goto" + (current_index == value_index ? " currentSlide " : "")} 
					onClick={(e) => {
						e.stopPropagation();
						this.goto(value_index)
					}}>
						{(current_index == value_index ? active_thumbnail : inactive_thumbnail)}
					</div>
				);
				gotoArray.push(returnObject)
			});

		} else {

			slideshow.slides.forEach((value_slide, value_index) => {
				let returnObject = (
					<div 
					key={value_index} 
					className={"goto" + (current_index == value_index ? " currentSlide " : "")} 
					onClick={(e) => {
						e.stopPropagation();
						this.goto(value_index)
					}}>
						{(current_index == value_index ? <i className="fa fa-circle-o" aria-hidden="true"></i> : <i className="fa fa-circle" aria-hidden="true"></i>)}					
					</div>
				);
				gotoArray.push(returnObject)
			});

		}

		return gotoArray;
	}

// SLIDESHOW POPUP METHODS

	launchPopup(e) {
		e.stopPropagation();
		const { dispatch, slide_items, id, slide_time } = this.props;
		dispatch(stopSlideshow(id));
		dispatch(openPopup(id));

	}

	closePopup(e) {
		e.stopPropagation();
		const { dispatch, slide_items, id, slide_time } = this.props;
		dispatch(stopSlideshow(id));
		dispatch(closePopup(id));

	}

	renderPopupImage(image_layout, image_url, image_text){

		const image_layout_class = ' ' + image_layout + ' ';

		switch(image_layout){
			case "portrait":
				return(
					<div className="displayTable">
						<div className="displayTableCell">
							<div className="image_popup_block" onClick={this.next}>
								<img className={image_layout_class} src={image_url} alt="" key={"i_p_" + Date.now()}/>
								<div className="popup_text_block" dangerouslySetInnerHTML={{__html: image_text}} />
							</div>
						</div>
					</div>

				)		
			break;

			case "landscape":
				return(
					<div className="displayTable">
						<div className="displayTableCell">
							<div className="image_popup_block" onClick={this.next}>
								<img className={image_layout_class} src={image_url} alt="" key={"i_p_" + Date.now()}/>
								<div className="popup_text_block" dangerouslySetInnerHTML={{__html: image_text}} />
							</div>
						</div>
					</div>
				)		
			break;
		}

	}

// REACT RENDER

	render() {

		const { id, popup, thumbnails, slide_items = [] } = this.props;
		const this_slideshow = (typeof this.props.slideshows[id] === "undefined") ? null : this.props.slideshows[id];
		const isPlaying = (this_slideshow == null) ? false : this_slideshow.isPlaying;
		const popupOpen = (this_slideshow == null) ? false : this_slideshow.popupOpen;
		const index = (this_slideshow == null) ? null : this_slideshow.index;
		const this_slide = (this_slideshow == null || typeof index === 'undefined') ? null : this_slideshow.slides[index];
		const image_url = (this_slide == null) ? null : this_slide.image_url;
		const image_background_position = (this_slide == null || typeof this_slide.image_background_position === "undefined") ? 'center center' : this_slide.image_background_position;
		const text = (this_slide == null) ? null : this_slide.image_text;
		const image_styles = {
			backgroundPosition: image_background_position,
			backgroundImage: 'url(' + image_url + ')'
		}
		const id_class = " " + id + " ";
		const popup_id_class = " popup_" + id + " ";
		const is_playing_class = isPlaying ? " isPlaying " : "";
		const hide_controls_class = (slide_items.length > 1) ? '' : ' displayNone ';

		if(image_url != null){

			if(popup){

				const args = {
					this_slide: this_slide,
					is_playing_class: is_playing_class,
					id_class: id_class,
					popup_id_class: popup_id_class,
					image_background_position: image_background_position,
					image_url: image_url,
					this_slideshow: this_slideshow,
					index: index,
					text: text,
					popupOpen: popupOpen,
					build_goto: this.build_goto,
					play: this.play,
					stop: this.stop,
					prev: this.prev,
					next: this.next,
					launchPopup: this.launchPopup,
					closePopup: this.closePopup,
					renderPopupImage: this.renderPopupImage,
					enable_thumbnails: thumbnails,
					hide_controls_class: hide_controls_class
				}

				return (
					<PopupSlider {...args} />
				)

			} else {

				const args = {
					is_playing_class: is_playing_class,
					id_class: id_class,
					image_background_position: image_background_position,
					image_url: image_url,
					this_slideshow: this_slideshow,
					index: index,
					text: text,
					build_goto: this.build_goto,
					play: this.play,
					stop: this.stop,
					prev: this.prev,
					next: this.next,
					enable_thumbnails: thumbnails,
					hide_controls_class: hide_controls_class
				}

				return (
					<BasicSlider {...args} />
				)

			}

		} else {
			return (
				<div></div>
			)
		}

	

	}

}

const mapStateToProps = (state) => {

	return {
		slideshows: state.slideshows
	}

}

export default connect(mapStateToProps)(SlideshowContainer)
