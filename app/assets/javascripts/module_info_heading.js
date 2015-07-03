CORE.createModule('info-heading', function(sb) {
    var infoHeading;
        //ajaxObj = sb.helperObj['ajaxObj'].instance;

    var ajaxRequest = function(e) {
        if (e.target.nodeName === 'SPAN') {
            var dataId = e.target.getAttribute('data-id'),
                data = {
                    'data-id': dataId,
                    'data-button-click': 'ok-icon'
                };

            sb.notify({
                type: 'click-ok-icon',
                data: data
            });
            // sb.ajaxObj.listSubjectDetails(data);
        };
    };

    return {
        init: function() {
            infoHeading = sb.query('#info-heading');
            infoHeading.addEventListener('click', ajaxRequest);
        }
    };
});

