import {
	REQUESTING_MODEL_DATA,
	RECEIVING_MODEL_DATA,
	STARTING_MODEL_REQUESTS,
	ENDING_MODEL_REQUESTS
} from './actionTypes'

import fetch from 'isomorphic-fetch'
import { slugify } from "./../../../helpers/index.js"

require('es6-promise').polyfill();

const startingModelRequests = (path) => {
	return {
		type: STARTING_MODEL_REQUESTS,
		path: path
	}
}

const endingModelRequests = (path) => {
	return {
		type: ENDING_MODEL_REQUESTS,
		path: path
	}
}

const receivingModelData = (params = {}) => {
	
	const {
		name,
		api_path,
		full_set,
		resolve,
		reject,
		json_data
	} = params;

	resolve();

	return {
		type: RECEIVING_MODEL_DATA,
		model: slugify(name, '_'),
		data: json_data
	}

}

const receiveModelData = (params = {}) => {

	const {
		name,
		api_path,
		full_set,
		resolve,
		reject,
		json_data
	} = params;

	return (dispatch) => {
		dispatch(receivingModelData(params));
	}

}

const requestingModelData = () => {
	return {
		type: REQUESTING_MODEL_DATA
	}
}

const requestModelData = (params = {}) => {

	const {
		name,
		api_path,
		full_set,
		resolve,
		reject,
		api_root_url
	} = params;

	return (dispatch) => {

		dispatch(requestingModelData());
		return fetch(api_root_url + api_path)
		.then(response => response.json())
		.then((json) => {
			dispatch(receiveModelData({
				...params,
				json_data: json
			}));
		});

	}

}

export const get_model_data = (params = {}) => {

	const { model_requests, path, api_root_url } = params;

	return (dispatch, getState) => {

		dispatch(startingModelRequests(path));

		const model_promises = [];

		model_requests.forEach((value_model_requests) => {

			let existing_models = getState().feed_data;
			let model_request_slug = slugify(value_model_requests.name, '_');
			let model_data_saved = (typeof existing_models[model_request_slug] !== 'undefined');

			if(!model_data_saved){

				const this_promise = new Promise((resolve, reject) => { 
					
					dispatch(requestModelData({
						...value_model_requests,
						api_root_url: api_root_url,
						resolve: resolve,
						reject: reject
					}));
					
				});

				model_promises.push(this_promise)

			}

		})

		Promise.all(model_promises).then(values => { 

			dispatch(endingModelRequests(path));

		}, reason => {

		});

	}

}