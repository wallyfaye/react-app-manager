import React, { PropTypes } from 'react'
import Page from './Page'
import { unescape_html } from "./../../../helpers/index.js"

const render_page_list = function (menu_pages_data) {
    var new_menu_pages = [];

    menu_pages_data.forEach(function (value_menu_pages_data, index_menu_pages_data) {

        var this_page_list = (<Page
            key={value_menu_pages_data.id}
            {...value_menu_pages_data}
        />);
        
        new_menu_pages.push(this_page_list)

    })

    return new_menu_pages;
}

const PageList = function ({menu_pages}) {

    var return_object;

    var render_page = function(this_page){
        var page_container_key = 'page_container_' + this_page.id;
        var this_page_title = unescape_html(this_page.title);
        if(this_page.submenu_pages.length > 0){
            return (
                <li className="page_container" key={page_container_key}>
                    <Page
                        key={this_page.id}
                        {...this_page}
                    />

                    <input type="checkbox" id={page_container_key} />
                    <label className="toggle_open" htmlFor={page_container_key}>
                        <div className="displayTable">
                            <div className="displayTableCell">
                                <span className="more"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                                <span className="back"><i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;&nbsp;{this_page_title}</span>
                            </div>
                        </div>
                    </label>

                    {render_menu_pages(this_page.submenu_pages)}
                </li>
            )

        } else {
            return (
                <li className="page_container" key={page_container_key}>
                    <Page
                        key={this_page.id}
                        {...this_page}
                    />
                </li>
            )
        }

    }

    var render_menu_pages = function(menu_pages){

        var loop_menu_pages = function(){

            var looped_menu_pages = [];

            menu_pages.forEach(function(value_menu_pages, index_menu_pages){
                looped_menu_pages.push(render_page(value_menu_pages))
            });

            return looped_menu_pages;

        }

        return (
            <ul className="page_list_container">
                {loop_menu_pages()}
            </ul>
        )

    }

    return render_menu_pages(menu_pages);

}

PageList.propTypes = {
    menu_pages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default PageList