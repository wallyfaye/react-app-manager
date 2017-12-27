import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class DefaultPageContainer extends Component {

	componentDidMount(){
		
		const { dispatch } = this.props;

	}

	render(){

		const { feed_data } = this.props;

		return(
			<div>DefaultPageContainer</div>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		feed_data: state.feed_data
	}
}

export default connect(mapStateToProps)(DefaultPageContainer)