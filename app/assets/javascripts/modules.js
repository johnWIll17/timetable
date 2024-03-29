(function() {


var readyFunc = function() {


    CORE.createHelperObj('ajaxObj', function(sb) {

        var colorIconBg = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue', 'blueviolet', 'brown', 'burlywood', 'cardetblue', 'chocolate', 'cornflowerblue', 'darkolivegreen'];


        var toggleSearchBox = function (searchPage) {
            var sidebarSearch = sb.query('#sidebar-search'),
                searchBox = sb.query('#search-box'),
                sidebarItems = sb.query('#sidebar-items');

            if (searchPage) {
                sidebarSearch.removeAttribute('class');
                sidebarItems.setAttribute('class', 'height-370');
            } else {
                sidebarSearch.setAttribute('class', 'hidden');
                searchBox.value = '';
                sidebarItems.setAttribute('class', 'height-445');
            }
        };


        var categoryRequestReady = function(xhr) {
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
        var subjectRequestReady = function(xhr, data) {
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

                liEle = sb.createElement('li', { 'data-group': 'subject', 'data-id': dataId });

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

        var subjectInCategoryRequestReady = function(xhr) {
            var responseObject = JSON.parse(xhr.responseText),
                statusHtml = '',
                i = 0,
                resObj, dataId,
                liEle, spanLeftEle, spanRightEle,
                spanCreditEle, spanStaffEle, pTitleEle, pDetailsEle

            for ( ; resObj = responseObject[i++] ; ) {
                dataId = resObj.id;

                liEle = sb.createElement('li', { 'data-group': 'subject', 'data-id': dataId });

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

        var subjectDetailsRequestReading = function(xhr) {
            var divBriefEle, divSummaryEle, divButtonEle, divEle,
                imgEle, h3Ele, pEle, buttonEle;

            var responseObject = JSON.parse(xhr.responseText);

            divBriefEle = sb.createElement('div', { 'id': 'info-brief', 'class': 'group' });
            imgEle = sb.createElement('img', { 'src': 'images/subject-image.jpg', 'alt': 'subject-image', 'height': '100', 'width': '150' });
            divSummaryEle = sb.createElement('div', { 'id': 'info-summary' });
            h3Ele = sb.createElement('h3', { 'text': responseObject.subject_name });
            divEle = sb.createElement('div');
            pEle = sb.createElement('p', { 'text': 'Credit: ' + responseObject.credit });
            pEle += sb.createElement('p', {'text': 'Staff: ' + responseObject.staff});
            pEle += sb.createElement('p', {'text': 'Day/Period: ' + responseObject.day + ' / ' + responseObject.period});
            divEle = sb.createParentElement(divEle, pEle);
            divSummaryEle = sb.createParentElement(divSummaryEle, h3Ele, divEle);
            divBriefEle = sb.createParentElement(divBriefEle, imgEle, divSummaryEle);


            divButtonEle = sb.createElement('div', {'id': 'read-syllabus'});
            buttonEle = sb.createElement('button', {'data-id': responseObject.id, 'type': 'submit', 'class': 'myButton', 'text': 'Read SyllaBus'});
            divButtonEle = sb.createParentElement(divButtonEle, buttonEle);

            sb.query('#info-content').innerHTML = divBriefEle + divButtonEle;
            sb.query('#info-heading h2').innerText = responseObject.subject_name;
        };

        var subjectSyllabusRequestReady = function(xhr, dataId) {
            var responseObject = JSON.parse(xhr.responseText),
                spanEle;

            sb.query('#info-content').innerHTML = '<p>' + responseObject.description  + '</p>';
            spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-ok', 'data-id': dataId });
            sb.query('#info-heading h2').innerHTML = responseObject.subject_name + spanEle;
        };

        //----------------------------------------
        var ajaxCall = function(apiUrl, callback, data, searchPage) {
            toggleSearchBox(searchPage);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback(xhr, data);
                }
            };
            xhr.open('GET', apiUrl);
            //xhr.setRequestHeader("Authorization","Token token=547f6051c538a935f6799b3484972c51")
            xhr.send();

        };


        var createCategories = function() {
            ajaxCall('api/v1/categories', categoryRequestReady)
        };

        var createSubjects = function() {
            ajaxCall('api/v1/subjects', subjectRequestReady)
        };

        var subjectsInCategory = function(data) {
            var apiUrl = 'api/v1/categories/' + data['data-id'] + '/subjects';
            ajaxCall(apiUrl, subjectInCategoryRequestReady);
        };

        var subjectDetails = function(data) {
            var apiUrl = 'api/v1/subjects/' + data['data-id'];
            ajaxCall(apiUrl, subjectDetailsRequestReading);
        };

        var searchFeature = function(data) {
            ajaxCall('api/v1/subjects', subjectRequestReady, data, true);
        };

        var subjectSyllabus = function(data) {
            // var dataId = data.getAttribute('data-id'),
            var dataId = data,
                apiUrl = 'api/v1/subjects/' + dataId;
            ajaxCall(apiUrl, subjectSyllabusRequestReady, dataId);
        }

        //-----------------------------------

        return {

            listCategories: createCategories,
            listSubjects: createSubjects,
            listSubjectsInCategory: subjectsInCategory,
            listSubjectDetails: subjectDetails,
            readSyllabus: subjectSyllabus,
            searchSubjects: searchFeature
        };
    });

    //========================================
    // Module
    //========================================

    CORE.createModule('filters-bar', function(sb) {
        var filters;

        return {
            init: function() {
                filters = sb.findAll('li');
                sb.addEvent(filters, 'click', this.ajaxRequest);
            },
            ajaxRequest: function(e) {
                var filterClicked = e.currentTarget.getAttribute('data-job');

                sb.notify({
                    type: 'change-filter',
                    data: filterClicked
                });
            }
        };
    });


    CORE.createModule( 'list-items', function(sb) {
        var ajaxObj = sb.helperObj['ajaxObj'].instance,
            sidebarItems = sb.query('#list-items');

        return {
            init: function() {
                ajaxObj.listCategories();

                sb.addEvent(sidebarItems, 'click', this.ajaxRequestList);
                sb.listen({
                    'change-filter': this.changeFilter,
                    'click-list-item': this.updateList,
                    'search-item': this.searchItem
                });
            },
            ajaxRequestList: function(e) {
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
            },
            updateList: function(data) {
                switch (data['data-group']) {
                    case 'category':
                        ajaxObj.listSubjectsInCategory(data);
                        break;
                    case 'subject':
                        ajaxObj.listSubjectDetails(data);
                        break;
                }
            },

            changeFilter: function(data) {
                switch (data) {
                    case 'list-categories':
                        ajaxObj.listCategories();
                        break;
                    case 'list-subjects':
                        ajaxObj.listSubjects();
                        break;
                    case 'search-subjects':
                        ajaxObj.searchSubjects();
                        break;
                    case 'show-timetables':
                        showTimetable();
                        break;
                }
            },

            searchItem: function(data) {
                ajaxObj.searchSubjects(data);
            }

        };
    });


    CORE.createModule('info-content', function(sb) {
        var infoContent;
        var ajaxObj = sb.helperObj['ajaxObj'].instance;

        return {
            init: function() {
                infoContent = sb.query('#info-content');

                infoContent.addEventListener('click', this.ajaxRequest);
                sb.listen({
                    'button-clicking': this.buttonClicking
                });
            },
            ajaxRequest: function(e) {
                var target = e.target;

                sb.notify({
                    type: 'button-clicking',
                    data: target
                });
            },
            buttonClicking: function(data) {
                if (data.nodeName === 'BUTTON') {
                    //ajaxObj.readSyllabus(data);
                    ajaxObj.readSyllabus( data.getAttribute('data-id') );
                }
            }
        };
    });

    CORE.createModule('sidebar-search', function(sb) {
        var searchBox;

        return {
            init: function() {
                searchBox = sb.query('#search-box');

                searchBox.addEventListener('change', this.ajaxRequest);
            },
            ajaxRequest: function(e) {
                sb.notify({
                    type: 'search-item',
                    data: e.target.value
                });
            }
        };
    });

    CORE.createModule('sidebar-heading', function(sb) {
        var sidebarHeading,
            ajaxObj = sb.helperObj['ajaxObj'].instance;

        return {
            init: function() {
                sidebarHeading = sb.query('#sidebar-heading');

                sidebarHeading.addEventListener('click', this.ajaxRequest);
            },
            ajaxRequest: function(e) {
                if (e.target.nodeName === 'SPAN') {
                    ajaxObj.listCategories();
                }
            }
        };
    });

    CORE.createModule('info-heading', function(sb) {
        var infoHeading,
            ajaxObj = sb.helperObj['ajaxObj'].instance;

        return {
            init: function() {
                infoHeading = sb.query('#info-heading');
                infoHeading.addEventListener('click', this.ajaxRequest);
            },
            ajaxRequest: function(e) {
                if (e.target.nodeName === 'SPAN') {
                    var dataId = e.target.getAttribute('data-id'),
                        data = { 'data-id': dataId };

                    ajaxObj.listSubjectDetails(data);
                }
            }
        };
    });

    CORE.startAllObj();
    CORE.startAll();
};

document.addEventListener('DOMContentLoaded', readyFunc);


}());


