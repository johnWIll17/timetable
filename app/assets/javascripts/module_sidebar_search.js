CORE.createModule('sidebar-search', function(sb) {
    //local variabels
    var searchBox;

    //local functions
    var ajaxRequest = function(e) {
        sb.notify({
            type: 'search-item',
            data: e.target.value
        });
    };

    //return module_object
    return {
        init: function() {
            searchBox = sb.query('#search-box');

            searchBox.addEventListener('keyup', ajaxRequest);
        }
    };
});

