var CORE = (function() {
    var moduleData = {},
        helperObj = {};

    return {

        helperObj: helperObj,

        createHelperObj: function(objName, creator) {
            helperObj[objName] = {
                create: creator,
                instance: null
            };
        },
        createModule: function(moduleId, creator) {
            moduleData[moduleId] = {
                create : creator,
                instance : null
            };
        },
        startObj: function(objName) {
            var obj = helperObj[objName];
            if (obj) {
                obj.instance = obj.create(Sandbox.create(this));
            }
        },
        startAllObj: function() {
            var objName;
            for (objName in helperObj) {
                if ( helperObj.hasOwnProperty(objName) ) {
                    this.startObj(objName);
                }
            }
        },
        start: function(moduleId) {
            var mod = moduleData[moduleId];
            if (mod) {
                mod.instance = mod.create(Sandbox.create(this, moduleId));
                mod.instance.init();
            }
        },
        startAll: function() {
            var moduleId;
            for (moduleId in moduleData) {
                if ( moduleData.hasOwnProperty(moduleId) ) {
                    this.start(moduleId);
                }
            }
        },

        registerEvents : function (evts, mod) {
            if (this.isObj(evts) && mod) {
                if (moduleData[mod]) {
                    moduleData[mod].events = evts;
                } else {
                    this.log(1, "");
                }
            } else {
                this.log(1, "");
            }
        },
        triggerEvent : function (evt) {
            var mod;
            for (mod in moduleData) {
                if (moduleData.hasOwnProperty(mod)){
                    mod = moduleData[mod];
                    if (mod.events && mod.events[evt.type]) {
                        mod.events[evt.type](evt.data);
                    }
                }
            }
        },
        dom: {
            querySelector: function(selector) {
                return document.querySelector(selector);
            },
            query: function(selector) {
                return document.querySelector(selector);
            },
            queryAll: function(selector) {
                return document.querySelectorAll(selector);
            }
        },
        isArray: function(value) {
            if (value instanceof Array) {
                return true;
            }
            return false;
        },
        isObj: function(value) {
            if ( (typeof value).toLowerCase() === 'Object'.toLowerCase() && !(value instanceof Array) ) {
                return true;
            }
            return false;
        }
    };
}());
