var CORE = (function() {
    var moduleData = {};

    return {
        create_module: function(moduleId, creator) {
            // var temp;
            // if (typeof moduleId === 'string' && typeof creator === 'function') {
            //     console.log('wtf');
            //     temp = creator(Sandbox.create(this, moduleId));
            //     if (temp.init && typeof temp.init === 'function' && temp.destroy && typeof temp.destroy === 'function') {
            //         temp = null;
                    moduleData[moduleId] = {
                        create : creator,
                        instance : null
                    };
            //     }
            // }
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
        triggerEvent: function(evt) {
            var mod;
            for (mod in moduleData) {
                mod = moduleData[mod];
                if (mod.events) {
                    mod.events[evt.type](evt.data);
                }
            }
        },

        registerEvent: function(evt, mod) {
            if (this.isObj(evt) && mod) {
                moduleData[mod].events = evt;
            }
        },
        isArray: function(value) {
            if (value instanceof Array) {
                return true;
            }
            return false;
        },
        isObj: function(value) {
            if ( typeof value === 'Object' && !(value instanceof Array) ) {
                return true;
            }
            return false;
        }
    };
}());
