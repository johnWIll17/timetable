window.onload = function() {


    var addSubjects = function() {
        var arrayColor = ['blue', 'green', 'orange', 'purple', 'red'];
        var liElements = document.querySelectorAll('#list-subjects li');
        console.log(liElements);
        for (var i=0, len = liElements.length; i < len; i++) {
            liElements[i].addEventListener('click', function() {
                console.log('he');
                var idEle = this.getAttribute('data-id');
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        var subjects = JSON.parse(xhr.responseText);
                        var statusHtml = "";
                        var dataSubjectId;
                        for (var i=0, len = subjects.length; i < len; i++) {
                            dataSubjectId = subjects[i].id;
                            statusHtml += '<li data-subject-id="' + dataSubjectId + '">';
                            statusHtml += '<span class="glyphicon glyphicon-folder-open ' + arrayColor[i] + '"></span>'
                                statusHtml += subjects[i].subject_name + '</li>';
                        }
                        statusHtml += '</ul>';
                        document.querySelector('#list-subjects').innerHTML = statusHtml;
                    }
                }
                xhr.open('GET', '/api/v1/categories/' + idEle + '/subjects');
                xhr.send();
            });
        }

    }

    var ajaxCall = function(object_name, api_url) {
        var xhr = new XMLHttpRequest();
        var colorIconBackgrounds = ['blue', 'green', 'orange', 'purple', 'red', 'tomato', 'lightblue'];

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var responseObject = JSON.parse(xhr.responseText),
                    statusHtml = '',
                    dataId;

                for (var i=0, len = responseObject.length; i < len; i++) {
                    dataId = responseObject[i].id;
                    statusHtml += '<li data-id="' + dataId + '">';

                    if ( api_url.indexOf('subject') ) {
                        //icon = glyphicon-new
                    } else {
                        //icon = glyphicon-folder-open
                    }
                    //statusHtml += '<span class="glyphicon glyphicon-folder-open ' + colorIconBackgrounds[i] + '"></span>';
                    statusHtml += '<span class="glyphicon ' + icon + ' ' + colorIconBackgrounds[i] + '"></span>';
                    statusHtml += responseObject[i][object_name]+ '</li>';

                    // if ( api_url.indexOf('subject') ) {
                    //     //add description
                    //     //credit: 2
                    //     //summary:
                    // }
                }
                //should create a new api /subjects/:id
                //create new function that add event click to this subject
                //
                //there are 2 pattern
                //1. categories
                //2. subjects
                //   categories/:id/subjects
                //
                //2. same format
                //   same icon
                //   same description
                document.querySelector('#list-subjects').innerHTML = statusHtml;

                if (api_url === 'api/v1/categories') {
                    addSubjects();
                }
            }

        }
        xhr.open('GET', api_url);
        xhr.send();
    }

    var listCategories = function() {
        ajaxCall('category_name', 'api/v1/categories');
    };

    var listSubjects = function() {
        ajaxCall('subject_name', 'api/v1/subjects');
    };
    var listSubjectsInCategories = function() {};

    listCategories();

    var buttonSubject = document.querySelector('#main-nav span.glyphicon-folder-close');
    buttonSubject.addEventListener('click', function() {
        listSubjects();
    });
}

// (function() {
//
//     var addCategories = function() {
//         var xhr = new XMLHttpRequest();
//         var arrayColor = ['blue', 'green', 'orange', 'purple', 'red'];
//
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 //hello = JSON.parse(xhr.responseText);
//                 //document.querySelector('#ajax').innerHTML = xhr.responseText;
//                 var subjectCategories = JSON.parse(xhr.responseText);
//                 var statusHtml = "";
//                 var dataSubjectId;
//                 for (var i=0, len = subjectCategories.length; i < len; i++) {
//                     dataSubjectId = subjectCategories[i].id;
//                     statusHtml += '<li data-category-id="' + dataSubjectId + '">';
//                     statusHtml += '<span class="glyphicon glyphicon-folder-open ' + arrayColor[i] + '"></span>'
//                         statusHtml += subjectCategories[i].category_name + '</li>';
//                 }
//                 document.querySelector('#list-subjects').innerHTML = statusHtml;
//
//
//                 addSubjects();
//             }
//         }
//         //xhr.open('GET', '/api/v1/categories/3/subjects');
//         xhr.open('GET', '/api/v1/categories');
//         xhr.send();
//     }
//     //})();
//     //console.log(hello);
//
//     //console.log('--');
//     //console.log(hello);
var addSubjects = function() {
    var arrayColor = ['blue', 'green', 'orange', 'purple', 'red'];
    var liElements = document.querySelectorAll('#list-subjects li');
    //console.log(liElements);
    for (var i=0, len = liElements.length; i < len; i++) {
        liElements[i].addEventListener('click', function() {
            console.log('he');
            var idEle = this.getAttribute('data-category-id');
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var subjects = JSON.parse(xhr.responseText);
                    var statusHtml = "";
                    var dataSubjectId;
                    for (var i=0, len = subjects.length; i < len; i++) {
                        dataSubjectId = subjects[i].id;
                        statusHtml += '<li data-subject-id="' + dataSubjectId + '">';
                        statusHtml += '<span class="glyphicon glyphicon-folder-open ' + arrayColor[i] + '"></span>'
                            statusHtml += subjects[i].subject_name + '</li>';
                    }
                    statusHtml += '</ul>';
                    document.querySelector('#list-subjects').innerHTML = statusHtml;
                }
            }
            xhr.open('GET', '/api/v1/categories/' + idEle + '/subjects');
            xhr.send();
        });
    }

}
    //})();


    //var liElements = document.querySelectorAll('li');
    //console.log(liElements);
//}

  // addCategories();
  //
  //
  // var backButton = document.querySelector('#sidebar-heading span');
  // backButton.addEventListener('click', function() {
  //     addCategories();
  // });

//})();


