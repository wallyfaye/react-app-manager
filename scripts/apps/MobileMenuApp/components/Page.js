import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { slugify, unescape_html } from "./../../../helpers/index.js"

const Page = function ({title, menu_item_parent}) {
	title = unescape_html(title);
	var page_link = '/' + slugify(title, '_');
	return (
		<div className="page_link">
			<Link to={page_link}>
				<div className="displayTable">
					<div className="displayTableCell">
						{title}
					</div>
				</div>
			</Link>
		</div>
	)
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    menu_item_parent: PropTypes.string.isRequired
}

export default Page