import {
	REQUESTING_PAGE_LIST,
	RECEIVING_PAGE_LIST
} from './actionTypes'

import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();

function requestingPageList(){
	return {
		type: REQUESTING_PAGE_LIST,
		fetching_page_list: true
	}
}

function receivingPageList(menu_pages){
	return {
		type: RECEIVING_PAGE_LIST,
		fetching_page_list: false,
		menu_pages: menu_pages
	}
}

function receivePageList(data){

	const sanitizePages = function(menu_pages_to_sanitize){

		const sanitized_menu_pages = [];
		let last_menu_parent = [];

		const recursive_parent_finder = function(menu_child){

			if(last_menu_parent.length == 0){

				sanitized_menu_pages.push(menu_child);
				last_menu_parent.unshift(menu_child)

			} else if (last_menu_parent[0].id == menu_child.menu_item_parent) {

				last_menu_parent[0].submenu_pages.push(menu_child);
				last_menu_parent.unshift(menu_child)

			} else {

				last_menu_parent = last_menu_parent.slice(1, last_menu_parent.length);
				recursive_parent_finder(menu_child);

			}

		}

		menu_pages_to_sanitize.forEach((value_menu_page) => {

			const this_menu_item = value_menu_page;
			this_menu_item['submenu_pages'] = [];

			recursive_parent_finder(this_menu_item);

		});

		return sanitized_menu_pages;

	}

	const menu_pages = sanitizePages(data);

	return (dispatch) => {
		dispatch(receivingPageList(menu_pages));
	}
}

function requestPageList(){
	return (dispatch) => {
		dispatch(requestingPageList());
		return fetch('//some_remote_resource/api/menu')
		.then(response => response.json())
		.then(json => dispatch(receivePageList(json)))
	}
}

export function fetchPageList(){
	return (dispatch, getState) => {
		let pages_received = getState().main_menu.pages_received;
		let fetching_page_list = getState().main_menu.fetching_page_list;
		if(!pages_received && !fetching_page_list){
			dispatch(requestPageList());
		}
	}
}