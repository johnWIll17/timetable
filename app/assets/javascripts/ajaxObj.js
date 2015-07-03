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

