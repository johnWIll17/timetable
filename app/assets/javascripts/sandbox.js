var Sandbox = {
    create: function(core, moduleSelector) {

        return {
            find: function(selector) {
                return document.querySelector('#' + moduleSelector + ' ' + selector)
            },
            findAll: function(selector) {
                return document.querySelectorAll('#' + moduleSelector + ' ' + selector)
            },
            notify: function(evt) {
                if ( core.isObj(evt) && evt.type ) {
                    core.triggerEvent(evt);
                }
            },
            listen: function(evt) {
                if ( core.isObj(evt) && evt.type ) {
                    core.registerEvent(evt, moduleSelector);
                }
            }
            addEvent: function(el, type, fn) {
                if (el.length !== undefined) {
                    var i=0, element;
                    for ( ; element = el[i++]; ) {
                        element.addEventListener(type, fn);
                    }
                } else {
                    el.addEventListener(type, fn);
                }
            }
        };
    }
}
