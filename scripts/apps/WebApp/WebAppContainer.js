import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import MainMenuApp from './../MainMenuApp/components/MainMenuApp.js'
import MobileMenuApp from './../MobileMenuApp/components/MobileMenuApp.js'

import { get_page_id, each, slugify } from './../../helpers'

import { get_model_data } from './actions/actionCreators'

class WebAppContainer extends Component {

	shouldComponentUpdate(nextProps){

		const { ownProps } = this.props;

		// assume we don't update
			var should_update = false;

		// get current and next location information
			var this_location = this.props.children.props.location;
			var next_location = nextProps.children.props.location;
			var this_page_pathname = this_location.pathname;
			var next_page_pathname = next_location.pathname;

		// check if page paths match
			var page_paths_match = (this_page_pathname == next_page_pathname);

		// if the page paths do not match, rerender
			if(!page_paths_match){
				should_update = true;
			}

		return should_update;

	}

	componentDidMount(){

		this.fetchData();

	}

	componentDidUpdate(prevProps, prevState){

		this.fetchData();

	}

	render_elements(elements = null){

		if(elements == null){
			return (
				<div></div>
			)
		} else {
			let elements_array = [];
			each(elements, (value_elements, index_elements) => {
				elements_array.push(React.createElement(value_elements.component));
			});
			return elements_array;
		}

	}


	fetchData(){

		const { 
			routes,
			dispatch,
			model_requests
		} = this.props;

		const this_route_data = routes[1];
		const model_is_not_fetching = model_requests.isFetching == false;
		const path_models_not_fetched_yet = typeof model_requests.didFetch[this_route_data.path] === 'undefined';


		if(model_is_not_fetching && path_models_not_fetched_yet){

			// get models needed for this routes
				const models_to_fetch = {};

			// get models from page_type
				each(this_route_data.page_type.models, (value_models, index_models) => {
					models_to_fetch[slugify(value_models.name, '_')] = value_models;
				});

			// get model from elements
				if(this_route_data.elements != null){
					each(this_route_data.elements, (value_elements, index_elements) => {
						each(value_elements.models, (value_models, index_models) => {
							models_to_fetch[slugify(value_models.name)] = value_models;
						});
					});
				}

			// pull remote data
			    dispatch(get_model_data({
			    	api_root_url: this_route_data.api_root_url,
			    	path: this_route_data.path,
			    	model_requests: Object.values(models_to_fetch)
			    }));

		}

	}

	render(){

		const current_page_id = get_page_id();
		const { 
			children, 
			routes,
			feed_data
		} = this.props;

		const this_route_data = routes[1];

		return(
			<div className={"WebAppContainer " + current_page_id}>
				<header>
					<div className="container height100percent">
						<div className="logo height100percent">
							<div className="displayTable height100percent">
								<div className="displayTableCell">
									<Link to={'/' + js_default_page}>
										<img src={js_logo} alt={js_company_name} />
									</Link>
								</div>
							</div>
						</div>
						<div className="menu">
							<MainMenuApp />
						</div>
						<div className="height100percent MobileMenuApp">
							<MobileMenuApp />
						</div>
					</div>
				</header>
				<main>
					{this.render_elements(this_route_data.elements)}
					<ReactCSSTransitionGroup
						component="div"
						transitionName="web_app"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={600}
					>
						{React.cloneElement(children, {
							key: "a_" + Date.now()
						})}
					</ReactCSSTransitionGroup>
				</main>
				<footer>
					<div className="container height100percent">FooterApp</div>
				</footer>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		feed_data: state.feed_data,
		model_requests: state.model_requests
	}
}

export default connect(mapStateToProps)(WebAppContainer)