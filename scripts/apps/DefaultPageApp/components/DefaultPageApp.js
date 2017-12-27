import React, { Component } from 'react'

import DefaultPageContainer from './../containers/DefaultPageContainer'

class DefaultPageApp extends Component {

	render(){
		return(
			<div className="DefaultPageApp PageApp">
				<div>
					<DefaultPageContainer />
				</div>
			</div>
		)
	}
}

export default DefaultPageApp