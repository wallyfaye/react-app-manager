import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleMobileMenu } from './../actions/actionCreators'
import PageListContainer from './../containers/PageListContainer'

class MobileMenuApp extends Component {

	constructor(){
		super();
		this.toggle_mobile_menu = this.toggle_mobile_menu.bind(this);
	}

	toggle_mobile_menu(){
		const { dispatch } = this.props;
		dispatch(toggleMobileMenu(this.props.mobile_menu.isVisible));
	}

	render(){
		const displayMobileMenu = (this.props.mobile_menu.isVisible) ? "" : " displayNone ";
		return(

			<div className="height100percent">
				<div className="mobile_menu_toggle height100percent" onClick={this.toggle_mobile_menu}>
					<div className="displayTable height100percent">
						<div className="displayTableCell">
							<button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>
					</div>								
				</div>
				<div className={" mobile_menu " + displayMobileMenu} onClick={this.toggle_mobile_menu}>
					<div className="mobile_menu_close"></div>
					<nav className="mobileMenu">
						<PageListContainer />
					</nav>
				</div>
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		mobile_menu: state.mobile_menu
	}
}

export default connect(mapStateToProps)(MobileMenuApp)