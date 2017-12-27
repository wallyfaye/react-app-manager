export const each = (object, callback = function(){} ) => {
    var this_key_array = Object.keys(object);
    this_key_array.forEach(function(value){
        callback(object[value], value)
    });
}