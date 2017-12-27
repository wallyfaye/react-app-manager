import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPageList } from './../../MainMenuApp/actions/actionCreators'
import PageList from './../components/PageList'

class PageListContainer extends Component {

	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(fetchPageList());
	}

	render() {

		const { menu_pages } = this.props;

		return(
			<PageList menu_pages={menu_pages} />
		)

	}

}

PageListContainer.propTypes = {
	dispatch: PropTypes.func.isRequired
}

const mapStatetoProps = (state) => {

	return {
		menu_pages: state.feed_data.menu_pages,
		main_menu: state.main_menu
	}

}

export default connect(mapStatetoProps)(PageListContainer)