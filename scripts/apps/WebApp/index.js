import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import WebAppRoot from './WebAppRoot.js'
import configureStore from './WebAppStores.js'

import WebAppValidator from './WebAppValidator.js'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

class WebApp {

	constructor(params = {}){

		const this_validator = new WebAppValidator();
		const validated_params = this_validator.validate_params(params);

		if(!validated_params.params_valid){
			console.error('WebApp configuration error: params in main.js are not valid');
			console.error('WebApp validation faild at:', validated_params.validator_error);
			return;
		}

		const that = this;
		const {
			document_element = null,
			typekit_kitId = null,
			page_types = {},
			elements = {},
			api_root_url = null
		} = validated_params.params;


		that.load_typekit({
			typekit_kitId: typekit_kitId,
			done_func: function(font_did_load){
				that.start_up({
					document_element: document_element,
					page_types: page_types,
					elements: elements,
					api_root_url: api_root_url
				});
			}
		});

	}

	load_typekit(params = {}){

		const { 
			done_func = false,
			typekit_kitId = null
		} = params;


		if(!done_func || typekit_kitId == null || typeof typekit_kitId !== 'string'){
			done_func(false);
			return;
		}

		var typekit_config = {
			kitId: typekit_kitId,
			scriptTimeout: 1000,
			loading: function() {
			},
			active: function() {
				done_func(true);
			},
			inactive: function() {
				done_func(false);
			}
		};

		var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},typekit_config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+typekit_config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(typekit_config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s);

	}

	start_up(params){

		const {
			document_element = null,
			page_types = {},
			elements = {},
			api_root_url = null
		} = params;

		render(
			<WebAppRoot store={store} history={history} page_types={page_types} elements={elements} api_root_url={api_root_url} />,
			document_element
		)

	}
}

export default WebApp