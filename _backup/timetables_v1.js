window.onload = function() {

(function() {

    var addCategories = function() {
        var xhr = new XMLHttpRequest();
        var arrayColor = ['blue', 'green', 'orange', 'purple', 'red'];

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                //hello = JSON.parse(xhr.responseText);
                //document.querySelector('#ajax').innerHTML = xhr.responseText;
                var subjectCategories = JSON.parse(xhr.responseText);
                var statusHtml = "";
                var dataSubjectId;
                for (var i=0, len = subjectCategories.length; i < len; i++) {
                    dataSubjectId = subjectCategories[i].id;
                    statusHtml += '<li data-category-id="' + dataSubjectId + '">';
                    statusHtml += '<span class="glyphicon glyphicon-folder-open ' + arrayColor[i] + '"></span>'
                        statusHtml += subjectCategories[i].category_name + '</li>';
                }
                document.querySelector('#list-subjects').innerHTML = statusHtml;


                addSubjects();
            }
        }
        //xhr.open('GET', '/api/v1/categories/3/subjects');
        xhr.open('GET', '/api/v1/categories');
        xhr.send();
    }
    //})();
    //console.log(hello);

    //console.log('--');
    //console.log(hello);
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
    //})();


    //var liElements = document.querySelectorAll('li');
    //console.log(liElements);
}

  addCategories();


  var backButton = document.querySelector('#sidebar-heading span');
  backButton.addEventListener('click', function() {
      addCategories();
  });

})();


}
