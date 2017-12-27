export const image_fill = (image_data) => {
	return {
		backgroundSize: 'cover',
		backgroundPosition: image_data.image_background_position,
		backgroundImage: 'url(' + image_data.image_url + ')'
	}
}

