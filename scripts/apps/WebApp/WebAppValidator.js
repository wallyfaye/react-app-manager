import React from 'react'
import { each } from './../../helpers'

export default class WebAppValidator {

	constructor(){
		this.validator_error = '';
	}

	validate_page_paths(page_types){
		var that = this;
		var page_types_valid = true;

		if(Object.keys(page_types).length == 0){
			that.validator_error = 'validate_page_paths';
			return false;
		}

		if(typeof page_types.default === 'undefined'){
			that.validator_error = 'validate_page_paths';
			return false;
		}

		each(page_types, (value_page_types) => {

			var this_path = value_page_types.paths;

			if(typeof this_path === 'string'){

			} else if (Array.isArray(this_path)){

				if(this_path.length == 0){
					page_types_valid = false;
					that.validator_error = 'validate_page_paths';
					return;
				} else {
					this_path.forEach((value_page_path) => {
						if(typeof value_page_path !== 'string'){
							page_types_valid = false;
							that.validator_error = 'validate_page_paths';
							return;
						}
					});
				}

			} else {

				page_types_valid = false;
				that.validator_error = 'validate_page_paths';
				return;

			}

		});
		
		return page_types_valid;

	}

	validate_document_element(document_element = null){
		var that = this;
		var is_valid = document_element != null && document_element instanceof HTMLElement;
		if(!is_valid){
			that.validator_error = 'validate_document_element';
		}
		return is_valid;
	}

	validate_page_components(page_types){

		var that = this;
		var page_types_valid = true;

		if(Object.keys(page_types).length == 0){
			that.validator_error = 'validate_page_components';
			return false;
		}

		if(typeof page_types.default === 'undefined'){
			that.validator_error = 'validate_page_components';
			return false;
		}

		each(page_types, (value_page_types) => {

			var this_component = value_page_types.component;

			if(typeof this_component === 'undefined'){
				page_types_valid = false;
				that.validator_error = 'validate_page_components';
				return;
			}

			if(!React.Component.isPrototypeOf(this_component)){
				page_types_valid = false;
				that.validator_error = 'validate_page_components';
				return;
			}


		});
		
		return page_types_valid;

	}

	validate_index_route(page_types){

		var that = this;
		var page_types_valid = true;
		var index_routes_found = 0;

		if(Object.keys(page_types).length == 0){
			that.validator_error = 'validate_index_route';
			return false;
		}

		if(typeof page_types.default === 'undefined'){
			that.validator_error = 'validate_index_route';
			return false;
		}

		each(page_types, (value_page_types) => {

			var this_isIndexRoute = value_page_types.isIndexRoute;
			if(typeof this_isIndexRoute !== 'undefined' && typeof this_isIndexRoute === 'boolean' && this_isIndexRoute){
				index_routes_found++;
			} else if (typeof this_isIndexRoute !== 'undefined' && typeof this_isIndexRoute !== 'boolean'){
				that.validator_error = 'validate_index_route';
				page_types_valid = false;
				return;
			}

		});
		
		var is_valid = (page_types_valid && index_routes_found == 1);
		if(!is_valid){
			that.validator_error = 'validate_index_route';
		}

		return is_valid;

	}

	validate_elements(elements = {}){
		var that = this;
		var is_valid = true;

		each(elements, (value_elements, index_elements) => {
			if(
				typeof value_elements.component === 'undefined' || 
				!React.Component.isPrototypeOf(value_elements.component)
			){
				is_valid = false;
				return;
			}

			if(
				typeof value_elements.paths === 'undefined' || 
				typeof value_elements.paths !== 'object' || 
				(Object.keys(value_elements.paths).length === 0 && value_elements.paths.constructor === Object)
			){
				is_valid = false;
				return;
			}
		})

		if(!is_valid){
			that.validator_error = 'validate_elements';
		}
		return is_valid;
	}

	validate_api_root(api_root_url = null){
		var that = this;
		var is_valid = true;

		if(api_root_url == null || typeof api_root_url !== 'string' || api_root_url.charAt(api_root_url.length - 1) == '/'){
			that.validator_error = 'validate_api_root';
			is_valid = false;
		}

		return is_valid;
	}

	validate_params(params = {}){

		var that = this;
		var params_valid = true;

		const {
			document_element = null,
			typekit_kitId = null,
			page_types = {},
			elements = {},
			api_root_url = null
		} = params;

		if(
			!that.validate_document_element(document_element) ||
			!that.validate_page_paths(page_types) ||
			!that.validate_page_components(page_types) ||
			!that.validate_index_route(page_types) ||
			!that.validate_elements(elements) ||
			!that.validate_api_root(api_root_url) 
		){
			params_valid = false;
		}

		if(params_valid){
			return {
				params_valid: true,
				params: params
			};
		} else {
			return {
				params_valid: false,
				validator_error: that.validator_error
			};
		}

	}

}