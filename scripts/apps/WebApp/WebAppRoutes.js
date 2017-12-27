import React, { Component } from 'react'
import { Route, Link, IndexRoute, Redirect } from 'react-router'

import WebAppContainer from './WebAppContainer.js'

import { each } from './../../helpers'

class DemoApp extends Component {
	render(){
		return(
			<div>
				<p>DEMO APP</p>
			</div>
		)
	}
}

export const app_routes = (

	<Route path="/" component={WebAppContainer}>

		<IndexRoute component={DemoApp} />

		<Route path={"/portfolio"} component={DemoApp} />
		<Route path={"/portfolio/:projectSlug"} component={DemoApp} />

		<Route path="*" component={DemoApp} />

	</Route>
	
);

const return_basic_route = (params = {}) => {

	const { 
		path = null, 
		component = null,
		elements = null,
		page_type = null,
		api_root_url = null
	} = params;

	return (
		<Route api_root_url={api_root_url} path={path} component={component} elements={elements} page_type={page_type} />
	)

}

const return_index_route = (params = {}) => {

	const { 
		component = null,
		elements = null,
		page_type = null,
		api_root_url = null
	} = params;

	return (
		<IndexRoute api_root_url={api_root_url} path={'*'} component={component} elements={elements} page_type={page_type} />
	)

}

const build_element_path_hashmap = (elements = {}) => {
	var element_path_map = {};
	each(elements, (value_elements, index_elements) => {
		var path_array = value_elements.paths;
		each(path_array, (value_path_array, index_path_array) => {
			if(typeof element_path_map[index_path_array] === 'undefined'){
				element_path_map[index_path_array] = {};
			}
			element_path_map[index_path_array][index_elements] = value_elements;
		})
	});
	return element_path_map;
}

const build_page_types_path_hashmap = (page_types = {}) => {
	var page_type_path_map = {};
	each(page_types, (value_page_types, index_page_types) => {
		var path_array = (typeof value_page_types.paths === 'string') ? [value_page_types.paths] : value_page_types.paths;
		each(path_array, (value_path_array) => {
			if(typeof page_type_path_map[value_path_array] === 'undefined'){
				page_type_path_map[value_path_array] = {};
			}
			page_type_path_map[value_path_array] = {
				...value_page_types,
				page_type_slug: index_page_types
			};
		})
	});
	return page_type_path_map;
}


const build_routes_from_page_types = (params = {}) => {

	const { 
		page_types = {},
		elements = {},
		api_root_url = null
	} = params;

	const page_routes = [];
	var index_route_found = false;
	var wildcard_route_found = false;

	const element_path_map = build_element_path_hashmap(elements);
	const page_types_path_map = build_page_types_path_hashmap(page_types);

	each(page_types, (value_page_types, index_page_types) => {

		var route_added = false;
		var path_array = (typeof value_page_types.paths === 'string') ? [value_page_types.paths] : value_page_types.paths;

		// check if route is index route
			if(typeof value_page_types.isIndexRoute !== 'undefined' && value_page_types.isIndexRoute){
				// ensure index route is not already declared
					if(!index_route_found){
						// if no index route already declared, add as an index route
							index_route_found = true;
							page_routes.push(return_index_route({
								component: value_page_types.component,
								elements: (typeof element_path_map['*'] === 'undefined') ? null : element_path_map['*'],
								page_type: (typeof page_types_path_map['*'] === 'undefined') ? null : page_types_path_map['*'],
								api_root_url: api_root_url
							}));
					}
			}

		// check this page type's paths
			path_array.forEach((value_path_array) => {
				
				var this_paths_elements = (typeof element_path_map[value_path_array] === 'undefined') ? null : element_path_map[value_path_array];
				var this_paths_page_type = (typeof page_types_path_map[value_path_array] === 'undefined') ? null : page_types_path_map[value_path_array];

				// check if route is wildcard
					if(value_path_array == '*'){
						// ensure wildcard is not already declared
							if(!wildcard_route_found){
								// if no wildcard already declared, add as a basic route
									wildcard_route_found = true;
									page_routes.push(return_basic_route({
										path: value_path_array, 
										component: value_page_types.component,
										elements: this_paths_elements,
										page_type: this_paths_page_type,
										api_root_url: api_root_url
									}));
									route_added = true;
							}
					}

				// if not added yet add this route
					if(!route_added){
						page_routes.push(return_basic_route({
							path: value_path_array, 
							component: value_page_types.component,
							elements: this_paths_elements,
							page_type: this_paths_page_type,
							api_root_url: api_root_url
						}));
					}


			});

	});

	return page_routes;

}

export const build_app_routes = (params) => {
	
	const { 
		page_types = {},
		elements = {},
		api_root_url = null
	} = params;

	const default_page = page_types.default;
	const page_routes = build_routes_from_page_types({
		page_types: page_types,
		elements: elements,
		api_root_url: api_root_url
	});

	if(page_routes.length == 0){
		return;
	}

	return(
		<Route path="/" component={WebAppContainer}>

			{page_routes}

		</Route>
	);

}