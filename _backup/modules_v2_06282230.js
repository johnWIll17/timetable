(function() {


var readyFunc = function() {


    CORE.create_helper_obj('ajaxObj', function(sb) {

        var colorIconBg = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];

        var toggleBg = function(bgPage) {
            var sidebarSubject = sb.query('#sidebar-subjects');
            if (bgPage) {
                sidebarSubject.setAttribute('class', 'bg-white');
            } else {
                sidebarSubject.setAttribute('class', '');
            }
        };

        var toggleTimetable = function(subjectDetail) {
            var timetable = sb.query('#timetable');
            if (subjectDetail) {
                timetable.setAttribute('class', 'hidden');
            } else {
                timetable.setAttribute('class', '');
            }
        };

        var ajaxCall = function(callback) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback();
                }
            };
        };

        var categoryRequestReady = function(xhr) {
            // toggleBg();
            // toggleTimetable();

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
        var subjectRequestReady = function(xhr) {
            // toggleBg();
            // toggleTimetable();

            //var colorIconBg = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];
            var responseObject = JSON.parse(xhr.responseText),
                statusHtml = '',
                i = 0,
                resObj, dataId,
                liEle, spanLeftEle, spanRightEle, spanEle,
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
                //------------
                // statusHtml += '<li data-group="subject" data-id="' + dataId + '">';
                // spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-file ' + colorIconBg[i-1] });
                // statusHtml += spanEle;
                // //statusHtml += '<span class="glyphicon glyphicon-file ' + colorsBg[i-1] + '"></span>';
                // pEle = '<p>' + resObj.subject_name + '<br><span>Credit: ' + resObj.credit + '<br>' + 'Staff: ' + resObj.staff + '</span></p>';
                // statusHtml += pEle + '</li>';
                //------------
            }

            sb.query('#list-items').innerHTML = statusHtml;
            // var h2Content = "<span id='back-categories' class='glyphicon glyphicon-arrow-left'></span>";
            // h2Content += "<span id='sidebar-heading-content'>All Subjects</span>";
            // sb.query('#sidebar-heading').innerHTML = '<h2>' + h2Content + '</h2>';
            spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-arrow-left' });
            spanEle += sb.createElement('span', { 'id': 'sidebar-heading-content', 'text': 'All Subjects' });
            sb.query('#sidebar-heading h2').innerHTML = spanEle;


        };
        var subjectInCategoryRequestReady = function(xhr, data) {
            // toggleBg(true);
            // toggleTimetable();

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
                //------------
                // statusHtml += '<li data-group="subject" data-id="' + dataId + '">';
                // spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-file ' + colorIconBg[i-1] });
                // statusHtml += spanEle;
                // //statusHtml += '<span class="glyphicon glyphicon-file ' + colorsBg[i-1] + '"></span>';
                // pEle = '<p>' + resObj.subject_name + '<br><span>Credit: ' + resObj.credit + '<br>' + 'Staff: ' + resObj.staff + '</span></p>';
                // statusHtml += pEle + '</li>';
                //------------
            }

            sb.query('#list-items').innerHTML = statusHtml;
            var h2Content = "<span id='back-categories' class='glyphicon glyphicon-arrow-left'></span>";
            //h2Content += "<span id='sidebar-heading-content'>" + data['data-name'] + "</span>";
            //sb.query('#sidebar-heading').innerHTML = '<h2>' + h2Content + '</h2>';
            //sb.query('#sidebar-subjects').setAttribute('class', 'bg-white');

        };



        var subjectDetailsRequestReading = function(xhr) {
            // toggleTimetable(true);

            //-------------------------------------
            // var responseObject = JSON.parse(xhr.responseText);
            // sb.query('#info-heading h2').innerText = responseObject.description;
            // var pEle = sb.createElement('p', { 'text': responseObject.description });
            // sb.query('#info-content').innerHTML = pEle;
            //sb.query('#timetable').setAttribute('class', 'hidden');
            //-------------------------------------

            var divBriefEle, divSummaryEle, divButtonEle, divEle,
                imgEle, h3Ele, pEle, buttonEle;

            var responseObject = JSON.parse(xhr.responseText);

            divBriefEle = sb.createElement('div', { 'id': 'info-brief', 'class': 'group' });
            imgEle = sb.createElement('img', { 'src': 'images/darkwood.jpg', 'alt': 'darkwood', 'height': '100', 'width': '150' });
            divSummaryEle = sb.createElement('div', { 'id': 'info-summary' });
            h3Ele = sb.createElement('h3', { 'text': responseObject.subject_name });
            divEle = sb.createElement('div');
            pEle = sb.createElement('p', { 'text': 'Credit: ' + responseObject.credit });
            pEle += sb.createElement('p', {'text': 'Staff: ' + responseObject.staff});
            pEle += sb.createElement('p', {'text': 'Day/Period: ' + responseObject.day});
            divEle = sb.createParentElement(divEle, pEle);
            divSummaryEle = sb.createParentElement(divSummaryEle, h3Ele, divEle);
            divBriefEle = sb.createParentElement(divBriefEle, imgEle, divSummaryEle);


            divButtonEle = sb.createElement('div', {'id': 'read-syllabus'});
            buttonEle = sb.createElement('button', {'data-id': responseObject.id, 'type': 'submit', 'class': 'myButton', 'text': 'Read SyllaBus'});
            divButtonEle = sb.createParentElement(divButtonEle, buttonEle);

            sb.query('#info-content').innerHTML = divBriefEle + divButtonEle;
        };

        //-----------------------------------
        var subjectDetails = function(data) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    subjectDetailsRequestReading(xhr);
                }
            };
            xhr.open('GET', 'api/v1/subjects/' + data['data-id']);
            xhr.send();
        };

        var subjectsInCategory = function(data) {

            var xhr = new XMLHttpRequest();
                //colorIconBackgrounds = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    subjectInCategoryRequestReady(xhr, data);
                }

            };
            xhr.open('GET', 'api/v1/categories/' + data['data-id'] + '/subjects');
            xhr.send();
        };


        //-----------------------------------
        //-----------------------------------
        var createCategories = function() {
            //toggleSearchBox();

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    categoryRequestReady(xhr);
                }
            };
            xhr.open('GET', 'api/v1/categories');
            xhr.send();
        };

        var createSubjects = function() {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    subjectRequestReady(xhr);
                }
            };
            xhr.open('GET', 'api/v1/subjects');
            xhr.send();
        };

        var subjectSyllabus = function(data) {
            var xhr = new XMLHttpRequest(),
                dataId = data.getAttribute('data-id');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var responseObject = JSON.parse(xhr.responseText);

                    sb.query('#info-content').innerHTML = '<p>' + responseObject.description  + '</p>';
                    console.log(responseObject.subject_name);
                }
            };
            xhr.open('GET', 'api/v1/subjects/' + dataId);
            xhr.send();
        };

        var searchFeature = function() {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    subjectRequestReady(xhr);
                }
            };
            xhr.open('GET', 'api/v1/subjects');
            xhr.send();
        };
        //-----------------------------------
        //-----------------------------------

        return {
            // init: function() {
            //     createCategories();
            // },

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

    CORE.create_module('filters-bar', function(sb) {
        var filters;

        return {
            init: function() {
                filters = sb.findAll('li');
                sb.addEvent(filters, 'click', this.ajaxRequest);
            },
            ajaxRequest: function(e) {
                // target = e.target;

                // while (target.nodeName !== 'LI') {
                //     target = target.parentNode;
                // }

                var filterClicked = e.currentTarget.getAttribute('data-job');

                sb.notify({
                    type: 'change-filter',
                    data: filterClicked
                });
            }
        };
    });


    CORE.create_module( 'list-items', function(sb) {
        var ajaxObj = sb.helperObj['ajaxObj'].instance,
            sidebarItems = sb.query('#list-items');

        return {
            init: function() {
                ajaxObj.listCategories();

                sb.addEvent(sidebarItems, 'click', this.ajaxRequestList);
                sb.listen({
                    'change-filter': this.changeFilter,
                    'click-list-item': this.updateList
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
                    //data: e.currenttarget.getAttribute('data-group')
                    //data: e.target.parentNode.getAttribute('data-group')
                    data: {
                        // 'data-group': e.target.parentNode.getAttribute('data-group'),
                        // 'data-id': e.target.parentNode.getAttribute('data-id'),
                        // 'data-name': e.target.parentNode.lastChild.innerText
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
            }

        };
    });


    CORE.create_module('info-content', function(sb) {
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
                    ajaxObj.readSyllabus(data);
                }
            }
        };
    });

    CORE.startAllObj();
    CORE.startAll();
};

document.addEventListener('DOMContentLoaded', readyFunc);


}());


