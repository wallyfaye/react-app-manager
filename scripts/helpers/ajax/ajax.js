var ajax = {
	get: function(url_request, callback){
		var request = new XMLHttpRequest();

		request.open('GET', url_request, true);

		request.onload = function() {
			callback(request);
		};

		request.send();
	}
}

export var get = ajax.get