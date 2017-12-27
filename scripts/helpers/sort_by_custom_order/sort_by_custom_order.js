export function sort_by_custom_order(array){
	array.sort(function (a, b) {
		let a_test = parseInt(a.custom_order);
		let b_test = parseInt(b.custom_order);

		if(a_test < b_test){
			return -1;
		}

		if(a_test > b_test){
			return 1;
		}

		return 0;
	})
}