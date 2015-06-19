(function() {



window.onload = function() {

    CORE.create_module('filters-bar', function(sb) {
        var filters;

        return {
            init: function() {
                filters = sb.findAll('li');

                sb.addEvent(filters, 'click', this.ajaxRequest);
            },
            destroy: function() {},
            ajaxRequest: function(e) {
                var filterClicked = e.currentTarget.getAttribute('id');

                sb.notify({
                    type: 'change-filter',
                    data: filterClicked
                });
            }
        };
    });


    CORE.create_module

    CORE.startAll();
};



}());


