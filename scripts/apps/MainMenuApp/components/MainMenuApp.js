import React, { Component } from 'react'
import PageListContainer from './../containers/PageListContainer'

class MainMenuApp extends Component {
	
	render() {

		return (
			<div className="MainMenuApp">
				<div className="displayTable height100percent">
					<div className="displayTableCell">
						<nav className="mainMenu">
							<PageListContainer />
						</nav>
					</div>
				</div>
			</div>
		)

	}

}

export default MainMenuApp