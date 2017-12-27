export const external_url = function(urlRequest){
	return (urlRequest.indexOf("http:") == -1 && urlRequest.indexOf("https:") == -1) ? "http://" + urlRequest : urlRequest;
}