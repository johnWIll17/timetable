var Sandbox = {
    create: function(core, moduleSelector) {

        var toggleSearchBox = function (searchPage) {
            var sidebarSearch = core.dom.querySelector('#sidebar-search'),
                searchBox = core.dom.querySelector('#search-box'),
                sidebarItems = core.dom.querySelector('#sidebar-items');

            if (searchPage) {
                sidebarSearch.removeAttribute('class');
                sidebarItems.setAttribute('class', 'height-370');
            } else {
                sidebarSearch.setAttribute('class', 'hidden');
                searchBox.value = '';
                sidebarItems.setAttribute('class', 'height-445');
            }
        };


        //sandbox object
        return {
            helperObj: core.helperObj,
            query: function(selector) {
                return core.dom.querySelector(selector);
            },
            find: function(selector) {
                return core.dom.query('#' + moduleSelector + ' ' + selector)
                //return document.querySelector('#' + moduleSelector + ' ' + selector)
            },
            findAll: function(selector) {
                return core.dom.queryAll('#' + moduleSelector + ' ' + selector)
            },
            notify: function(evt) {
                if ( core.isObj(evt) && evt.type ) {
                    core.triggerEvent(evt);
                }
            },
            listen: function(evts) {
                if ( core.isObj(evts) ) {
                    core.registerEvents(evts, moduleSelector);
                }
            },
            addEvent: function(el, type, fn) {
                if (el.length !== undefined) {
                    var i=0, element;
                    for ( ; element = el[i++]; ) {
                        element.addEventListener(type, fn);
                    }
                } else {
                    el.addEventListener(type, fn);
                }
            },
            createParentElement: function(parentEle, childEles) {
                var indexCloseBracket = parentEle.lastIndexOf('</'),
                    closeParentTag = parentEle.substring(indexCloseBracket, parentEle.length),
                    newEle = parentEle.substring(0, indexCloseBracket),
                    i = 1, childEle;

                for (; childEle = arguments[i++]; ) {
                    newEle += childEle;
                }

                return newEle += closeParentTag;
            },
            createElement: function(el, options) {
                var attr = '', newEle;

                if (options && options instanceof Object) {
                    for (var property in options) {
                        if ( options.hasOwnProperty(property) && property !== 'text' ) {
                            attr += ' ' + property + '= "' + options[property] + '"';
                        }
                    }
                }

                if (typeof el === 'string') {
                    newEle = '<' + el + attr + '>';

                    if (options && options['text']) {
                        newEle += options['text'];
                    }
                    newEle += '</' + el + '>';
                }

                return newEle;
            },
            ajaxCall: function(apiUrl, callback, data, searchPage) {

                toggleSearchBox(searchPage);

                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        callback(xhr, data);
                    }
                };
                xhr.open('GET', apiUrl);
                xhr.send();
            }
        };
    }
}
