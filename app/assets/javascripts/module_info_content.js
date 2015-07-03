CORE.createModule('info-content', function(sb) {
    //local variables
    var infoContent;
    // var ajaxObj = sb.helperObj['ajaxObj'].instance;

    //local functions
    var createSubjectDetails = function(xhr) {
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

    var createSyllabus = function(xhr, dataId) {
        var responseObject = JSON.parse(xhr.responseText),
            spanEle;

        sb.query('#info-content').innerHTML = '<p>' + responseObject.description  + '</p>';
        spanEle = sb.createElement('span', { 'class': 'glyphicon glyphicon-ok', 'data-id': dataId });
        sb.query('#info-heading h2').innerHTML = responseObject.subject_name + spanEle;
    };

    //direct ajaxCall functions event
    var listSubjectDetails = function(data) {
        var apiUrl = 'api/v1/subjects/' + data['data-id'];
        sb.ajaxCall(apiUrl, createSubjectDetails);

    };

    var readSyllabus = function(dataId) {
        var apiUrl = 'api/v1/subjects/' + dataId;
        sb.ajaxCall(apiUrl, createSyllabus, dataId);
    };

    //local functions - event handlers
    var updateList = function(data) {
        var isSubjectClick = data['data-group'] === 'subject',
            isOkSpan = data['data-button-click'] !== undefined && data['data-button-click'] === 'ok-icon',
            checkCondition = isSubjectClick || isOkSpan;

        if (checkCondition) {
            listSubjectDetails(data);
        }

        // if (data['data-group'] === 'subject') {
        //     listSubjectDetails(data);
        // }
    };


    //ajaxRequest
        // ajaxRequest: function(e) {
        //     var target = e.target;
        //
        //     sb.notify({
        //         type: 'button-clicking',
        //         data: target
        //     });
        // },
    var buttonClicking = function(e) {
        console.log('button clicking');
        var target = e.target,
            dataId = target.getAttribute('data-id');

        if (target.nodeName === 'BUTTON') {
            readSyllabus( dataId );
        }
    };


    return {
        init: function() {
            infoContent = sb.query('#info-content');

            infoContent.addEventListener('click', buttonClicking);
            sb.listen({
                //'button-clicking': this.buttonClicking,
                'click-list-item': updateList,
                'click-ok-icon': updateList
            });
        }
        // buttonClicking: function(data) {
        //     if (data.nodeName === 'BUTTON') {
        //         //ajaxObj.readSyllabus(data);
        //         ajaxObj.readSyllabus( data.getAttribute('data-id') );
        //     }
        // }
    };
});

