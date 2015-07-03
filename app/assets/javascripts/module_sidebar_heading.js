CORE.createModule('sidebar-heading', function(sb) {
    var sidebarHeading;
        // ajaxObj = sb.helperObj['ajaxObj'].instance;

    var ajaxRequest = function(e) {
        if (e.target.nodeName === 'SPAN') {
            sb.notify({
                type: 'back-to-category',
                data: null
            });
        }
    };

    return {
        init: function() {
            sidebarHeading = sb.query('#sidebar-heading');

            sidebarHeading.addEventListener('click', ajaxRequest);
        }
    };
});
