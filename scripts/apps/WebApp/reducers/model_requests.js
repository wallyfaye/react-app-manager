import { 
	STARTING_MODEL_REQUESTS, 
	ENDING_MODEL_REQUESTS
} from './../actions/actionTypes'

export const model_requests = (state = {
	isFetching: false,
	didFetch: {}
}, action) => {

	switch(action.type){

		case STARTING_MODEL_REQUESTS:
			return Object.assign({}, state, {
				isFetching: true
			})
		break;

		case ENDING_MODEL_REQUESTS:

			return Object.assign({}, state, {
				isFetching: false,
				didFetch: {
					...state.didFetch,
					[action.path]: null
				}
			})
			
		break;

		default:
			return state;
		break;

	}

}