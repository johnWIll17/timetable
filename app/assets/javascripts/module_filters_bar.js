(function() {


var readyFunc = function() {

    CORE.createModule('filters-bar', function(sb) {
        //local variables
        var filters;

        //local functions
        var ajaxRequest = function(e) {
            var filterClicked = e.currentTarget.getAttribute('data-job');

            sb.notify({
                type: 'change-filter',
                data: filterClicked
            });
        };

        //return module_object
        return {
            init: function() {
                filters = sb.findAll('li');
                // sb.addEvent(filters, 'click', this.ajaxRequest);
                sb.addEvent(filters, 'click', ajaxRequest);
            }
        };
    });

    // CORE.startAllObj();
    CORE.startAll();
};

document.addEventListener('DOMContentLoaded', readyFunc);

}());



