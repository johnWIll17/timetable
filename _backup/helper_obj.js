var ajaxObj = (function() {

    var eventEachElement = function (eles, options) {
        var i = 0, ele, dataId, apiUrl;

        for (; ele = eles[i++]; ) {
            ele.addEventListener('click', function() {
                dataId = this.getAttribute('data-id');
                apiUrl = apiUrlFunc(options['requestType'], dataId);

                options['callback'](apiUrl);
            });
        }
    };

    var subjectDetail = function (apiUrl) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var responseObject = JSON.parse(xhr.responseText),
                    statusHtml = '';
            }

            var container = document.querySelector('.container');
            container.innerHTML = responseObject.description;
        }

        xhr.open('GET', apiUrl);
        xhr.send();
    };

    var apiUrlFunc = function (requestType, dataId) {
        var apiUrl;

        switch (requestType) {
            case 'categories':
                apiUrl = 'api/v1/categories';
                break;
            case 'subjects':
                apiUrl = 'api/v1/subjects';
                break;
            case 'subject-detail':
                apiUrl = 'api/v1/subjects/' + dataId;
                break;
            case 'subjects-in-category':
                apiUrl = 'api/v1/categories/' + dataId + '/subjects';
                break;
        }
        return apiUrl;
    }

    var createElement = function (el, options) {
        var attr = '';

        if (options && options instanceof Object) {
            for (var property in options) {
                if ( options.hasOwnProperty(property) && property !== 'text' ) {
                    attr += ' ' + property + '= "' + options[property] + '"';
                }
            }
        }

        if (typeof el === 'string') {
            newEle = '<' + el + attr + '>';

            if (options['text']) {
                newEle += options['text'];
            }
            newEle += '</' + el + '>';
        }

        return newEle;
    };

    var toggleSearchBox = function (searchPage) {
        var searchField = document.querySelector('#search-field');

        if (searchPage) {
            searchField.removeAttribute('class');
        } else {
            searchField.setAttribute('class', 'hidden');
        }
    }

    var createCategories = function() {

        toggleSearchBox();

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var responseObject = JSON.parse(xhr.responseText),
                    statusHtml = '',
                    dataId;

                for (var i=0, len = responseObject.length; i < len; i++) {
                    dataId = responseObject[i].id;
                    statusHtml += '<li data-id="' + dataId + '">';
                    var spanEle = createElement('span', {'class': 'glyphicon glyphicon-folder-open green'});
                    statusHtml += spanEle;
                    var pEle = createElement('p', {'text': responseObject[i].category_name});
                    statusHtml += pEle + '</li>';
                    //statusHtml += '<span class="glyphicon glyphicon-folder-open green"></span>';
                    //statusHtml += '<p>' + responseObject[i].category_name + '</p></li>';
                }
                document.querySelector('#sidebar-subjects').innerHTML = "<ul id='list-categories'>" + statusHtml + "</ul>";
                document.querySelector('#sidebar-heading h2').textContent = 'All Categories';
            }

            var categoryList = document.querySelectorAll('#list-categories li');
            eventEachElement(categoryList, { 'callback': createSubjects, 'requestType': 'subjects-in-category' });

        };
        xhr.open('GET', 'api/v1/categories');
        xhr.send();

    };

    var createSubjects = function(api_url, searchPage, search_term) {

        toggleSearchBox(searchPage);

        var xhr = new XMLHttpRequest(),
            colorIconBackgrounds = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var responseObject = JSON.parse(xhr.responseText),
                    statusHtml = '',
                    pEle = '',
                    tempObj = [],
                    dataId;


                if (search_term !== undefined) {
                    for (var i=0, len = responseObject.length; i < len; i++) {
                        if ( responseObject[i].subject_name.toLowerCase().indexOf(search_term.toLowerCase()) >= 0 ) {
                            tempObj.push(responseObject[i]);
                        }
                    }
                    responseObject = tempObj;
                }


                for (var i=0, len = responseObject.length; i < len; i++) {
                    dataId = responseObject[i].id;
                    statusHtml += '<li data-id="' + dataId + '">';
                    statusHtml += '<span class="glyphicon glyphicon-file ' + colorIconBackgrounds[i] + '"></span>';
                    pEle = '<p>' + responseObject[i].subject_name + '<br><span>Credit: ' + responseObject[i].credit + '<br>' + 'Staff: ' + responseObject[i].staff + '</span></p>';
                    statusHtml += pEle + '</li>';
                }

                if (searchPage) {
                    document.querySelector('#sidebar-subjects').setAttribute('class', 'search-page');
                }

                document.querySelector('#sidebar-subjects').innerHTML = "<ul id='list-subjects'>" + statusHtml + "</ul>";
                var h2Content = "<span id='back-categories' class='glyphicon glyphicon-arrow-left'></span>";
                h2Content += "<span id='sidebar-heading-content'>All Subjects</span>";
                document.querySelector('#sidebar-heading').innerHTML = '<h2>' + h2Content + '</h2>';

                var buttonBackCategory = document.querySelector('#back-categories');
                buttonBackCategory.addEventListener('click', function() {
                    ajaxObj.listCategories();
                });

            }

            var subjectList = document.querySelectorAll('#list-subjects li');
            eventEachElement(subjectList, { 'callback': subjectDetail, 'requestType': 'subject-detail' });
        };
        xhr.open('GET', api_url);
        xhr.send();
    };

    return {
        listCategories: createCategories,
        listSubjects: createSubjects,
        listSubjectsInCategories: function() {
            ajaxCall();
        }
    };
}());

//remember change 'onload' to 'domcontentloaded'
// window.onload = function() {
//     ajaxObj.listCategories();
//
//     var buttonSubject = document.querySelector('#list-subjects');
//     buttonSubject.addEventListener('click', function() {
//         ajaxObj.listSubjects('api/v1/subjects');
//     });
//
//     var buttonCategory = document.querySelector('#list-categories');
//     buttonCategory.addEventListener('click', function() {
//         ajaxObj.listCategories();
//     });
//
//     var buttonSearch = document.querySelector('#search-subjects');
//     buttonSearch.addEventListener('click', function() {
//         ajaxObj.listSubjects('api/v1/subjects', true);
//     });
//
//     var searchBox = document.querySelector('#search-box');
//     searchBox.addEventListener('change', function() {
//         ajaxObj.listSubjects('api/v1/subjects', true, this.value);
//     });
//
// };




