import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { slugify, unescape_html } from "./../../../helpers"

const Page = function ({title, menu_item_parent}) {

	title = unescape_html(title);
	var page_link;
	var page_slug = slugify(title, '_');

	switch(page_slug){
		case 'vision':
			page_link = '/about-jbb';
		break;

		case 'experience':
			page_link = '/portfolio';
		break;

		default:
			page_link = '/' + page_slug;
		break;
	}

	return (
		<div className="page_link">
			<Link to={page_link}>
				{title}
			</Link>
		</div>
	)
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    menu_item_parent: PropTypes.string.isRequired
}

export default Page