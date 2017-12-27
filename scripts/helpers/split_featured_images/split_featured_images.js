export const split_featured_images = (featured_images_string) => {
	const featured_image_array = [];

	const temp_array = featured_images_string.split(',');
	temp_array.forEach((value_temp_array) => {
		if(value_temp_array != ''){
			featured_image_array.push(value_temp_array);
		}
	})

	return featured_image_array;
}