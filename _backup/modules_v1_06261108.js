(function() {



window.onload = function() {

    CORE.create_helper_obj('ajaxObj', function(sb) {

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
                i = 0, resObj,
                spanEle, pEle, liEle,
                dataId;

            for ( ; resObj = responseObject[i++]; ) {
                dataId = resObj.id;
                // statusHtml += '<li data-group="category" data-id="' + dataId + '">';
                // spanEle = sb.createElement('span', {'class': 'glyphicon glyphicon-folder-open green icon icon-left'});
                // pEle = sb.createElement('p', {'text': resObj.category_name});
                // statusHtml += spanEle + pEle + '</li>';
                //statusHtml += pEle + '</li>';


                spanEle = sb.createElement('span', {'class': 'glyphicon glyphicon-folder-open green icon icon-left'});
                pEle = sb.createElement('p', {'text': resObj.category_name});
                liEle = sb.createElement('li', {'data-group': 'category', 'data-id': dataId});
                liEle = sb.createParentElement(liEle, spanEle, pEle);
                statusHtml += liEle;
            }
            //sb.query('#sidebar-subjects').innerHTML = "<ul id='list-categories'>" + statusHtml + "</ul>";
            sb.query('#list-items').innerHTML = statusHtml;
            sb.query('#sidebar-heading h2').textContent = 'All Categories';

        };
        var subjectRequestReady = function(xhr, colorsBg) {
            toggleBg();
            toggleTimetable();

            var responseObject = JSON.parse(xhr.responseText),
                statusHtml = '',
                pEle = '',
                dataId, i = 0, resObj,
                spanEle, pEle;


            for ( ; resObj = responseObject[i++] ; ) {
                dataId = resObj.id;
                statusHtml += '<li data-group="subject" data-id="' + dataId + '">';
                spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-file ' + colorsBg[i-1] });
                statusHtml += spanEle;
                //statusHtml += '<span class="glyphicon glyphicon-file ' + colorsBg[i-1] + '"></span>';
                pEle = '<p>' + resObj.subject_name + '<br><span>Credit: ' + resObj.credit + '<br>' + 'Staff: ' + resObj.staff + '</span></p>';
                statusHtml += pEle + '</li>';
            }


            sb.query('#list-items').innerHTML = statusHtml;
            // var h2Content = "<span id='back-categories' class='glyphicon glyphicon-arrow-left'></span>";
            // h2Content += "<span id='sidebar-heading-content'>All Subjects</span>";
            // sb.query('#sidebar-heading').innerHTML = '<h2>' + h2Content + '</h2>';
            sb.query('#sidebar-heading h2').innerText = 'All Subjects';


        };
        var subjectInCategoryRequestReady = function(xhr, colorsBg, data) {
            toggleBg(true);
            toggleTimetable();

            var responseObject = JSON.parse(xhr.responseText),
                statusHtml = '',
                pEle = '',
                resObj,
                i = 0,
                dataId;


            for ( ; resObj = responseObject[i++]; ) {
                dataId = resObj.id;
                statusHtml += '<li data-group="subject" data-id="' + dataId + '">';
                statusHtml += '<span class="glyphicon glyphicon-file ' + colorsBg[i-1] + '"></span>';
                p1Ele = '<p>' + resObj.subject_name + '</p>';
                p2Ele = '<p>' + '<span>Credit: ' + resObj.credit + '</span>' + '<span>Staff: ' + resObj.staff + '</span>' + '</p>';
                    // '<br><span>Credit: ' + resObj.credit + '<br>' + 'Staff: ' + resObj.staff + '</span></p>';
                statusHtml += p1Ele + p2Ele + '</li>';
            }

            sb.query('#list-items').innerHTML = statusHtml;
            var h2Content = "<span id='back-categories' class='glyphicon glyphicon-arrow-left'></span>";
            h2Content += "<span id='sidebar-heading-content'>" + data['data-name'] + "</span>";
            sb.query('#sidebar-heading').innerHTML = '<h2>' + h2Content + '</h2>';
            sb.query('#sidebar-subjects').setAttribute('class', 'bg-white');

        };



        var sDe = function(xhr) {
            toggleTimetable(true);

            var responseObject = JSON.parse(xhr.responseText);
            sb.query('#timetable-heading h1').textContent = responseObject.description;
            var pEle = sb.createElement('p', { 'text': responseObject.description });
            sb.query('#main-timetable').innerHTML += pEle;
            sb.query('#timetable').setAttribute('class', 'hidden');
        };

        //-----------------------------------
        var subjectDetails = function(data) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    sDe(xhr);
                }
            };
            xhr.open('GET', 'api/v1/subjects/' + data['data-id']);
            xhr.send();
        };

        var subjectsInCategory = function(data) {

            var xhr = new XMLHttpRequest(),
                colorIconBackgrounds = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    subjectInCategoryRequestReady(xhr, colorIconBackgrounds, data);
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
            var xhr = new XMLHttpRequest(),
                colorIconBackgrounds = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    subjectRequestReady(xhr, colorIconBackgrounds);
                }
            };
            xhr.open('GET', 'api/v1/subjects');
            xhr.send();
        };
        //-----------------------------------
        //-----------------------------------

        return {
            init: function() {
                //createCategories();
            },

            listCategories: createCategories,
            listSubjects: createSubjects,
            sInCategory: subjectsInCategory,
            sDetails: subjectDetails
        };
    });

    //========================================
    // Module
    //========================================

    CORE.create_module('filters-bar', function(sb) {
        var filters, target;

        return {
            init: function() {
                filters = sb.findAll('li');
                sb.addEvent(filters, 'click', this.ajaxRequest);
            },
            destroy: function() {},
            ajaxRequest: function(e) {
                //var filterClicked = e.currentTarget.firstChild.getAttribute('id');
                target = e.target;
                while (target.nodeName !== 'LI') {
                    target = target.parentNode;
                }

                // var filterClicked = e.target.getAttribute('id');
                var filterClicked = target.getAttribute('data-job');

                sb.notify({
                    type: 'change-filter',
                    data: filterClicked
                });
            }
        };
    });


    CORE.create_module( 'list-items', function(sb) {
        var ajaxObj = sb.helperObj['ajaxObj'].instance;

        //var sidebarSubject = sb.query('#sidebar-subjects');
        var sidebarItems = sb.query('#list-items');

        return {
            init: function() {
                ajaxObj.listCategories();
                // sb.listen( { 'change-filter': this.changeFilter } );
                sb.addEvent(sidebarItems, 'click', this.ajaxRequestList);
                // sb.listen( { 'click-list-item': this.updateList } );
                sb.listen({
                    'change-filter': this.changeFilter,
                    'click-list-item': this.updateList
                });
            },
            ajaxRequestList: function(e) {
                var target = e.target;
                while (target.nodeName !== 'LI') {
                    target = target.parentNode;
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
                        'data-name': target.lastChild.innerText
                    }
                });
            },
            updateList: function(data) {

                switch (data['data-group']) {
                    case 'category':
                        //ajaxObj.subjectsInCategory(data);
                        ajaxObj.sInCategory(data);
                        break;
                    case 'subject':
                        ajaxObj.sDetails(data);
                        break;
                }
            },

                // switch ( e.target.getAttribute('data-group') ) {
                //     case 'category':
                //         ajaxObj.subjectsInCategory();
                //         break;
                //     case 'subject':
                //         ajaxObj.subjectsInCategory();
                //         break;
                //     case 'specific-subject':
                //         ajaxObj.subjectsInCategory();
                //         break;
                // }
            changeFilter: function(data) {
                // console.log('change filter console');
                switch (data) {
                    case 'list-categories':
                        //Sandbox.helperObj['ajaxObj'].instance.listenCategories();
                        ajaxObj.listCategories();
                        //listCategories();
                        //helperObj.listCategories();
                        break;
                    case 'list-subjects':
                        ajaxObj.listSubjects();
                        break;
                    case 'search-subjects':
                        searchSubjects();
                        break;
                    case 'show-timetables':
                        showTimetable();
                        break;
                }
            }

        };
    });

    CORE.startAllObj();
    CORE.startAll();
};



}());


