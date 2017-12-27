import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class PopupSlider extends Component {

	render(){

		const {
			this_slide,
			is_playing_class,
			id_class,
			popup_id_class,
			image_background_position,
			image_url,
			this_slideshow,
			index,
			text,
			build_goto,
			play,
			stop,
			prev,
			next,
			popupOpen,
			launchPopup,
			closePopup,
			renderPopupImage,
			enable_thumbnails
		} = this.props;

		const image_layout = (this_slide.width/this_slide.height >= 1) ? 'landscape' : 'portrait';
		const image_layout_class = ' ' + image_layout + ' ';

		const popupVisibilityClass = (popupOpen) ? '' : ' visibilityHidden ';

		const image_styles = {
			backgroundPosition: image_background_position,
			backgroundImage: 'url(' + image_url + ')'
		}

		const thumbnailsClass = (enable_thumbnails) ? ' thumbnails ' : '';

		return (
			<div>
				<div className={"image_slideshow popup_enabled " + is_playing_class + id_class} onClick={launchPopup}>
					<div className="image">
						<ReactCSSTransitionGroup
						component="div"
						transitionName="slideshow"
						transitionEnterTimeout={1000}
						transitionLeaveTimeout={1000}>
							<div className='image_slide' style={image_styles} key={"i_" + Date.now()}></div>
						</ReactCSSTransitionGroup>
					</div>
					<div className="image_text">
						<div className={"index_picker" + thumbnailsClass}>
							{( (this_slideshow != null) ? build_goto(this_slideshow, index, enable_thumbnails) : '')}
						</div>
						<div className="image_text_block" dangerouslySetInnerHTML={{__html: text}} />
					</div>
					<div className="image_controls">
						<div className="prev_next">
							<div className="play" onClick={play}>play</div>
							<div className="stop" onClick={stop}>stop</div>
							<div className="prev" onClick={prev}>
								<div className="displayTable height100percent width100percent">
									<div className="displayTableCell">
										<i className="fa fa-angle-left" aria-hidden="true"></i>
									</div>
								</div>
							</div>
							<div className="next" onClick={next}>
								<div className="displayTable height100percent width100percent">
									<div className="displayTableCell">
										<i className="fa fa-angle-right" aria-hidden="true"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={"image_slideshow_popup " + popupVisibilityClass} onClick={closePopup}>
					<div className="displayTable height100percent width100percent">
						<div className="displayTableCell">
							<div className="image_slideshow_block">
								<div className={"image_slideshow " + is_playing_class + popup_id_class}>
									<div className={"image" + image_layout_class}>
										<ReactCSSTransitionGroup
										component="div"
										transitionName="slideshow_popup"
										transitionEnterTimeout={1000}
										transitionLeaveTimeout={1000}>
											<div className="popupImageBlock">
												{renderPopupImage(image_layout, image_url, text)}
											</div>
										</ReactCSSTransitionGroup>
									</div>
									<div className="image_text">
										<div className={"index_picker" + thumbnailsClass}>
											{( (this_slideshow != null) ? build_goto(this_slideshow, index, enable_thumbnails) : '')}
										</div>
									</div>
									<div className="image_controls">
										<div className="prev_next">
											<div className="play" onClick={play}>play</div>
											<div className="stop" onClick={stop}>stop</div>
											<div className="prev" onClick={prev}>
												<div className="displayTable height100percent width100percent">
													<div className="displayTableCell">
														<i className="fa fa-angle-left" aria-hidden="true"></i>
													</div>
												</div>
											</div>
											<div className="next" onClick={next}>
												<div className="displayTable height100percent width100percent">
													<div className="displayTableCell">
														<i className="fa fa-angle-right" aria-hidden="true"></i>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		)


	}

}

export default PopupSlider

