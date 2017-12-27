export const get_image_data = (wp_image_data) => {
	return {
		image_background_position: (typeof wp_image_data.background_position === "undefined") ? 'center center' : wp_image_data.image_background_position,
		image_url: wp_image_data.guid,
		image_id: wp_image_data.ID
	}
}