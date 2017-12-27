export function unescape_html(string){
	var map = {
		'&amp;': '&',
		'&#038;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#x27;': "'",
		'&#x60;': '`'
	};
	var escaper = function(match) {
		return map[match];
	};
	var source = '(?:' + Object.keys(map).join('|') + ')';
	var testRegexp = RegExp(source);
	var replaceRegexp = RegExp(source, 'g');

	string = string == null ? '' : '' + string;
	var result = testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	
	return result;
}

// "test&amp;test".replace(RegExp('(?:&amp;|&lt;|&gt;|&quot;|&#x27;|&#x60;)', 'g'), function(match) {
// 		var map = {
// 			'&amp;': '&',
// 			'&lt;': '<',
// 			'&gt;': '>',
// 			'&quot;': '"',
// 			'&#x27;': "'",
// 			'&#x60;': '`'
// 		};
// 		return map[match];
// })