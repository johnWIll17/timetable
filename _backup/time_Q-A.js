//this file has an error that I should remember for later
//error line: 129

(function() {



var ajaxObj = (function() {

    // var createElement = function(el, config) {
    //     if (typeof el === 'string') {
    //         var newElement = document.createElement(el);
    //     }
    //     if (config instanceof Object) {
    //         for (var property in config) {
    //             if (property != 'text') {
    //                 newElement.setAttribute(property, config[property]);
    //             }
    //         }
    //         if (config.text) {
    //             newElement.appendChild(document.createTextNode(config.text));
    //         }
    //     }
    //     return newElement;
    // };

    var eventEachElement = function (eles, options) {
        var i = 0, ele, dataId, apiUrl;

        for (; ele = eles[i++]; ) {
            dataId = ele.getAttribute('data-id');
            apiUrl = apiUrlFunc(options['requestType'], dataId);

            ele.addEventListener('click', function() {
                options['callback'](apiUrl);
            });
        }
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
        var searchBox = document.querySelector('#search-box');

        if (searchPage) {
            searchBox.removeAttribute('class');
        } else {
            searchBox.setAttribute('class', 'hidden');
        }
    }

    var createCategories = function() {

        // var searchBox = document.querySelector('#search-box');
        // searchBox.setAttribute('class', 'hidden');
        // console.log(searchBox);

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
            //eventEachElement(categoryList, { 'callback': createSubjects, 'requestType': 'subjects-in-category' });
            //--------------------------------
            //var l = 0, ELE, DATAID, APIURL;
            var l = 0, ELE;

            for (; ELE = categoryList[l++]; ) {
                //if we code like this
                //then all <li> will bind with event 'click' with the dataid is the dataid of the last <li>,
                //(in this case is 4)
                //
                //but if we move 2 following line
                //to inisde addEventListener()
                //then each <li> will be binded to each its id
                //
                //why is that?
                //
                //A:
                //  I think that's because
                //  when the function run,
                //  the value store in the memory is 4
                //  then later, when we click on each <li>
                //  it use that dataID
                //
                //  but this answer still make me no satisfy
                var DATAID = ELE.getAttribute('data-id');
                var APIURL = apiUrlFunc('subjects-in-category', DATAID);

                ELE.addEventListener('click', function() {
                    createSubjects(APIURL);
                });
            }

            // (function eEachElement(eles, options) {
            //     var i = 0, ele, dataId, apiUrl;
            //
            //     for (; ele = eles[i++]; ) {
            //         dataId = ele.getAttribute('data-id');
            //         apiUrl = apiUrlFunc(options['requestType'], dataId);
            //
            //         ele.addEventListener('click', function() {
            //             options['callback'](apiUrl);
            //         });
            //     }
            // }());
            //--------------------------------
        };
        xhr.open('GET', 'api/v1/categories');
        xhr.send();

    };

    // var searchSubjects = function() {
    //     var searchBox = document.querySelector('#search-box');
    //     console.log(searchBox);
    //     var searchButton = document.querySelector('#search');
    //     console.log(searchButton);
    //
    //     searchButton.addEventListener('click', function(e) {
    //         console.log("--");
    //     });

        // searchButton.addEventListener('click', function() {
        //     console.log('--' + this);
        //     console.log(searchBox.value);
            // var i = 0, subject;
            // for (; subject = responseObject[i++]; ) {
            //     if (subject.indexOf)
            // }
        // });
    // }

    // var updateContent = function(xhr) {
    //     var responseObject = JSON.parse(xhr.responseText),
    //         statusHtml = '',
    //         pEle = '',
    //         dataId;
    //
    //     for (var i=0, len = responseObject.length; i < len; i++) {
    //         dataId = responseObject[i].id;
    //         statusHtml += '<li data-id="' + dataId + '">';
    //         statusHtml += '<span class="glyphicon glyphicon-file ' + colorIconBackgrounds[i] + '"></span>';
    //         pEle = '<p>' + responseObject[i].subject_name + '<br><span>Credit: ' + responseObject[i].credit + '<br>' + 'Staff: ' + responseObject[i].staff + '</span></p>';
    //         statusHtml += pEle + '</li>';
    //     }
    // }

    //var createSubjects = function(searchPage, search_term) {
    var createSubjects = function(api_url, searchPage, search_term) {

                // if (searchPage) {
                //     document.querySelector('#sidebar-subjects').innerHTML = "<input type='text' id='search-box'> <button id='search'>Search</button>";
                //
                //     //searchSubjects();
                //     //ajaxObj.listSubjects(true);
                //
                // } else {
                //     document.querySelector('#sidebar-subjects').innerHTML = "";
                // }

        toggleSearchBox(searchPage);

        // if (searchPage) {
        //     var searchBox = document.querySelector('#search-box');
        //     searchBox.setAttribute('class', '');
        //     console.log(searchBox);
        // }

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
                // if (searchPage) {
                //     document.querySelector('#sidebar-subjects').innerHTML = "<input type='text' id='search-box'> <button id='search'>Search</button>";
                //
                //     searchSubjects();
                //     //ajaxObj.listSubjects(true);
                //
                // } else {
                //     document.querySelector('#sidebar-subjects').innerHTML = "";
                // }
                //document.querySelector('#list-items').innerHTML = statusHtml;
                document.querySelector('#sidebar-subjects').innerHTML = "<ul id='list-subjects'>" + statusHtml + "</ul>";
                var h2Content = "<span id='back-categories' class='glyphicon glyphicon-arrow-left'></span>";
                h2Content += "<span id='sidebar-heading-content'>All Subjects</span>";
                document.querySelector('#sidebar-heading').innerHTML = '<h2>' + h2Content + '</h2>';

                var buttonBackCategory = document.querySelector('#back-categories');
                buttonBackCategory.addEventListener('click', function() {
                    ajaxObj.listCategories();
                });

            }
        };
        //xhr.open('GET', 'api/v1/subjects');
        xhr.open('GET', api_url);
        xhr.send();
    };

    // var ajaxCall = function() {
    //     var xhr = new XMLHttpRequest(),
    //         colorIconBackgrounds = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];
    //
    //     xhr.onreadystatechange = function() {
    //         if (xhr.readyState === 4) {
    //             var responseObject = JSON.parse(xhr.responseText),
    //                 statusHtml = '',
    //                 dataId;
    //
    //             for (var i=0, len = responseObject.length; i < len; i++) {
    //                 callback();
    //                 dataId = responseObject[i].id;
    //                 statusHtml += '<li data-id="' + dataId + '">';
    //                 statusHtml += '<span class="glyphicon glyphicon-folder-open ' + colorIconBackgrounds[i] + '"></span>';
    //                 statusHtml += responseObject[i].category_name + '</li>';
    //             }
    //             document.querySelector('#list-subjects').innerHTML = statusHtml;
    //         }
    //     };
    //     xhr.open('GET', 'api/v1/categories');
    //     xhr.send();
    //
    // };

    return {
        listCategories: createCategories,
        listSubjects: createSubjects,
        listSubjectsInCategories: function() {
            ajaxCall();
        }
    };
}());

window.onload = function() {
    ajaxObj.listCategories();

    var buttonSubject = document.querySelector('#list-subjects');
    buttonSubject.addEventListener('click', function() {
        ajaxObj.listSubjects('api/v1/subjects');
    });

    var buttonCategory = document.querySelector('#list-categories');
    buttonCategory.addEventListener('click', function() {
        ajaxObj.listCategories();
    });

    var buttonSearch = document.querySelector('#search-subjects');
    buttonSearch.addEventListener('click', function() {
        ajaxObj.listSubjects('api/v1/subjects', true);
    });

    var searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('change', function() {
        ajaxObj.listSubjects('api/v1/subjects', true, this.value);
    });

};



}());
