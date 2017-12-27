import { slugify } from './../../helpers'

const update_filter_dom = ({ active_element_slug = null }) => {

    let elems = document.querySelectorAll(".ProjectTypeButton");

    [].forEach.call(elems, function(this_element) {

        this_element.classList.remove("project_type_active");

        if(active_element_slug == slugify(this_element.innerHTML)){
            this_element.className += " project_type_active"; 
        }

    });

}

export const render_isotope = ( { window_variable_name, on_change_callback = function(){}, on_init_callback = function(){}, default_filter = '' } ) => {

    if(typeof document.getElementsByClassName("grid")[0] !== "undefined"){


        window[window_variable_name] = new Isotope( '.grid', {
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            filter: (default_filter == 'all-projects' || default_filter == '') ? '*' : default_filter
        });

        window[window_variable_name].once( 'layoutComplete', function() {
            
            update_filter_dom({
                active_element_slug: default_filter
            })

            filter_isotope({
                window_variable_name: window_variable_name,
                filterValue: (default_filter == 'all-projects' || default_filter == '') ? '*' : default_filter
            });

            on_init_callback();

        });

        window[window_variable_name].arrange();

        var filtersElem = document.querySelector('.project_type_filters');

        filtersElem.addEventListener( 'click', function( event ) {

            update_filter_dom({
                active_element_slug: slugify(event.target.innerHTML)
            })

            filter_isotope({
                window_variable_name: window_variable_name,
                filterValue: event.target.getAttribute('data-filter')
            });
			
			on_change_callback(event.target);

        });

    }


}

export const filter_isotope = ( { window_variable_name, filterValue = '*' } ) => {
    
    update_filter_dom({
        active_element_slug: (filterValue == '*') ? 'all-projects' : filterValue
    })

    filterValue = (filterValue == 'all-projects' || filterValue == '*') ? '*' : '._' + filterValue;

    window[window_variable_name].arrange({ filter: filterValue });

}