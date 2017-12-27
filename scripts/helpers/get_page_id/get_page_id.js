export function get_page_id(){
	const current_page_id = window.location.href.replace(window.location.origin + '/', '').split('/')[0];
	return current_page_id;
}