// Skull.js 0.0.1-alpha
// Build Date: 2012-08-20

// (c) 2012 Kristofer Joseph.
// Skull may be freely distributed under the MIT license.
// For all details and documentation:
// http://www.skulljs.com

/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //Hijack Backbone's extend method to use with Skull objects
    Skull.extend = Backbone.Model.extend;

})(this);
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
     *   EventMap is used to dispatch application wide events
     */
    var EventMap = Skull.EventMap = _.clone(Backbone.Events);
    EventMap.publish = EventMap.trigger;
    EventMap.subscribe = EventMap.on;
    EventMap.unsubscribe = EventMap.off;

})(this);
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
    *   CareTaker is used to manage the stacks of state
    */
    var CareTaker = Skull.CareTaker = function() {};
    _.extend(CareTaker.prototype, {
        undoStack: [],
        redoStack: [],
        addMemento: function(memento) {
            this.undoStack.push(memento);
            return this;
        },
        undo: function() {
            if (this.undoStack.length) {
                var memento = this.undoStack.pop(),
                    originator = memento['originator'];

                if (originator && originator.setMemento && originator.createMemento) {
                    this.redoStack.push(originator.createMemento());
                    originator.setMemento(memento);
                }
            }
            return this;
        },
        redo: function() {
            if (this.redoStack.length) {
                var memento = this.redoStack.pop(),
                    originator = memento['originator'];

                if (originator && originator.setMemento && originator.createMemento) {
                    this.undoStack.push(originator.createMemento());
                    originator.setMemento(memento);
                }
            }
            return this;
        }
    });

})(this);
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
    *   Memento object is api support for creating Mementos for storing state
    */
    var Memento = Skull.Memento = function(options) {
        var options    = options || {},
            originator = {},
            state      = {};
        _.extend(this, options);
    };

    _.extend(Memento.prototype, {
        getOriginator: function() {
            return this.originator;
        },
        setOriginator: function(originator) {
            this.originator = originator;
            return this;
        },
        getState: function() {
            return this.state;
        },
        setState: function(state) {
            this.state = state;
            return this;
        }
    });

})(this);
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
    *   Originator object is a model with memento functionality
    */
    var Originator = Skull.Originator = Backbone.Model.extend();
    _.extend(Originator.prototype, {
        createMemento: function() {
            var memento = new Skull.Memento({
                originator: this,
                state: this.toJSON()
            });

            return memento;
        },
        setMemento: function(memento) {
            var state = memento.state;
            if (this.set) {
                this.set(state);
            } else if (this.reset) {
                this.reset(state);
            } else {
                throw new Error("You need to override setMemento to supply a way to set your state");
            }
            return this;
        },
        store: function() {
            Skull.EventMap.publish("Memento:Store", this.createMemento());
            return this;
        }
    });

    Originator.extend = Skull.extend;

})(this);
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
     *   Command object instances are used to execute application commands
     */
    var Command = Skull.Command = function() {};
    _.extend(Command.prototype, {
        execute: function() {
            return this;
        }
    });

    Command.extend = Skull.extend;

})(this);
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
     *   CommandMap is used to map commands to application events
     */
    var CommandMap = Skull.CommandMap = function(eventMap) {
            //Allow a passed in event map to be used
            //  default to the Skull.EventMap
            var eventMap = eventMap || Skull.EventMap;

            return {
                addCommand: function(e, cmd) {
                    if (cmd.execute) {
                        eventMap.subscribe(e, cmd.execute);
                    } else {
                        throw new Error("No execute method found");
                    }
                    return this;
                },
                removeCommand: function(e, cmd) {
                    eventMap.unsubscribe(e, cmd);
                    return this;
                }
            };
        }();

})(this);