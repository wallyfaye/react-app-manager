import React, { Component } from 'react'
import SlideshowContainer from './../containers/SlideshowContainer'

class SlideshowApp extends Component{

	render(){

		const { 
			slide_items, 
			id, 
			slide_time, 
			popup = false, 
			thumbnails = false 
		} = this.props;
		return(
			<div>
				<SlideshowContainer id={id} slide_items={slide_items} slide_time={slide_time} popup={popup} thumbnails={thumbnails} />
			</div>
		);

	}

}

export default SlideshowApp