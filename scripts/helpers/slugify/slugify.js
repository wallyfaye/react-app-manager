export function slugify(text, replacer = '-'){
    return text.toString().toLowerCase()
    .replace(/\+/g, '') // Replace spaces with
    .replace(/\&+/g, '') // Remove all ampersands
    .replace(/\s+/g, replacer) // Replace spaces with -
    .replace(/[^\w\-]+/g, replacer) // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, replacer) // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}