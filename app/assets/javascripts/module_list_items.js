CORE.createModule( 'list-items', function(sb) {
    // var ajaxObj = sb.helperObj['ajaxObj'].instance,

    //local variables
    var colorIconBg = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue', 'blueviolet', 'brown', 'burlywood', 'cardetblue', 'chocolate', 'cornflowerblue', 'darkolivegreen'];

    var sidebarItems = sb.query('#list-items'),
        apiUrlCategories = 'api/v1/categories',
        apiUrlSubjects = 'api/v1/subjects';


    //local functions



    //callback functions
    var createCategories = function(xhr) {
        var responseObject = JSON.parse(xhr.responseText),
            statusHtml = '',
            i = 0,
            resObj, dataId,
            liEle, spanEle, pEle;

        for ( ; resObj = responseObject[i++]; ) {
            dataId = resObj.id;

            spanEle = sb.createElement('span', {'class': 'glyphicon glyphicon-folder-open green icon icon-left'});
            pEle = sb.createElement('p', {'text': resObj.category_name});
            liEle = sb.createElement('li', {'data-group': 'category', 'data-id': dataId});
            liEle = sb.createParentElement(liEle, spanEle, pEle);
            statusHtml += liEle;
        }
        sb.query('#list-items').innerHTML = statusHtml;
        sb.query('#sidebar-heading h2').textContent = 'All Categories';

    };

    var createSubjects = function(xhr, data) {
        var responseObject = JSON.parse(xhr.responseText),
            statusHtml = '',
            i = 0, j = 0,
            resObj, dataId, tempObj = [],
            liEle, spanLeftEle, spanRightEle, spanEle,
            spanCreditEle, spanStaffEle, pTitleEle, pDetailsEle;

        if (data !== undefined) {
            var searchTerm = data;

            for (; resObj = responseObject[j++]; ) {
                if ( resObj.subject_name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ) {
                    tempObj.push(resObj);
                }
            }
            responseObject = tempObj;
        }

        for ( ; resObj = responseObject[i++] ; ) {
            dataId = resObj.id;

            liEle = sb.createElement('li', { 'data-group': 'subject', 'data-id': dataId, 'draggable': 'true' });

            spanLeftEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-file left icon-left ' + colorIconBg[i-1] });
            spanRightEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-info-sign icon-right' });

            divEle = sb.createElement('div', { 'id': 'list-item-content' } );
            pTitleEle = sb.createElement('p', { 'class': 'subject-title', 'text': resObj.subject_name });
            pDetailsEle = sb.createElement('p', { 'class': 'subject-details' });
            spanCreditEle = sb.createElement('span', { 'text': 'Credit: ' + resObj.credit });
            spanCreditEle += '<br>';
            spanStaffEle = sb.createElement('span', { 'text': 'Staff: ' + resObj.staff });
            pDetailsEle = sb.createParentElement(pDetailsEle, spanCreditEle, spanStaffEle);
            divEle = sb.createParentElement(divEle, pTitleEle, pDetailsEle);

            liEle = sb.createParentElement(liEle, spanLeftEle, divEle, spanRightEle);

            statusHtml += liEle;
        }

        sb.query('#list-items').innerHTML = statusHtml;

        spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-arrow-left', 'id': 'back-button' });
        spanEle += sb.createElement('span', { 'id': 'sidebar-heading-content', 'text': 'All Subjects' });
        sb.query('#sidebar-heading h2').innerHTML = spanEle;
    };

    var createSubjectInCategory = function(xhr) {
        var responseObject = JSON.parse(xhr.responseText),
            statusHtml = '',
            i = 0,
            resObj, dataId,
            liEle, spanLeftEle, spanRightEle,
            spanCreditEle, spanStaffEle, pTitleEle, pDetailsEle

        for ( ; resObj = responseObject[i++] ; ) {
            dataId = resObj.id;

            liEle = sb.createElement('li', { 'data-group': 'subject', 'data-id': dataId, 'draggable': 'true' });

            spanLeftEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-file left icon-left ' + colorIconBg[i-1] });
            spanRightEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-info-sign icon-right' });

            divEle = sb.createElement('div', { 'id': 'list-item-content' } );
            pTitleEle = sb.createElement('p', { 'class': 'subject-title', 'text': resObj.subject_name });
            pDetailsEle = sb.createElement('p', { 'class': 'subject-details' });
            spanCreditEle = sb.createElement('span', { 'text': 'Credit: ' + resObj.credit });
            spanCreditEle += '<br>';
            spanStaffEle = sb.createElement('span', { 'text': 'Staff: ' + resObj.staff });
            pDetailsEle = sb.createParentElement(pDetailsEle, spanCreditEle, spanStaffEle);
            divEle = sb.createParentElement(divEle, pTitleEle, pDetailsEle);

            liEle = sb.createParentElement(liEle, spanLeftEle, divEle, spanRightEle);

            statusHtml += liEle;
        }

        sb.query('#list-items').innerHTML = statusHtml;

        spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-arrow-left', 'id': 'back-button' });
        spanEle += sb.createElement('span', { 'id': 'sidebar-heading-content', 'text': 'Subjects in Category'});
        sb.query('#sidebar-heading h2').innerHTML = spanEle;
    };

    //direct ajaxCall functions event
    var listCategories = function() {
        var apiUrl = 'api/v1/categories';
        sb.ajaxCall(apiUrl, createCategories);
    };

    var listSubjects = function() {
        var apiUrl = 'api/v1/subjects';
        sb.ajaxCall(apiUrl, createSubjects);
    };

    var searchSubjects = function(data) {
        var apiUrl = 'api/v1/subjects';
        sb.ajaxCall(apiUrl, createSubjects, data, true);
    };

    var listSubjectsInCategory = function(data) {
        var apiUrl = 'api/v1/categories/' + data['data-id'] + '/subjects';
        sb.ajaxCall(apiUrl, createSubjectInCategory);
    };

    //local functions - event handler functions
    var changeFilter = function(data) {
        switch (data) {
            case 'list-categories':
                listCategories();
                break;
            case 'list-subjects':
                listSubjects();
                break;
            case 'search-subjects':
                searchSubjects();
                break;
            case 'show-timetables':
                console.warn('from list item--' + data)
                // showTimetable();
                break;
        }
    };

    var searchItem = function(data) {
        searchSubjects(data);
    };

    var updateList = function(data) {
        if (data['data-group'] === 'category') {
            listSubjectsInCategory(data);
        }
        // switch (data['data-group']) {
        //     case 'category':
        //         console.log('hey category');
        //         // ajaxObj.listSubjectsInCategory(data);
        //         break;
        //     case 'subject':
        //         console.log('hey subject');
        //         // ajaxObj.listSubjectDetails(data);
        //         break;
        // }
    };

    var backToCategory = function(data) {
        listCategories();
    };


    //ajaxRequestList
    var ajaxRequestList = function(e) {
        var dataName,
            target = e.target;

        while (target.nodeName !== 'LI') {
            target = target.parentNode;
        }
        categoryTitle = target.lastChild;
        if (categoryTitle.nodeName === 'P') {
            dataName = categoryTitle.innerText;
        }

        sb.notify({
            type: 'click-list-item',
            data: {
                'data-group': target.getAttribute('data-group'),
                'data-id': target.getAttribute('data-id'),
                'data-name': dataName
            }
        });
    };

    //drag from list-items
    //========================================
    var dragStart = function(e) {
        var i = 0, eleDragged = e.target,
            childEle, pSubjecTitle;

        for (; childEle = e.target.children[i++]; ) {
            if (childEle.nodeName === 'DIV') {
                pSubjecTitle = childEle.firstChild.innerHTML;
            }
        }

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', pSubjecTitle);

        sb.notify({
            type: 'drag-drop',
            data: {
                //'title': pSubjecTitle,
                'eleDragged': eleDragged
            }
        });
    };
    //========================================


    //drop to list-items
    //========================================

    //========================================


    //return module_object
    return {
        init: function() {
            listCategories();

            sb.addEvent(sidebarItems, 'click', ajaxRequestList);
            sb.addEvent(sidebarItems, 'dragstart', dragStart);
            sb.listen({
                'change-filter': changeFilter,
                'click-list-item': updateList,
                'search-item': searchItem,
                'back-to-category': backToCategory
            });
        },
    };
});




