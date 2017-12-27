import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class BasicSlider extends Component {

	render(){
		const {
			is_playing_class,
			id_class,
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
			hide_controls_class = ''
		} = this.props;

		const image_styles = {
			backgroundPosition: image_background_position,
			backgroundImage: 'url(' + image_url + ')'
		}

		return (
			<div className={"image_slideshow " + is_playing_class + id_class}>
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
					<div className={"index_picker" + hide_controls_class}>
						{( (this_slideshow != null) ? build_goto(this_slideshow, index) : '')}
					</div>
					<div className="image_text_block" dangerouslySetInnerHTML={{__html: text}} />
				</div>
				<div className={"image_controls" + hide_controls_class}>
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
		)
	}

}

export default BasicSlider

